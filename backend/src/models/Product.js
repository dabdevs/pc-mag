const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 150
    },
    description: {
        type: String,
        maxLength: 256
    },
    images: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    os: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    disk: {
        type: String,
        required: true,
    },
    diskType: {
        type: String,
        required: true,
    },
    display: {
        type: String,
        required: true,
    },
    formFactor: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    // createdBy: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User' 
    // },
    // createdOn: {
    //     type: Date,
    //     required: true
    // },
    // modifiedAt: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product;