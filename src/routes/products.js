const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getProducts, getOne, store } = require('../controllers/products.controller')

router.post('/products/:category?', getProducts)
router.get('/product/:id', getOne)
router.post('/products', store)

module.exports = router;
