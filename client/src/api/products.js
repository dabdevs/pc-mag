import axios from "axios"

const baseUrl = 'http://localhost:3000';

export const getProducts = async (category='', search='') => {
    try {
        let url = `${baseUrl}/api/products/${category}`

        if (search) url += search

        const { data } = await axios.get(url)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const create = async (payload) => {
    try {
        const id = payload.get('_id')
        const url = `${baseUrl}/api/products/${id}`

        const jsonData = JSON.stringify(Object.fromEntries(payload))

        const { data } = await axios.post(url, { data: jsonData })

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const update = async (payload) => {
    try {
        const id = payload.get('_id')
        const url = `${baseUrl}/api/products/${id}`
        
        const jsonData = JSON.stringify(Object.fromEntries(payload))

        const { data } = await axios.put(url, { data: jsonData })

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const destroy = async (id) => {
    try {
        const url = `${baseUrl}/api/products/${id}`

        const { data } = await axios.delete(url)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getById = async (id) => {
    try {
        let url = `${baseUrl}/api/products/${id}`

        const { data } = await axios.get(url)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getByName = async (products, name) => {
    try {
        const product = products.filter(product => product.name === name.split('-').join(' '))
  
        return product[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const searchProducts = async (search) => {
    try {
        let url = `${baseUrl}/api/search/${search}`

        const { data } = await axios.get(url)
        localStorage.setItem('products', JSON.stringify(data))

        const cachedProducts = localStorage.getItem('products')

        // if (cachedProducts) {
        //     return Promise.resolve(JSON.parse(cachedProducts))
        // } else {
        //     const { data } = await axios.get(url)
        //     localStorage.setItem('products', JSON.stringify(data))
        //     return data
        // }
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}