require('dotenv').config()
const { ObjectId } = require('mongodb')
const Computer = require('../models/Computer')
const Processor = require('../models/Processor');
const OperativeSystem = require('../models/OperativeSystem');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const S3Service = require('../services/s3');
const s3 = new S3Service()

module.exports.getAll = async (req, res) => {
    try {
        const conditions = {}
        
        // Filters
        const { category, search, formFactor, ram, os, processor, disk, diskType, minPrice, maxPrice, page = 1, limit = process.env.RESULTS_ROWS_COUNT, orderBy } = req.query
        
        console.log('orderBy', orderBy)
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

        if (os && os.length > 0) {
            conditions.os = { '$in': os }
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

        let sort = { createdAt: -1 }

        if (orderBy) {
            sort = { price: orderBy === 'lowest-price' ? 1 : -1 }
        }

        // Get collection
        const computers = await Computer.find(conditions)
            .limit(limit * 1)
            .skip((Number(page) - 1) * limit)
            .sort(sort)

        // Getting the numbers of computers stored in database
        const rowsCount = await Computer.countDocuments(conditions)

        return res.status(200).json({
            computers,
            rowsCount,
            totalPages: Math.ceil(rowsCount / limit),
            currentPage: Number(page)
        })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const computer = await Computer.findOne({ _id: new ObjectId(id) })

        if (!computer) {
            res.status(404).json({ message: "Computer not found!" })
        }

        const similarComputers = await Computer.find({
            _id: { $ne: new ObjectId(id) },
            $or: [
                { processor: computer.processor },
                { disk: computer.disk },
                { ram: computer.ram }
            ]
        }).limit(6)

        res.json({ computer, similarComputers })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.store = async (req, res) => {
    try {
        const computerExists = await Computer.findOne({ name: req.body.name })
        if (computerExists) return res.status(400).json({ message: 'Computer already exists' })

        const computer = await Computer.create(req.body)
        return res.status(201).json({ message: "Computer created successfully", computer })
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
        if (req.body._id) delete req.body._id
        const computerId = req.params.id
        const computer = await Computer.findByIdAndUpdate(computerId, req.body, { new: true })
        res.json({ computer, message: "Computer updated successfully." })
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
        const computerId = req.params.id
        const computer = await Computer.findOne({ _id: new ObjectId(computerId) })

        if (computer) {
            computer.images.map(img => {
                s3.deleteObject(img).catch(err => console.log(err))
            })
        }

        const response = await Computer.deleteOne({ _id: computer._id })
        res.json({ _id: computerId, success: response.deletedCount })
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
        const imagesPerComputer = process.env.IMAGES_PER_PRODUCT

        res.json({ processors, operativeSystems, categories, brands, imagesPerComputer })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.deleteImage = async (req, res) => {
    try {
        const path = req.body.path

        if (!path) throw ('No image url found')

        const deleted = await s3.deleteObject(path)

        if (!deleted) {
            return res.status(400).json({ message: 'Error while deleting the file' })
        }

        const updatedComputer = await Computer.findOneAndUpdate(new ObjectId(req.params.id), { $pull: { images: path } }, { new: true })
        res.status(200).json({ message: 'Image deleted successfully', computer: updatedComputer })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
