const express = require('express');
const axios = require('axios');
const router = express.Router();

const getProducts = async () => {
    try {
        const productURL = 'https://s3-sa-east-1.amazonaws.com/api.sis/embedded/PE_LaCuracao/SRT/data/products.json'
        const { data } = await axios.get(productURL);

        return data
    } catch (err) {
        console.error(err)
    }
}

function formatPrice(strNumber) {
    return parseInt(strNumber.replace(/,/g, '').replace('.', '')) / 100;
}
 
router.get('/products/:category?', async (req, res) => {
    try {
        let data = await getProducts()
        let products = Object.entries(data)
        const category = req.params.category

        if (['notebook', 'desktop', 'all-in-one'].includes(category)) {
            if (category === 'all-in-one') {
                products = products.filter(([key, value]) => value['link'].includes(category))
            } else {
                products = products.filter(([key, value]) => value['form_factor'].toLowerCase() === category)
            }
        }

        if (category === 'premium-computers') {
            products = products.filter(([key, value]) => {
                const premiumSpecs = ['i5', 'i7', 'i9', '16GB', '32GB', '1tb', '2tb', 'ssd']
                
                for(let spec of premiumSpecs) {
                    if (value['name'].toLowerCase().includes(spec) || formatPrice(value['price']) >= 3000 ) {
                        return true
                    }
                    return false
                }
            })
        }

        return res.json(products)
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
})

module.exports = router;
