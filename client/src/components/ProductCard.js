import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ id, product }) {
    const awsUrl = 'https://s3-sa-east-1.amazonaws.com/api.sis/embedded/PE_LaCuracao/SRT/'

    return (
        <div className="my-2 product-card">
            <div className="card h-100">
                <img className="card-img-top" src={`${awsUrl}${product.image}`} alt={product.name} />

                <div className="card-body pt-2 pb-0 px-2">
                    <div className="h-100 d-flex align-content-between flex-wrap">
                        <div>
                            <h5 className="text-center fw-bolder product-name">{product.name}</h5>
                        </div>

                        <div className='text-center w-100 justify-content-between d-flex gap-3'>
                            <small>
                                <i className="bi bi-cpu mr-1"></i> {product.ram}
                            </small>
                            <small> <i className='bi bi-hdd mr-1'></i> {product.ssd ? product.ssd : product.hdd}</small>
                            <small> <i className='bi bi-arrows-fullscreen mr-1'></i> {product.display}</small>
                        </div>

                        <div className='text-center w-100'>
                            <h4 className='text-danger font-weight-bold'>${product.price}</h4>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-transparent">
                    <div className="text-center">
                        <Link to={`/${id}/${product.name.split(' ').join('-')}`} type='button' className='btn btn-sm btn-outline-dark px-4'>View specs</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
