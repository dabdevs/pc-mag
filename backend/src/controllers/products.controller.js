require('dotenv').config()
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const Processor = require('../models/Processor');
const OperativeSystem = require('../models/OperativeSystem');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const S3Service = require('../services/s3');
const s3 = new S3Service()

module.exports.getAll = async (req, res) => {
    try {
        const conditions = {}
        console.log(req.body, req.query)
        
        // Filters
        const { category, search, formFactor, ram, processor, disk, diskType, minPrice, maxPrice, page = 1, limit = 10, orderBy } = req.query
        
        if (category) {
            conditions.category = category
        }

        if (search) {
            console.log('searching...')
            conditions.name = { '$regex': search, '$options': 'i' }
        }

        if (formFactor) {
            conditions.formFactor = Array.isArray(formFactor) ? { '$in': formFactor } : formFactor
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

        let sort = {createdAt: -1}

        if (orderBy) {
            sort = { price: orderBy === 'lowest-price' ? 1 : -1}
        }

        // Get collection
        const products = await Product.find(conditions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sort)

        // Getting the numbers of products stored in database
        const count = await Product.countDocuments(conditions)
       
        return res.status(200).json({
            products,
            count,
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
        const productExists = await Product.findOne({ name: req.body.name })

        if (productExists) return res.status(400).json({message: 'Product already exists'})
        
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
        const product = await Product.findOne({ _id: new ObjectId(productId) })

        if (product) {
            product.images.map(img => {
                s3.deleteObject(img).catch(err => console.log(err))
            })
        }

        const response = await Product.deleteOne({ _id: product._id })
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
        const imagesPerProduct = process.env.IMAGES_PER_PRODUCT

        res.json({ processors, operativeSystems, categories, brands, imagesPerProduct })
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
