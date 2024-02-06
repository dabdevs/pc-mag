const mongoose = require('mongoose')

const ProcessorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    }
})

const Processor = mongoose.model('Processor', ProcessorSchema)

module.exports = Processor;