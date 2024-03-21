import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Menu({data}) {
    const { category } = useParams()

    return data ? (
            <nav className="card bg-white navbar mb-4 navbar-expand-lg w-100 navbar-light bg-light mb-2">
                <div className="container-fluid">
                    <ul className="navbar-nav m-0 p-0">
                        {
                            data?.categories.map(cat => (
                                <li className="nav-item mx-3 p-0" key={cat.name}>
                                    <Link 
                                        className={`nav-link ${cat.name.toLowerCase() === category || typeof (category) === 'undefined' && (cat.name === 'Computers') ? 'text-decoration-underline text-danger' : 'nav-link'}`} 
                                        aria-current="page" 
                                        to={`/${cat.name.toLowerCase()}`}
                                    > 
                                        {cat.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </nav>
    ) : null
}

