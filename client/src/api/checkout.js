import axios from "axios"
import config from '../config.json'

const baseUrl = config.apiUrl;

const Checkout = async (computers) => {
    try {
        const url = `${baseUrl}/api/checkout/create-checkout-session`
        const {data} = await axios.post(url, {items: computers})
        
        return data.url
    } catch (err) {
        console.error(err)
    }
}

export default Checkout