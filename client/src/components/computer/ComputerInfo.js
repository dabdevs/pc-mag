import React, { useContext } from 'react'
import ShoppingCartContext from '../../context/ShoppingCartContext'
import Checkout from '../../api/checkout'
import { useState } from 'react'
import { FaCartArrowDown } from "react-icons/fa"
import { GiProcessor } from "react-icons/gi";

export default function ComputerInfo({ computer }) {
    const { addToCart, cartItems } = useContext(ShoppingCartContext)
    const [buying, setBuying] = useState(false)
    let inCart = false

    cartItems.map(item => {
        if (item._id === computer._id) inCart = true
    })

    const handleBuy = async () => {
        try {
            setBuying(true)
            Checkout([computer])
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
            <h1 className="display-5 fw-bolder">{computer.name}</h1>
            <div className="fs-5 mb-5">
                <b className='display-4 text-danger'>$ {(computer.price / 100).toFixed(2)}</b>
            </div>
            <div className='text-center w-100 mb-3 justify-content-between d-flex gap-4'>
                <small>
                    <i className="bi bi-laptop mr-1"></i> {computer.brand}
                </small>
                <small>
                    <i className="bi bi-cpu mr-1"></i> {computer.ram}
                </small>
                <small> <i className='bi bi-hdd mr-1'></i> {computer.disk} {computer.diskType}</small>
                <small> <i className='bi bi-aspect-ratio mr-1'></i> {computer.display}"</small>
                <small>
                    <i className='bi bi-motherboard mr-1'></i> {computer.os}
                </small>
                <small>
                    <GiProcessor /> {computer.processor}
                </small>
            </div>
            <div className="d-xs-grid d-flex gap-3">
                <button className="btn btn-dark" type="button" onClick={handleBuy}>
                    {buying ? <span><span class="spinner-border spinner-border-sm"></span> Buy now...</span> : <span><i className="bi-cash-coin me-1"></i>  Buy now</span>}
                </button>

                {inCart
                    ? (<button className="btn btn-white text-success">
                        Added to cart <i className="bi-check"></i>
                    </button>)
                    :
                    (<button className="btn btn-outline-dark" onClick={() => addToCart(computer)} type="button">
                        <FaCartArrowDown className='mr-1' />
                        Add to cart
                    </button>)
                }
            </div>
        </div>
    )
}
