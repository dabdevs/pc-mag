const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getProducts, getOne, store } = require('../controllers/products.controller')

router.post('/:category?', getProducts)
router.get('/:id', getOne)
router.post('', store)

module.exports = router;
