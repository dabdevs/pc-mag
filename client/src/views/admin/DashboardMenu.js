import React from 'react'
import { Link } from 'react-router-dom';

export default function DashboardMenu() {
    const data = JSON.parse(localStorage.getItem('computerFormData'))
    const path = window.location.pathname.replace('/admin/','')
    console.log(path)

    return (
        <div className='d-flex justify-content-between'>
            {
                data?.categories.map(cat => (
                    <Link 
                        key={cat.name} 
                        to={`${cat.name.toLowerCase()}`} 
                        className={`card text-decoration-none link-dark col-sm-2 p-2 d-flex flex-column align-items-center ${path === cat.name.toLowerCase() || path === '' ? 'border-3 border-dark' : ''}`}
                    >
                        <h6 className='mt-3 text-center'>
                            {cat.name}
                        </h6>
                    </Link>
                ))
            }
        </div>
    )
}
