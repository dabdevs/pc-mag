import axios from "axios"

export const getProducts = async (category='') => {
    try {
        const baseUrl = 'http://localhost:3000';
        let url = `${baseUrl}/api/products/${category}`

        const { data } = await axios.get(url)
        localStorage.setItem('products', JSON.stringify(data))

        const cachedProducts = localStorage.getItem('products')

        if (cachedProducts) {
            return Promise.resolve(JSON.parse(cachedProducts))
        } else {
            const { data } = await axios.get(url)
            localStorage.setItem('products', JSON.stringify(data))
            return data
        }
    } catch (err) {
        console.error(err)
    }
}