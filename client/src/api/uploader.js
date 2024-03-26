import axios from "axios"
import config from '../config.json'

const baseUrl = config.apiUrl;

export const upload = async (images, token) => {
    try {
        const { data } = await axios.post(`${baseUrl}/api/dashboard/computers/images/upload`, images, { headers: { "Authorization": `Bearer ${token}` } })

        return data
    } catch (err) {
        throw err
    }
}