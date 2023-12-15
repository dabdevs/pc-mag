import axios from 'axios'

export const register = async (email, password, name, role) => {
    try {
        const url = 'http://localhost:3000/api/auth/register'
        const {data} = await axios.post(url, { email, password, name, role })
        return data
    } catch (error) {
        throw error
    }
}

export const login = async (email, password) => {
    try {
        const url = 'http://localhost:3000/api/auth/login'
        const {data} = await axios.post(url, { email, password })
        
        return data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const url = 'http://localhost:3000/api/auth/logout'
        const { data } = await axios.post(url, {})

        return data
    } catch (error) {
        throw error
    }
}