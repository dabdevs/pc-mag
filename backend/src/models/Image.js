const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    primary: {
        type: Boolean,
        default: false,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: false
    }
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image;