import axios from "axios"

const Checkout = async (computers) => {
    try {
        const url = 'http://localhost:3000/api/checkout/create-checkout-session'
        const {data} = await axios.post(url, {items: computers})
        
        return data.url
    } catch (err) {
        console.error(err)
    }
}

export default Checkout