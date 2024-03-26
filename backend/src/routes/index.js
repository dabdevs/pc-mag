const express = require('express');
const router = express.Router();
const authRoutes = require('./auth')
const computerRoutes = require('./computer')
const checkoutRoutes = require('./checkout')
const dashboardRoutes = require('./dashboard')
const authToken = require('../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use('/computers', computerRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/dashboard', authToken, dashboardRoutes);
module.exports = router;