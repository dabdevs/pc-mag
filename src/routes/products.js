const express = require('express');
const router = express.Router();
const { connect } = require('../db');

router.get('/products/:category?', async (req, res) => {
    try {
        const category = req.params.category
        const query = req.query.q
        const conditions = {}

        if (category) {
            conditions.formFactor = category
        }

        if (query) {
            conditions.name = { '$regex': query, '$options': 'i' }
        }

        const DB = await connect();

        // Get collection
        const products = DB.collection('products');

        // Find all products or by category
        const data = await products.find(conditions).toArray()
        console.log('conditions:', conditions)
        console.log('result:', data)
        return res.json(data)
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})


module.exports = router;
