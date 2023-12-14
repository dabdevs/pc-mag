const express = require('express');
const router = express.Router();
require('dotenv').config()

const { createCheckout, checkoutResponse } = require('../controllers/checkout.controller')

router.post('/create-checkout-session', createCheckout);
router.get('/checkout/:state', checkoutResponse);

module.exports = router;