import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Layout from '../components/Layout'

export default function Dashboard() {
  const { authUser, token } = useAuthContext()

  return !token ? <Navigate to={'/login'} /> : (
    <Layout classes={'p-3'}>
      <section className='card col-sm-8 mx-auto my-5 p-3'>
        <p>Hello {authUser?.name}</p>
      </section>
    </Layout>
  )
}
