import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Layout from '../components/Layout'
import { FaComputer } from "react-icons/fa6";

export default function Dashboard({children}) {
  const { token } = useAuthContext()

  return !token ? <Navigate to={'/login'} /> : (
    <Layout classes={'p-3'}>
      <section className='col-sm-10 mx-auto'>
        <div className='row'>
            <div onClick={() => window.location.href = '/admin/computers'} className='card col-sm-2 p-2 d-flex flex-column align-items-center' role='button'>
            <FaComputer style={{ fontSize: '50px' }} />
              
              <h6 className='mt-3'>Computers</h6>
            </div>
        </div>

        <div className='row pt-4'>
          {children}
        </div>
      </section>
    </Layout>
  )
}
