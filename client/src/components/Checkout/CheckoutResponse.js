import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Layout from "../Layout";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import FeedBack from "../FeedBack";

function Success() {
    return (
        <Layout>
            <section className="card p-5 my-5 col-sm-6 mx-auto">
                <p className="alert alert-success">
                    Thank you for your order! A confirmation email will be sent to your email.
                </p>
            </section>
        </Layout>
    )
}

function Failure() {
    return (
        <Layout >
            <section className="card p-5 my-5 col-sm-6 mx-auto">
                <p className="alert alert-danger">
                    Checkout failed!
                </p>
            </section>
        </Layout>
    )
}


const CheckoutResponse = () => {
    const { response } = useParams();
    const { clearCart } = useShoppingCartContext()
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (response === 'success') {
            localStorage.removeItem('cartItems')
            setType(response)
            setMessage('Thank you for your purchase!')
            clearCart()
        } else {
            setType('danger')
            setMessage('Checkout canceled!')
        }
    }, [])
    
    return <FeedBack type={type} message={message} />
}

export default CheckoutResponse