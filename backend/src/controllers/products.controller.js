require('dotenv').config()
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const {formatPrice} = require('../utils')

module.exports.getAll = async (req, res) => {
    try {
        const category = req.params.category
        const query = req.query.q
        const conditions = {}

        // Filters
        const {formFactor, ram, processor, minPrice, maxPrice} = req.query

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

        return res.json(products)
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({ _id: new ObjectId(id) })

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
        const product = await Product.create(JSON.parse(req.body.data))
        console.log(product)
        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.update = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data)
        delete data._id
        const productId = req.params.id
        const product = await Product.findByIdAndUpdate(productId, data, {new: true})
        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const productId = req.params.id
        //return res.send('OK!')
        const response = await Product.deleteOne({_id: productId})
        res.json({ _id: productId, success: response.deletedCount })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: 'Internal Server Error' });
    }
}
