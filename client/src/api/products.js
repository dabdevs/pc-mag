import axios from "axios"

const baseUrl = 'http://localhost:3000';

export const getProducts = async (category='', search='', page=1) => {
    try {
        let url = `${baseUrl}/api/products`
        console.log('andan function ', page)
        if (search) url += search

        if (page) url += `?page=${page}`

        console.log(url)
        
        const { data } = await axios.get(url)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const create = async (product) => {
    try {
        console.log(product)
        const url = `${baseUrl}/api/products`
        const { data } = await axios.post(url, product)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const update = async (product) => {
    console.log('UPATING FROM API', product)
    try {
        const url = `${baseUrl}/api/products/${product._id}`
        const { data } = await axios.put(url, product)

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