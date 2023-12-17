const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    role: {
        type: Array,
        default: ['USER']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User;