import React from 'react'
import Navbar from './Navbar'
import CartItems from './CartItems/CartItems'

export default function Layout({ children, classes }) {
  return (
    <>
      <Navbar />
      <main className={classes}>
        {children}
      </main>
    </>
  )
}
