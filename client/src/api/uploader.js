import axios from "axios"

export const upload = async (images) => {
    try {
        const { data } = await axios.post('http://localhost:3000/api/upload', images)

        return data
    } catch (err) {
        console.error(err)
    }
}