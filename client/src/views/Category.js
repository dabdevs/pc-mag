import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useComputersContext } from '../context/ComputersContext'
import Layout from '../components/Layout'

export default function Category() {
  const { category } = useParams()
  const { setCategory } = useComputersContext()

  useEffect(() => {
    setCategory(category)
  }, [])

  return (
    <div>
      category
    </div>
  )
}
