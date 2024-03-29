import React from 'react'
import ComputerCard from './computer/ComputerCard'

export default function SimilarProducts({ products, category }) {
    return (
        <section className="py-5">
            <h2 className="fw-bolder mb-4">Simlar Products</h2>
            <div className="row gx-1 gx-lg-4 row-cols-sm-2 row-cols-lg-4 pb-4">
                {products?.map(product => category === 'Computers' && <ComputerCard key={product._id} computer={product} />)}
            </div>
        </section>
    )
}
