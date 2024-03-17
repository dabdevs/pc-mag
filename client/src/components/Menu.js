import React, { useRef, useState, useEffect } from 'react'
import { useComputersContext } from '../context/ComputersContext'
import { Link, useSearchParams, useParams } from 'react-router-dom';

export default function Menu() {
    const sortRef = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const { handleSortBy, setLoading, setCategory } = useComputersContext()
    // const [category, setCategory] = useState('Computers')
    const data = JSON.parse(localStorage.getItem('computerFormData'))
    const { category } = useParams()

    useEffect(() => setCategory(category), [category])

    console.log('Search params', category)

    const handleChange = async (sort) => {
        setLoading(true)
        await handleSortBy(sort)
    }

    return (
        <nav className="card bg-white navbar mb-4 navbar-expand-lg w-100 navbar-light bg-light mb-2">
            <div className="container-fluid">
                <ul className="navbar-nav m-0 p-0">
                    {
                        data?.categories.map(cat => (
                            <li className="nav-item mx-3 p-0" key={cat.name}>
                                <Link 
                                    className={cat.name === category || typeof (category) === 'undefined' && cat.name === 'Computers' ? 'text-danger nav-link text-decoration-underline' : 'nav-link'} 
                                    aria-current="page" 
                                    to={`/${cat.name}`}
                                > 
                                    <i className="bi bi-laptop me-2"></i> 
                                    {cat.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

