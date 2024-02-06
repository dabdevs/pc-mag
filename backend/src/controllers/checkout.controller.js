require('dotenv').config()
const StripeService = require('../services/stripe');
const { eventEmitter, checkoutSuccessful } = require('../events/index')
const stripe = new StripeService()

module.exports.createCheckout = async (req, res) => {
    try {
        const session = await stripe.createSession(req.body)
        console.log(session)
        return res.json({ url: session.url })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.checkoutResponse = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.json(404)
    }
   
    try {
        const state = req.params.state
        const { customer_details, payment_status } = await stripe.getSession(id);
        const lineItems = await stripe.getLineItems(id)

        if (state === 'success' && payment_status === 'paid') {
            // Send email
            const payload = {
                to: customer_details.email,
                items: lineItems
            }

            eventEmitter.emit(checkoutSuccessful, payload)
        }

        return res.redirect(`${process.env.FRONTEND_ORIGIN}/checkout/${state}`);
    } catch (error) {
        console.error('Error retrieving PaymentIntent:', error);
        res.status(500);
    }
}

module.exports.webhook = async (req, res) => {
    req.body.signature = req.headers['stripe-signature'];

    try {
        await stripe.webhook(req.body)
        
    } catch (err) {
        console.error('Webhook error', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
}
