import React, { useState } from 'react'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import './cart-items.css'
import Checkout from '../../api/checkout'
import { BsFillCartCheckFill } from 'react-icons/bs';

export default function CartItems() {
    const [checkingOut, setCheckingOut] = useState(false)
    const { cartItems, removeFromCart } = useShoppingCartContext()
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
        <div className='p-0 w-100'>
            <table className='w-100'>
                <thead className='border'>
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
                        <td colSpan={2}><h5>Total: $ {total.toFixed(2)}</h5></td>
                        <td colSpan={2}>
                            {cartItems.length > 0 ? <button className="btn btn-dark d-flex btn-block mx-auto" type="button" onClick={handleCheckout}>
                                {checkingOut ? <span><span class="spinner-border spinner-border-sm"></span> Checkout...</span> : <span><BsFillCartCheckFill className='mr-1' />  Checkout</span>}
                            </button> : null}
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

                    <button className="btn btn-dark pull-right" type="button" onClick={handleCheckout}>
                        {checkingOut ? <span><span class="spinner-border spinner-border-sm"></span> Checkout...</span> : <span><BsFillCartCheckFill className='mr-1' />  Checkout</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
