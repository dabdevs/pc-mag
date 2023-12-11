import React from 'react'
import ProductCard from './ProductCard'
import LazyLoad from 'react-lazyload'

export default function SimilarProducts({similarProducts}) {
    return (
        <section className="py-5">
            <h2 className="fw-bolder mb-4">You might also like</h2>
            <div className="row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4">
                {similarProducts && similarProducts.map(product =>
                (<LazyLoad key={product._id} height={200} offset={100}>
                    <ProductCard key={product._id} product={product} />
                </LazyLoad>)
                )}
            </div>
        </section>
    )
}
