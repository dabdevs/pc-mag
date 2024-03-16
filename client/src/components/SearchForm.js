import React, { useState } from 'react'
import { useComputersContext } from '../context/ComputersContext';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaHourglassEnd } from 'react-icons/fa';

export default function SearchForm() {
    const [search, setSearch] = useState('')
    const { handleSearch } = useComputersContext()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const disabled = search === ''

    const handleSubmit = (e) => {
        e.preventDefault()
        const formFactor = searchParams.get('formFactor')
        const params = { search }

        if (formFactor) params.formFactor = formFactor
        setSearchParams(params)

        handleSearch(search)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex'>
                <input id='search' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control search-input' placeholder='Search by model or brand' />
                <button disabled={disabled} className='btn btn-danger mt-2 px-4'><i className="bi bi-laptop"></i> Search</button>
            </div>
        </form>
    )
}
