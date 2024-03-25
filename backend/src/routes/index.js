const express = require('express');
const router = express.Router();
const authRoutes = require('./auth')
const computerRoutes = require('./computer')
const checkoutRoutes = require('./checkout')
const uploadRoutes = require('./upload')
const authToken = require('../middlewares/auth.middleware');
const checkAuth = require('../middlewares/checkAuth.middleware');

router.use('/auth', authRoutes);
router.use('/computers', computerRoutes);
router.use('/checkout', checkoutRoutes);
router.use('', uploadRoutes);
router.use('/dashboard', authToken, (req, res) => {res.send(`Welcome ${req.user.name}`)});
module.exports = router;