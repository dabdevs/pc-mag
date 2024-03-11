import axios from "axios"

const baseUrl = 'http://localhost:3000';

export const getProducts = async (page=1) => {
    try {
        let url = `${baseUrl}/api/products${window.location.search}`

        // console.log('window location', window.location.search)

        // if (category) url += `?q=${category}`

        // if (search) url += `?q=${search}`

        if (!url.includes(`page=${page}`)) url += url.includes('?') ? `&page=${page}` : `?page=${page}`

        console.log('URL', url)

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

export const searchProducts = async (category='', search, page=1) => {
    try {
        console.log('searching for', category, search)
        let url = `${baseUrl}/api/products`

        if (search) url += search

        if (!url.includes(`?page=${page}`)) url += `?page=${page}`

        console.log('URL', url)

        return

        const { data } = await axios.get(url)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getProductFormData = async () => {
    try {
        let url = `${baseUrl}/api/products/formdata`

        const productFormData = localStorage.getItem('productFormData')

        if (productFormData) {
            return Promise.resolve(JSON.parse(productFormData))
        } else {
            const { data } = await axios.get(url)
            localStorage.setItem('productFormData', JSON.stringify(data))
            return data
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const deleteImage = async (productId, path) => {
    try {
        const url = `${baseUrl}/api/products/${productId}/delete-image`
        const { data } = await axios.post(url, {path})

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}