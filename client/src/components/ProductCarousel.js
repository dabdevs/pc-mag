import React from 'react'

export default function ProductCarousel({product}) {
  const awsUrl = 'https://s3-sa-east-1.amazonaws.com/api.sis/embedded/PE_LaCuracao/SRT/'
  return (
    <div className="col-md-6">
      <img className="card-img-top mb-5 mb-md-0" src={`${awsUrl}${product?.image}`} alt={product?.name} /> 
    </div>
  )
}
