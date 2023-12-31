import React, { useState } from 'react'
import { login } from '../api/auth'
import Layout from '../components/Layout'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Alert from '../components/Shared/Alert'

export default function Login() {
    const { token, setToken } = useAuthContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        login(email, password).then(({ token }) => {
            setLoading(false)
            setToken(token)
            localStorage.setItem('token', JSON.stringify(token))
        }).catch(err => {
            setError(err.response.data)
            setLoading(false)
            localStorage.removeItem('token')
            console.log(err)
        })
    }
    
    return token ? <Navigate to={'/dashboard'} /> : (
        <Layout>
            <section className='login'>
                <form onSubmit={handleSubmit} className='card col-sm-3 mx-auto my-5'>
                    <div className='card-header'>
                        <h1>Admin</h1>
                        {error && <Alert type={'danger'} message={error} />}
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
                        <button className='btn btn-dark w-100'>{loading ? 'Login...' : 'Login'}</button>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
