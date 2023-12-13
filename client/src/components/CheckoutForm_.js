import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'

export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const { data } = await axios.post('http://localhost:3000/api/checkout', {
                id: paymentMethod.id,
                amount: 10000
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button className='btn btn-success'>Buy</button>
        </form>
    )
}
