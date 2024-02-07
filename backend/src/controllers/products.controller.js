require('dotenv').config()
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const { formatPrice } = require('../utils')
const { validationResult } = require('express-validator');
const Processor = require('../models/Processor');
const OperativeSystem = require('../models/OperativeSystem');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const S3Service = require('../services/s3');
const s3 = new S3Service()

module.exports.getAll = async (req, res) => {
    try {
        const query = req.query.q
        const conditions = {}
        
        // Filters
        const { category, formFactor, ram, processor, disk, diskType, minPrice, maxPrice, page = 1, limit = 10 } = req.query
        

        if (category) {
            conditions.formFactor = category
        }

        if (query) {
            conditions.name = { '$regex': query, '$options': 'i' }
        }

        // Filters
        if (formFactor && formFactor.length > 0) {
            conditions.formFactor = { '$in': formFactor }
        }

        if (ram && ram.length > 0) {
            conditions.ram = { '$in': ram }
        }

        if (processor && processor.length > 0) {
            conditions.processor = { '$in': processor }
        }

        if (diskType && diskType.length > 0) {
            conditions.diskType = { '$in': diskType }
        }

        if (disk && disk.length > 0) {
            conditions.disk = { '$in': disk }
        }

        if (maxPrice) {
            conditions.price = { $lte: parseInt(maxPrice) * 100 }
        }

        if (minPrice) {
            conditions.price = { $gte: parseInt(minPrice) * 100 }
        }

        if (minPrice && maxPrice) {
            conditions.price = { $gte: parseInt(minPrice) * 100, $lte: parseInt(maxPrice) * 100 }
        }

        // Get collection
        const products = await Product.find(conditions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({createdAt: -1})

        // Getting the numbers of products stored in database
        const count = await Product.countDocuments();

        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({ _id: new ObjectId(id) })

        if (!product) {
            res.status(404).json({ message: "Product not found!" })
        }

        const similarProducts = await Product.find({
            _id: { $ne: new ObjectId(id) },
            $or: [
                { processor: product.processor },
                { disk: product.disk },
                { ram: product.ram }
            ]
        }).limit(6)

        res.json({ product, similarProducts })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.store = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json({ message: "Product created successfully", product })
    } catch ({ errors }) {
        if (errors) {
            console.log(errors)
            return res.status(422).json({ errors, message: "Unprocessable Entity" });
        }
        return res.status(500).send("Internal server error")
    }
}

module.exports.update = async (req, res) => {
    try {
        delete req.body._id
        const productId = req.params.id
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        res.json({ product, message: "Product updated successfully." })
    } catch ({ errors }) {
        if (errors) {
            console.log(errors)
            res.status(422).json({ errors, message: "Unprocessable Entity" });
        }
        res.status(500).send("Internal server error")
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const productId = req.params.id
        const response = await Product.deleteOne({ _id: productId })
        res.json({ _id: productId, success: response.deletedCount })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.getFormData = async (req, res) => {
    try {
        const processors = await Processor.find({})
        const operativeSystems = await OperativeSystem.find({})
        const categories = await Category.find({})
        const brands = await Brand.find({})

        res.json({ processors, operativeSystems, categories, brands })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.deleteImage = async (req, res) => {
    try {
        const path = req.body.path
        
        if (!path) throw('No image url found')

        const deleted = await s3.deleteObject(path)

        if (!deleted) {
            return res.status(400).json({ message: 'Error while deleting the file'})
        }

        const updatedProduct = await Product.findOneAndUpdate(new ObjectId(req.params.id), { $pull: { images: path } }, { new: true })
        res.status(200).json({ message: 'Image deleted successfully', product: updatedProduct })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
