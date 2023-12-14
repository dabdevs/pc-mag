require('dotenv').config()
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')

module.exports.getProducts = async (req, res) => {
    try {
        const category = req.params.category
        const query = req.query.q
        const conditions = {}

        // Filters
        const formFactor = req.body.formFactor
        const ram = req.body.ram
        const processor = req.body.processor
        const minPrice = req.body.minPrice
        const maxPrice = req.body.maxPrice

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
            conditions.price = { $lt: parseFloat(maxPrice) }
        }

        if (minPrice) {
            conditions.price = { $gt: parseFloat(minPrice) }
        }

        if (minPrice && maxPrice) {
            conditions.price = { $gt: parseFloat(minPrice), $lt: parseFloat(maxPrice) }
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
        const productId = req.params.id
        const product = await Product.findOne({ _id: new ObjectId(productId) })

        const similarProducts = await Product.find({
            _id: { $ne: new ObjectId(productId) },
            $or: [
                { processor: product.processor },
                { disk: product.disk },
                { ram: product.ram }
            ]
        }).limit(6)

        return res.json({ product, similarProducts })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.store = async (req, res) => {
    try {
        const Product = await Product.create({ email, password, name })
        console.log(Product)
        res.json({ Product })
    } catch (err) {
        console.log(err)
    }
}
