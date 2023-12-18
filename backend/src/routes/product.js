const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getProducts, getOne, store, update } = require('../controllers/products.controller')

router.post('/:category?', getProducts)
router.get('/:id', getOne)
router.put('/:id', update)
router.post('', store)

module.exports = router;
