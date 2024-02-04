const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;