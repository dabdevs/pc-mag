const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getProducts, getOne, store, update, destroy } = require('../controllers/products.controller')

router.get('/:category?', getProducts)
router.get('/:id', getOne)
router.put('/:id', update)
router.delete('/:id', destroy)
router.post('', store)

module.exports = router;
