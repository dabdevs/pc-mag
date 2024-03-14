const mongoose = require('mongoose')

const computerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 150
    },
    brand: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 256
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
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
    rating: {
        type: Number,
    },
    availability: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

const computer = mongoose.model('computer', computerSchema)

module.exports = computer;