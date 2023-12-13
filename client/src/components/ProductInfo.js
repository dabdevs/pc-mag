import React, { useContext, useEffect } from 'react'
import ShoppingCartContext from '../context/ShoppingCartContext'
import Checkout from '../api/checkout'
import { useState } from 'react'

export default function ProductInfo({ product }) {
    const { addToCart, cartItems } = useContext(ShoppingCartContext)
    const [buying, setBuying] = useState(false) 
    let inCart = false

    cartItems.map(item => {
        if (item._id === product._id) inCart = true
    })

    const handleBuy = async () => {
        try {
            setBuying(true)
            Checkout(cartItems)
                .then(url => {
                    setBuying(false)
                    window.location.href = url
                }).catch(err => {
                    setBuying(false)
                    console.log(err)
                })
        } catch (error) {
            setBuying(false)
            console.log(error)
        }
    }
    
    return (
        <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{product.name}</h1>
            <div className="fs-5 mb-5">
                <b className='display-4 text-danger'>$ {product.price}</b>
            </div>
            <div className='text-center w-100 mb-3 justify-content-between d-flex gap-4'>
                <small>
                    <i className="bi bi-cpu mr-1"></i> {product.ram}
                </small>
                <small> <i className='bi bi-hdd mr-1'></i> {product.disk}</small>
                <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {product.display}</small>
                <small>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-windows" viewBox="0 0 16 16">
                        <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z" />
                    </svg> {product.os} | {product.processor}
                </small>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-dark flex-shrink-0" type="button" onClick={handleBuy}>
                    <i className="bi-cash-coin me-1"></i>
                    {buying? 'Buy now...' : 'Buy now'}
                </button>
                {inCart
                    ?   (<button className="btn btn-white text-success">
                            Added to cart <i className="bi-check"></i>
                        </button>) 
                    :
                    (<button className="btn btn-outline-dark flex-shrink-0" onClick={() => addToCart(product)} type="button">
                        <i className="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>)
                }
            </div>
        </div>
    )
}
