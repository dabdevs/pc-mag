import React from 'react'

export default function ProductCarousel({product}) {
  return (
    <div className="col-md-6">
      <img className="card-img-top mb-5 mb-md-0" src={product?.images[0] ? product?.images[0] : '../../img/default-notebook-img.jpg'} alt={product?.name} /> 
    </div>
  )
}
