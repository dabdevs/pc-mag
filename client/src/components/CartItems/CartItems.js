import React, { useState } from 'react'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import './cart-items.css'
import Checkout from '../../api/checkout'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaTrashAlt } from "react-icons/fa";

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
        <ul className='list-group p-0' style={{ width: '400px' }}>
            {
                cartItems.map(item => {
                    total = total + item.price / 100
                    return (
                        <li className='list-item border-bottom p-2' key={`li-${item._id}`}>
                            <div className='d-flex gap-2 justify-content-between'>
                                <img src={item.images.length > 0 ? item.images[0] : 'https://placehold.co/50x50'} style={{ height: '50px' }} />
                                <div className='p-1 text-truncate'>
                                    <h6 className='text-truncate'>{item.name}</h6>
                                    <b className='float-right'>${item.price / 100}</b>
                                </div>
                                <button className='btn btn-sm' onClick={() => removeFromCart(item._id)} style={{ height: '40px' }}><FaTrashAlt /></button>
                            </div>
                        </li>
                    )
                })
            }
            <li className='list-item p-2 d-flex justify-content-between'>
                <h6 className='mt-2'>Total: $ {total.toFixed(2)}</h6>

                <button className="btn btn-danger pull-right" type="button" onClick={handleCheckout}>
                    {checkingOut ? <span><span class="spinner-border spinner-border-sm"></span> Checkout...</span> : <span><BsFillCartCheckFill className='mr-1' />  Checkout</span>}
                </button>
            </li>
        </ul>
    )
}
