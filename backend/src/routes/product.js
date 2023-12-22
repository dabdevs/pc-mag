const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getAll, getOne, store, update, destroy } = require('../controllers/products.controller')

router.get('', getAll)
router.get('/:id', getOne)
// router.get('/search', search)
router.post('', store)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router;
