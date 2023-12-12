const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
require('dotenv').config()

const { connect, ObjectId } = require('../db');
const SKYPE_SECRET = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(SKYPE_SECRET)

router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: process.env.CURRENCY,
                        product_data: {
                            name: item.name
                        },
                        unit_amount: Math.round(item.price * 100)
                    },
                    quantity: 1,
                }
            }),
            success_url: `${process.env.FRONTEND_ORIGIN}/checkout/success`,
            cancel_url: `${process.env.FRONTEND_ORIGIN}/checkout/failure`
        })
        console.log(session)
        return res.json({url: session.url})
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;