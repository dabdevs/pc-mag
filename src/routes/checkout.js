const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
const Mail = require('../utils/Mail')

require('dotenv').config()
const StripeService = require('../services/stripe');
const stripe = new StripeService()

router.get('/checkout/:state', async (req, res) => {
    const { id } = req.query;
    const state = req.params.state

    try {
        const { customer_details, payment_status } = await stripe.getSession(id);
        
        if (payment_status === 'paid') {
            // Send email
            const payload = {
                to: customer_details.email
            }

            Mail.sendPurchaseEmail(payload)
        }

        return res.redirect(`${process.env.FRONTEND_ORIGIN}/checkout/${state}`);
    } catch (error) {
        console.error('Error retrieving PaymentIntent:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.createSession(req.body)
        return res.json({ url: session.url })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;