import React from 'react'
import { a } from 'react-router-dom'
import { useProductsContext } from '../context/ProductsContext'

export default function Menu({category}) {
    const { handleSortBy, products, setProducts, setLoading, setError } = useProductsContext()

    const handleChange = (sort) => {
        setLoading(true)
        handleSortBy(products, sort, category)
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.error(err)
        })
    }

    return (
        <nav className="card bg-white navbar mb-4 navbar-expand-lg w-100 navbar-light bg-light mb-2">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav m-0 p-0">
                        <li className="nav-item mx-3 p-0">
                            <a className={!category ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} aria-current="page" href="/"><i className="bi bi-pc-display-horizontal mr-2"></i> All Computers</a>
                        </li>
                        <li className="nav-item mx-3 p-0 d-none">
                            <a className={category === 'premium-computers' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="/category/premium-computers"><i className="bi bi-laptop-fill mr-2"></i> Premium Computers</a>
                        </li>
                        <li className="nav-item mx-3 p-0">
                            <a className={category === 'all-in-one' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="/category/all-in-one"> <i className="bi bi-display mr-2"></i> All-in-One</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className={category === 'desktop' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="/category/desktop">
                                <div className='d-flex gap-1'>
                                    <svg className='mt-1 bi bi-pc-display mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V1Zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0Zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0ZM9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5ZM1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2H1.5Z" />
                                    </svg>
                                    <span>Desktop</span>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className={category === 'notebook' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} href="/category/notebook"> <i className="bi bi-laptop mr-2"></i> Notebook</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <form className='d-flex'>
                        <label htmlFor='sort' className='px-2 pt-2'>Sort:</label>
                        <select id='sort' className='form-control ml-2' onChange={(e) => handleChange(e.target.value)}>
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
