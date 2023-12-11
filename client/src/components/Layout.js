import React from 'react'
import Navbar from './Navbar'
import CartItems from './CartItems/CartItems'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <CartItems />
      <main>
        {children}
      </main>
    </>
  )
}
