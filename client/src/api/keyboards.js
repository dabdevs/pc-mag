import axios from "axios"

import config from '../config.json'

const baseUrl = config.apiUrl;

export const getKeyboards = async (page, sort = '', limit = null) => {
    console.log('Get Keyboards')
    return []
    // try {
    //     let url = `${baseUrl}/api/computers${window.location.search}`

    //     if (sort) {
    //         url += url.includes('?') ? `&orderBy=${sort}` : `?orderBy=${sort}`
    //     }

    //     if (limit) {
    //         url += url.includes('?') ? `&limit=${limit}` : `?limit=${limit}`
    //     }

    //     //if (!url.includes(`page=${page}`)) url += url.includes('?') ? `&page=${page}` : `?page=${page}`

    //     console.log('URL', url)

    //     const { data } = await axios.get(url)

    //     return data
    // } catch (err) {
    //     console.error(err)
    //     throw err
    // }
}