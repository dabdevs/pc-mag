import axios from "axios"

const Checkout = async (products) => {
    try {
        console.log(process.env.SERVER_URL)

        const {data} = await axios.post('http://localhost:3000/api/checkout/create-checkout-session', {items: products})
        
        return data.url
    } catch (err) {
        console.error(err)
    }
}

export default Checkout