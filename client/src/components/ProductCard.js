import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
    const navigate = useNavigate()
    return (
        <div className="my-2 product-card" role='button' onClick={() => navigate(`/products/${product._id}/${product.name.split(' ').join(' - ')}`)}>
            <div className="card h-100">
                <img className="card-img-top" src={`${product.images[0]}`} alt={product.name} />

                <div className="card-body pt-2 pb-0 px-2">
                    <div className="h-100 d-flex align-content-between flex-wrap">
                        <h5 className="text-center fw-bolder text-ellipsis">{product.name}</h5>

                        <div className='text-center w-100 justify-content-between d-flex gap-3'>
                            <small>
                                <i className="bi bi-cpu mr-1"></i> {product.ram}
                            </small>
                            <small> <i className='bi bi-hdd mr-1'></i> {product.disk} {product.diskType}</small>
                            <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {product.display}"</small>
                        </div>

                        <div className='text-center w-100'>
                            <h4 className='text-danger font-weight-bold'>$ {(parseFloat(product.price) / 100).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-transparent">
                    <div className="text-center">
                        <Link to={`/products/${product._id}/${product.name.split(' ').join('-')}`} type='button' className='btn btn-sm btn-outline-dark px-4'>View specs</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
