const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    icon: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;