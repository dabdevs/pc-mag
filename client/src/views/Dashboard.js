import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Layout from '../components/Layout'

export default function Dashboard() {
    const { auth } = useAuthContext()
    const navigate = useNavigate()

    if (!auth) navigate('/login')
  return (
    <Layout>
        <section className='card col-sm-8 mx-auto my-5'>
            <p>Hello {auth?.token}</p>
        </section>
    </Layout>
  )
}
