import axios from "axios"

export const getFlashMessages = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/flash-messages')

        return data
    } catch (err) {
        console.error(err)
    }
}

export const formatPrice = (priceInCents) => {
    const dollars = Math.floor(priceInCents / 100);
    const cents = priceInCents % 100;
    return `${dollars}.${cents.toString().padStart(2, '0')}`;
};