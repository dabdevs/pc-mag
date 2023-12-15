import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Layout from '../components/Layout'
import { SiProducthunt } from "react-icons/si";

export default function Dashboard() {
  const { token } = useAuthContext()

  return !token ? <Navigate to={'/login'} /> : (
    <Layout classes={'p-3'}>
      <section className='col-sm-8 mx-auto my-5 p-3'>
        <div className='row'>
            <div onClick={() => window.location.href = '/products'} className='card col-sm-3 p-4 d-flex flex-column align-items-center' role='button'>
              <SiProducthunt style={{ fontSize: '100px' }} />
              
              <h6 className='mt-3'>Products</h6>
            </div>
        </div>
      </section>
    </Layout>
  )
}
