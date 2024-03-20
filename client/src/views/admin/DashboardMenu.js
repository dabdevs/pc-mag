import React from 'react'
import parse from 'html-react-parser';
import { Link, useParams } from 'react-router-dom';

export default function DashboardMenu() {
    const { category } = useParams()
    const data = JSON.parse(localStorage.getItem('computerFormData'))

    return (
        <div className='d-flex justify-content-between'>
            {
                data?.categories.map(cat => (
                    <Link 
                        key={cat.name} 
                        to={`${cat.name.toLowerCase()}`} 
                        className={`card text-decoration-none link-dark col-sm-2 p-2 d-flex flex-column align-items-center ${category === cat.name.toLowerCase() ? 'border-3 border-dark' : ''}`}
                    >
                        <h6 className='mt-3 text-center'>
                            <span style={{ fontSize: '50px' }}>{parse(cat.icon)}</span> <br />
                            {cat.name}
                        </h6>
                    </Link>
                ))
            }
        </div>
    )
}
