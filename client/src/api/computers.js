import axios from "axios"
import config from '../../src/config'

const baseUrl = config.apiUrl;

export const getComputers = async (page, sort = '', limit=null, token=null) => {
    try {
        let url = `${baseUrl}/api/computers${window.location.search}`

        if (sort) {
            url += url.includes('?') ? `&orderBy=${sort}` : `?orderBy=${sort}`
        }

        if (limit) {
            url += url.includes('?') ? `&limit=${limit}` : `?limit=${limit}`
        }

        const { data } = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const create = async (computer) => {
    try {
        console.log(computer)
        const url = `${baseUrl}/api/computers`
        const { data } = await axios.post(url, computer)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const update = async (computer) => {
    console.log('UPATING FROM API', computer)
    try {
        const url = `${baseUrl}/api/computers/${computer._id}`
        const { data } = await axios.put(url, computer)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const destroy = async (id) => {
    try {
        const url = `${baseUrl}/api/computers/${id}`

        const { data } = await axios.delete(url)

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getById = async (id) => {
    try {
        let url = `${baseUrl}/api/computers/${id}`

        const { data } = await axios.get(url)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getByName = async (computers, name) => {
    try {
        const computer = computers.filter(computer => computer.name === name.split('-').join(' '))

        return computer[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getComputerFormData = async () => {
    try {
        let url = `${baseUrl}/api/computers/formdata`

        const computerFormData = localStorage.getItem('computerFormData')

        if (computerFormData) {
            return Promise.resolve(JSON.parse(computerFormData))
        } else {
            const { data } = await axios.get(url)
            localStorage.setItem('computerFormData', JSON.stringify(data))
            return data
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const deleteImage = async (computerId, path) => {
    try {
        const url = `${baseUrl}/api/computers/${computerId}/delete-image`
        const { data } = await axios.post(url, { path })

        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}