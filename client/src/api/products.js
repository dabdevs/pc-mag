import axios from "axios"

const baseUrl = 'http://localhost:3000';

export const getProducts = async (category='', search='', filters=[]) => {
    try {
        let url = `${baseUrl}/api/products/${category}`

        if (search) {
            url += `?q=${search}`
        }

        const { data } = await axios.post(url, filters)

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

export const getByName = async (products, name) => {
    try {
        const product = products.filter(product => product.name === name.split('-').join(' '))
  
        return product[0]
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