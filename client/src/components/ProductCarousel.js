import React from 'react'

export default function ProductCarousel({product}) {
  return (
    <div className="col-md-6">
      <img className="card-img-top mb-5 mb-md-0" src={product?.images[0]} alt={product?.name} /> 
    </div>
  )
}
