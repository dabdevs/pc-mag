import React from 'react'
import LazyLoad from 'react-lazyload'
import ComputerCard from './computer/ComputerCard'

export default function SimilarProducts({ products, category }) {
    return (
        <section className="py-5">
            <h2 className="fw-bolder mb-4">You might also like</h2>
            <div className="row gx-1 gx-lg-4 row-cols-2 row-cols-lg-4 pb-4">
                {products && products.map(product =>
                (<LazyLoad key={product._id} height={200} offset={100}>
                    {category === 'Computers' && <ComputerCard key={product._id} computer={product} />}
                </LazyLoad>)
                )}
            </div>
        </section>
    )
}
