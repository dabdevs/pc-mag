import React from 'react'
import ProductCard from './ProductCard'
import LazyLoad from 'react-lazyload'

export default function SimilarProducts({similarProducts}) {
    return (
        <section className="py-5">
            <h2 className="fw-bolder mb-4">You might also like</h2>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                {similarProducts && similarProducts.map(prod =>
                (<LazyLoad key={prod[0]} height={200} offset={100} className='col'>
                    <ProductCard key={prod[0]} id={prod[0]} product={prod[1]} />
                </LazyLoad>)
                )}
            </div>
        </section>
    )
}
