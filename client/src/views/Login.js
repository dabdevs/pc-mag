import React, { useState } from 'react'
import { login } from '../api/auth'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
 
export default function Login() {
    const {auth, setAuth} = useAuthContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    if (auth) {
        window.location.href = '/dashboard'
        return
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password).then(token => {
            setAuth(token)
            localStorage.setItem('auth', JSON.stringify(token))
            navigate('/dashboard')
        }).catch(err => console.log(err))
    }

    return (
        <Layout>
            <section className='login'>
                <form onSubmit={handleSubmit} className='card col-sm-3 mx-auto my-5'>
                    <div className='card-header'>
                        <h1>Admin</h1>
                    </div>
                    <div className='card-body'>
                        <div className='row p-2'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                id='email'
                                name='email'
                                value={email}
                                type='email'
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='row p-2'>
                            <label htmlFor='password'>Password:</label>
                            <input
                                name='password'
                                value={password}
                                type='password'
                                className='form-control'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-dark w-100'>Login</button>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
