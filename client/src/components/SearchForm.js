import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaHourglassEnd } from 'react-icons/fa';

export default function SearchForm() {
    const [search, setSearch] = useState('')
    const { handleSearch } = useProductsContext()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const disabled = search === ''

    const handleSubmit = (e) => {
        e.preventDefault()
        const formFactor = searchParams.get('formFactor')
        const params = {search}

        if (formFactor) params.formFactor = formFactor
        setSearchParams(params)

        handleSearch(search)
    }

    return (
        <section className="py-3 banner">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white row">
                    <h1 className="display-4 text-shadow fw-bolder mb-0">Shop Computers & Accesories</h1>
                    <p className="fw-normal text-white mb-0">Find your next great computer.</p>
                    <div className='col-sm-6 mx-auto'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex'>
                                <input id='search' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control search-input' placeholder='Search by model or brand' />
                                <button disabled={disabled} className='btn btn-danger mt-2 px-4'><i className="bi bi-laptop"></i> Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
