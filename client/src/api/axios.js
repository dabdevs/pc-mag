import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getProducts = async (category = '', search = '', page=1, options={}) => {
    const response = await api.get(`/api/products?_page=${page}`, options)
    return response.data
}