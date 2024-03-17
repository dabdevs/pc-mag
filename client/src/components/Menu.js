import React, { useEffect } from 'react'
import { useComputersContext } from '../context/ComputersContext'
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

export default function Menu() {
    const { setCategory } = useComputersContext()
    const data = JSON.parse(localStorage.getItem('computerFormData'))
    const { category } = useParams()

    useEffect(() => setCategory(category), [category])

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
                                    {parse(cat.icon)}
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

