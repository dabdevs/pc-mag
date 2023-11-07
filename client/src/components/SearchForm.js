import React, { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext';

export default function SearchForm() {
    const { handleSearch } = useProductsContext()
    const [keyword, setKeyword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch(keyword)
        setKeyword('')
    }

    return (
        <section className="py-3 banner">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white row">
                    <h1 className="display-4 text-shadow fw-bolder mb-0">Shop Computers and Laptops</h1>
                    <p className="fw-normal text-white mb-0">Find your next great computer.</p>
                    <div className='col-sm-6 mx-auto'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex'>
                                <input id='keyword' value={keyword} onChange={(e) => setKeyword(e.target.value)} className='form-control search-input' placeholder='Search by model or brand' />
                                <button className='btn btn-danger mt-2 px-4'><i className="bi bi-laptop"></i> Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
