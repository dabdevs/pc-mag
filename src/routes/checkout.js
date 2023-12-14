const express = require('express');
const router = express.Router();
require('dotenv').config()
const { createCheckout, checkoutResponse, webhook } = require('../controllers/checkout.controller')

router.post('/create-checkout-session', createCheckout);
router.get('/:state', checkoutResponse);
router.post('/webhook', express.raw({ type: 'application/json' }), webhook)

module.exports = router;