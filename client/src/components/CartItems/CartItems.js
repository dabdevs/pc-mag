import React from 'react'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import './cart-items.css'

export default function CartItems() {
    const { cartItems, showCart, setShowCart, removeFromCart } = useShoppingCartContext()
    let total = 0;

    return (
        <div className={`card cart-items ${showCart && cartItems.length > 0 ? 'toggled' : ''}`}>
            <div className='card-header bg-white'>
                <a href='javascript:void(0)' className='text-dark' style={{ float: 'right' }} onClick={() => setShowCart(!showCart)}>
                    <i class="bi-x-lg me-1"></i>
                </a>
            </div>
            <div className='card-body p-0'>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>OS | Processor</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            total = total + item.price

                            return (<tr key={item._id}>
                                <td><img src={item.image} height={50}></img> {item.name}</td>
                                <td className='hidden-xs'>{item.os} | {item.processor}</td>
                                <td>$ {item.price}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={() => removeFromCart(item._id)}>Remove</button></td>
                            </tr>)
                        })}
                        <tr>
                            <td colSpan={3}><h4>Total: $ {total.toFixed(2)}</h4></td>
                            <td><button className='btn btn-dark'><i class="bi-bag-check me-1"></i> Checkout</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
