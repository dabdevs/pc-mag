import axios from "axios"

export const getFlashMessages = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/flash-messages')

        return data
    } catch (err) {
        console.error(err)
    }
}
