import React, { useState } from 'react'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import './cart-items.css'
import Checkout from '../../api/checkout'

export default function CartItems() {
    const [checkingOut, setCheckingOut] = useState(false)
    const { cartItems, showCart, setShowCart, removeFromCart } = useShoppingCartContext()
    let total = 0; 

    async function handleCheckout() {
        try {
            setCheckingOut(true)
            Checkout(cartItems)
                .then(url => {
                    setCheckingOut(false)
                    window.location.href = url
                }).catch(err => {
                    setCheckingOut(false)
                console.log(err)
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={`card cart-items ${showCart && cartItems.length > 0 ? 'toggled' : ''}`}>

            <div className='card-header bg-white'>
                <a href='#' className='text-dark hover' style={{ float: 'right' }} onClick={() => setShowCart(!showCart)}>
                    <i className="bi-x-lg me-1"></i>
                </a>
            </div>
            <div className='card-body p-0'>
                <table className='d-none d-md-block'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>OS | Processor</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => {
                            total = total + item.price / 100

                            return (<tr key={item._id}>
                                <td><img src={item.image} height={50}></img> {item.name}</td>
                                <td className='hidden-xs'>{item.os} | {item.processor}</td>
                                <td>$ {(item.price / 100).toFixed(2)}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={() => removeFromCart(item._id)}>Remove</button></td>
                            </tr>)
                        })}
                        <tr>
                            <td colSpan={3}><h5>Total: $ {total.toFixed(2)}</h5></td>
                            <td>
                                <button className='btn btn-dark' onClick={handleCheckout}> {checkingOut? 'Checkout...' : 'Checkout' } </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='d-md-none'>
                    {cartItems.map(item => {
                        return (
                            <div className='d-flex p-3 item-xs' key={item._id}>
                                <img src={item.image} className='w-25' height={40}></img>
                                <div className='w-75 px-2'>
                                    <h5>{item.name}</h5>
                                    <h6 className='text-danger'>$ {item.price.toFixed(2)}</h6>
                                </div>
                            </div>
                        )
                    })}

                    <div className='py-2 d-flex justify-content-between'>
                        <h5 className='m-0'>Total: $ {total.toFixed(2)}</h5>
                        
                        <button className='btn btn-dark pull-right' onClick={handleCheckout}> {checkingOut ? 'Checkout...' : 'Checkout' } </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
