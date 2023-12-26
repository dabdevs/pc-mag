const express = require('express');
const router = express.Router();
require('dotenv').config()
const { body } = require('express-validator');
const Product = require('../models/Product')
const { getAll, getOne, store, update, destroy } = require('../controllers/products.controller')

// Validation middleware for product creation
// const validateProduct = [
//     body('name').notEmpty().trim().withMessage('Invalid product name').custom(async (value) => {
//         // Check if the product already exists in the database
//         const product = await Product.findOne({ name: value });
    
//         if (product) {
//             return Promise.reject('Product name is already in use');
//         }
//         return true;
//     }),
//     body('description').optional().trim().isLength({ min: 256 }).withMessage('A description is required'),
//     body('images').isArray().withMessage('Please upload at least one image'),
//     body('price').notEmpty().isNumeric().withMessage('Product price is required'),
//     body('os').notEmpty().trim().isString().withMessage('Product OS is required'),
//     body('processor').notEmpty().isString().trim().withMessage('Product processor is required'),
//     body('ram').trim().notEmpty().isString().withMessage('Product ram is required'),
//     body('disk').notEmpty().isString().trim().withMessage('Product disk is required'),
//     body('diskType').notEmpty().isString().trim().withMessage('Product diskType is required'),
//     body('display').notEmpty().isNumeric().withMessage('Product display is required'),
//     body('formFactor').notEmpty().isString().trim().withMessage('Product formFactor is required'),
//     body('quantity').notEmpty().isNumeric().withMessage('Product quanity is required')   
// ];

const productSchema = require('../validations/productSchema')
const validationMiddleware = require('../middlewares/validation.middleware')


router.get('', getAll)
router.get('/:id', getOne)
router.post('', validationMiddleware(productSchema), store)
router.put('/:id', validationMiddleware(productSchema), update)
router.delete('/:id', destroy)

module.exports = router;
