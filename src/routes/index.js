const express = require('express');
const router = express.Router();
require('dotenv').config()
const { createCheckout, checkoutResponse } = require('../controllers/checkout.controller')

const authRoutes = require('./auth')
const productRoutes = require('./product')
const checkoutRoutes = require('./checkout')
const uploadRoutes = require('./upload')

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/checkout', checkoutRoutes);
router.use('', uploadRoutes);

module.exports = router;