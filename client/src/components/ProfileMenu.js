import React from 'react'
import { logout } from '../api/auth'
import { Link } from 'react-router-dom'

export default function ProfileMenu({toggled, user}) {
    const handleLogout = () => {
        logout().then(() => {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }).catch(err => {
            console.log(err)
        })
    }

    const style = {
        position: 'absolute',
        top: '50px',
        right: 0
    }

    return toggled ? (
        <div style={style}>
            <ul class="list-group text-center">
                <li className="list-group-item"><Link className='text-decoration-none text-dark' to={'/profile'}><b>{user?.name}</b></Link></li>
                <li className="list-group-item"><Link className='text-decoration-none text-dark' to={'/another-route'}>Another action</Link></li>
                <li className="list-group-item">
                    {user && <button onClick={handleLogout} className="text-white btn btn-danger w-100" type="button">Logout</button>}
                </li>
            </ul>
        </div>
    ) : null
}
