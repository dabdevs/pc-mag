const express = require('express');
const router = express.Router();
const authRoutes = require('./auth')
const productRoutes = require('./product')
const checkoutRoutes = require('./checkout')
const uploadRoutes = require('./upload')
const authToken = require('../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/checkout', checkoutRoutes);
router.use('', uploadRoutes);
router.use('/dashboard', authToken, (req, res) => {res.send(`Welcome ${req.user.name}`)});
module.exports = router;