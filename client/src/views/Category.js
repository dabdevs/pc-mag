import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../context/ProductsContext'
import Layout from '../components/Layout'

export default function Category() {
  const { category } = useParams()
  const { setCategory } = useProductsContext()

  useEffect(() => {
    setCategory(category)
  }, [])
  
  return (
    <div>
    category
    </div>
  )
}
