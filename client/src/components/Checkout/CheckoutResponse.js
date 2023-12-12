import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import Layout from "../Layout";

function Success() {
    return (
        <section id="success" className="checkout-success card p-5 my-5 col-sm-6 mx-auto">
            <p className="alert alert-success">
                Thank you for your order! A confirmation email will be sent to your email.
            </p>
        </section>
    )
}

function Failure() {
    return (
        <section id="failure" className="checkout-failure card p-5 my-5 col-sm-6 mx-auto">
            <p className="alert alert-danger">
                Checkout failed!
            </p>
        </section>
    )
}


const CheckoutResponse = () => {
    const { response } = useParams();

    if (response === 'failure') {
        return <Failure />
    }

    localStorage.removeItem('cartItems')
    return <Success />
}

export default CheckoutResponse