import React, { useState } from 'react'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import {useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'

export default function StripeCheckout() {
    const [email, setEmail] = useState('')
    const {cartItems} = useShoppingCartContext()
    const stripe = useStripe()

    const handleGuestCheckout = async (e) => {
        e.preventDefault()

        const line_items = cartItems.map(item => {
            return {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    produc_data: {
                        name: item.name,
                        images: [item.image]
                    }
                }
            }
        })

        const { sessionId } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {line_items, customer_email: email})

        const {error} = await stripe.redirectToCheckout({
            sessionId
        })

        if (error) {
            console.log(error)
            alert('There was an error with the payment')
        }
    }

    return (
        <form onSubmit={handleGuestCheckout}>
            <input value={email} onChange={() => setEmail(e.target.value)} type='email' placeholder='Enter your email' />
            <button type='submit' className='btn btn-primary'>Checkout</button>
        </form>
    )
}
