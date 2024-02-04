const mongoose = require('mongoose')

const OperativeSystemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    }
})

const OperativeSystem = mongoose.model('OperativeSystem', OperativeSystemSchema)

module.exports = OperativeSystem;