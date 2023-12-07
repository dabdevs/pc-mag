import axios from "axios"

const baseUrl = 'http://localhost:3000';

export const getProducts = async (category='', search='', filters=[]) => {
    try {
        let url = `${baseUrl}/api/products/${category}`

        if (search) {
            url += `?q=${search}`
        }

        if (filters) {
            console.log('Filtrando...', filters)
            //await axios.post(url, filters)
        }

        const { data } = await axios.post(url, filters)
        //localStorage.setItem('products', JSON.stringify(data))

        //const cachedProducts = localStorage.getItem('products')

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
    }
}

export const getById = async (id) => {
    try {
        let url = `${baseUrl}/api/product/${id}`

        const { data } = await axios.get(url)
        return data
    } catch (err) {
        console.error(err)
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
    }
}