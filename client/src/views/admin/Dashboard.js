import React from 'react'
import { Navigate, useParams, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import DashboardMenu from './DashboardMenu';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  const { token } = useAuthContext()
  const { category } = useParams()

  return !token ? <Navigate to={'/login'} /> : (
    <>
      <Navbar />
      <section className='col-sm-10 mx-auto py-4'>
        {category !== 'profile' ? <DashboardMenu /> : null}

        <div className='pt-4'>
          <Outlet />
        </div>
      </section>
    </>
  )
}
