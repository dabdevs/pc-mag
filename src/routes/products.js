const express = require('express');
const router = express.Router();
require('dotenv').config()

const { connect, ObjectId } = require('../db');

router.get('/product/:id', async (req, res) => {
    try {
        const DB = await connect();
        const productId = req.params.id
        const products = DB.collection('products');
        const product = await products.findOne({ _id: new ObjectId(productId) })
    
        const similarProducts = await products.find({
            _id: { $ne: new ObjectId(productId)},
            $or: [
                { processor: product.processor },
                { disk: product.disk },
                { ram: product.ram }
            ]
        }).limit(6).toArray()

        return res.json({product, similarProducts})
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

router.post('/products/:category?', async (req, res) => {
    try {
        const DB = await connect();
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
        const products = DB.collection('products');

        // Find all products or by category
        const data = await products.find(conditions).toArray()
        return res.json(data)
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})


module.exports = router;
