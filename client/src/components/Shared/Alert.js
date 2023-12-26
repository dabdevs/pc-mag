import React from 'react'

export default function Alert({type, errors}) {
  return (
    <ul className={`alert alert-${type}`}>
      {errors?.map(error => <li>{error}</li>)}
    </ul>
  )
}
