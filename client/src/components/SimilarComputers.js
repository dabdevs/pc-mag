import React from 'react'
import ComputerCard from './computer/ComputerCard'
import LazyLoad from 'react-lazyload'

export default function SimilarComputers({ similarComputers }) {
    return (
        <section className="py-5">
            <h2 className="fw-bolder mb-4">You might also like</h2>
            <div className="row gx-3 gx-lg-4 row-cols-xs-1 row-cols-md-2 row-cols-lg-4">
                {similarComputers && similarComputers.map(computer =>
                (<LazyLoad key={computer._id} height={200} offset={100}>
                    <ComputerCard key={computer._id} computer={computer} />
                </LazyLoad>)
                )}
            </div>
        </section>
    )
}
