import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useShoppingCartContext } from "../../context/ShoppingCartContext";

let stripePromise;

const getStripe = () => {
    console.log(process.env.REACT_APP_STRIPE_KEY)
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
    }

    return stripePromise
}

const CheckoutForm = () => {
    const {cartItems} = useShoppingCartContext()
    const [clientSecret, setClientSecret] = useState('');

    // useEffect(() => {
    //     axios.post("http://localhost:3000/api/create-checkout-session")
    //         .then(data => setClientSecret(data.clientSecret))
    //         .catch(err => console.error(err));
    // }, []);

    const makePayment = async token => {
        const payload = {
            token,
            product
        }

        console.log(payload)

        try {
            const response = await axios.post('http://localhost:3000/api/payment', payload)
            console.log("RESPONSE", response)
            return response
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div id="checkout">
            <h2>Checkout {cartItems.length}</h2>
            <StripeCheckout 
                stripeKey={process.env.REACT_APP_STRIPE_KEY} 
                token={makePayment} 
                name="" 
                amount={cartItems[0].price * 100}
                // billingAddress
                // shippingAddress
            >
                <button className="btn btn-success">Buy now</button>
            </StripeCheckout>
        </div>
    )
}

export default CheckoutForm;