// services/stripeService.js
const Stripe = require('stripe')
require('dotenv').config()
const SKYPE_SECRET = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(SKYPE_SECRET)

class StripeService {
    constructor() {
        this.stripe = stripe;
    }

    async getSession(sessionId) {
        return await stripe.checkout.sessions.retrieve(sessionId)
    }

    async getLineItems(sessionId) {
        const {data} = await stripe.checkout.sessions.listLineItems(sessionId)
        return data
    }

    async getCustomerByEmail(email) {
        return await stripe.customers.retrieve(email)
    }
    
    async createSession(data) {
        console.log('checkout stripe session', data)
        const { items, customerEmail } = data;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer_email: customerEmail,
                line_items: data['items'].map(item => {
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
                shipping_address_collection: {
                    allowed_countries: [],
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 0,
                                currency: 'usd',
                            },
                            display_name: 'Free shipping',
                            delivery_estimate: {
                                minimum: {
                                    unit: 'business_day',
                                    value: 5,
                                },
                                maximum: {
                                    unit: 'business_day',
                                    value: 7,
                                },
                            },
                        },
                    },
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 500,
                                currency: 'usd',
                            },
                            display_name: 'Express',
                            delivery_estimate: {
                                minimum: {
                                    unit: 'business_day',
                                    value: 1,
                                },
                                maximum: {
                                    unit: 'business_day',
                                    value: 1,
                                },
                            },
                        },
                    },
                ],
                success_url: `${process.env.SERVER_URL}/api/checkout/success?id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.SERVER_URL}/api/checkout/failure`
            })

            return session
        } catch (error) {
            throw error;
        }
    }

    async createPaymentIntent(amount) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: process.env.CURRENCY,
            });

            return paymentIntent;
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
            throw error;
        }
    }
}

module.exports = StripeService;
