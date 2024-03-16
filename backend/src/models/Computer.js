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
        maxLength: 100
    },
    model: {
        type: String
    },
    formFactor: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: 256
    },
    images: {
        type: [String]
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
    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    }, 
    status: {
        type: String,
        enum: ['Pending', 'Published', 'Unpublished'],
        default: 'Pending'
    }, 
    datePublished: {
        type: Date,
    }
}, { timestamps: true })

const Computer = mongoose.model('computer', computerSchema)

module.exports = Computer;