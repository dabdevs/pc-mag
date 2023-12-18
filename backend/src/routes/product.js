const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getAll, getOne, store, update, destroy } = require('../controllers/products.controller')

// router.get('/:id', getOne)
router.post('', store)
router.get('/:category?', getAll)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router;
