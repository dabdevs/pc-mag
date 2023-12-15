import axios from "axios"

const Checkout = async (products) => {
    try {
        const url = 'http://localhost:3000/api/checkout/create-checkout-session'
        const {data} = await axios.post(url, {items: products})
        
        return data.url
    } catch (err) {
        console.error(err)
    }
}

export default Checkout