import React, { useEffect, useRef, useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'

export default function Menu({formFactor}) {
    const sortRef = useRef(null)
    const { handleSortBy, setProducts, setLoading } = useProductsContext()

    const handleChange = async (sort) => {
        setLoading(true)
        await handleSortBy(sort)
        // .then(data => {
        //     console.log('Ordered')
        //     setProducts(data)
        //     setLoading(false)
        // })
        // .catch(err => {
        //     setLoading(false)
        //     console.error(err)
        // })
    }

    return (
        <nav className="card bg-white navbar mb-4 navbar-expand-lg w-100 navbar-light bg-light mb-2">
            <div className="container-fluid">
                <ul className="navbar-nav m-0 p-0">
                    <li className="nav-item mx-3 p-0">
                        <a className={!formFactor ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} aria-current="page" href="/"><i className="bi bi-pc-display-horizontal mr-2"></i> All Computers</a>
                    </li>
                    {/* <li className="nav-item mx-3 p-0 d-none">
                        <a className={formFactor === 'premium-computers' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="?formFactor=premium-computers"><i className="bi bi-laptop-fill mr-2"></i> Premium Computers</a>
                    </li> */}
                    <li className="nav-item mx-3 p-0">
                        <a className={formFactor === 'All-In-One' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="?formFactor=All-In-One"> <i className="bi bi-display mr-2"></i> All-In-One</a>
                    </li>
                    <li className="nav-item mx-3">
                        <a className={formFactor === 'Desktop' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="?formFactor=Desktop">
                            <div className='d-flex gap-1'>
                                <svg className='mt-1 bi bi-pc-display mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V1Zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0ZM9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5ZM1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2H1.5Z" />
                                </svg>
                                <span>Desktop</span>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item mx-3">
                        <a className={formFactor === 'Laptop' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="?formFactor=Laptop"> <i className="bi bi-laptop mr-2"></i> Laptops</a>
                    </li>
                </ul>
                <div>
                    <form className='d-flex'>
                        <label htmlFor='sort' className='px-2 pt-2'>Sort:</label>
                        <select ref={sortRef} id='sort' className='form-control ml-2' onChange={(e) => handleChange(e.target.value)}>
                            <option value={''}>best match</option>
                            <option value={'lowest-price'}>lowest price</option>
                            <option value={'highest-price'}>highest price</option>
                        </select>
                    </form>
                </div>
            </div>
        </nav>
    )
}

