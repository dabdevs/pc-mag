const express = require('express');
const router = express.Router();
const { connect } = require('../db');

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
            conditions.processor = { '$regex': processor.toString(), '$options': 'i' }
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
        console.log(conditions)
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
