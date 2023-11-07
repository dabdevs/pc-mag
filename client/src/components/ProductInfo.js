import React, { useContext, useRef, useEffect } from 'react'
import ShoppingCartContext from '../context/ShoppingCartContext'

export default function ProductInfo({product}) {
    const { addToCart, isItemInCart } = useContext(ShoppingCartContext)

    return (
        <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{product?.name}</h1>
            <div className="fs-5 mb-5">
                <b className='display-4 text-danger'>${product?.price}</b>
            </div>
            <div className='text-center w-100 mb-3 justify-content-between d-flex gap-4'>
                <small>
                    <i className="bi bi-cpu mr-1"></i> {product?.ram}
                </small>
                <small> <i className='bi bi-hdd mr-1'></i> {product?.ssd ? product?.ssd : product?.hdd}</small>
                <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {product?.display}</small>
                <small> <i className='bi bi-hdd mr-1'></i> {product?.processor}</small>
                <small> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-windows" viewBox="0 0 16 16">
                        <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z" />
                    </svg> {product?.os}
                </small>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-dark flex-shrink-0" type="button">
                    <i className="bi-cash-coin me-1"></i>
                    Buy now
                </button>
                {!isItemInCart && 
                    (<button className="btn btn-outline-dark flex-shrink-0" onClick={() => addToCart(product)} type="button">
                        <i className="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>)
                }
            </div>
        </div>
    )
}
