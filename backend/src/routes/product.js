const express = require('express');
const router = express.Router();
require('dotenv').config()
const { getAll, getOne, store, update, destroy, getFormData } = require('../controllers/products.controller')

const productSchema = require('../validations/productSchema')
const validationMiddleware = require('../middlewares/validation.middleware')


router.get('/formdata', getFormData)
router.get('', getAll)
router.get('/:id', getOne)
router.post('', validationMiddleware(productSchema), store)
router.put('/:id', validationMiddleware(productSchema), update)
router.delete('/:id', destroy)

module.exports = router;
