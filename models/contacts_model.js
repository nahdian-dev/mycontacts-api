const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fields name diperlukan!"],
    },
    email: {
        type: String,
        required: [true, "Fields email diperlukan!"]
    },
    phone: {
        type: Number,
        required: [true, "Fields phone diperlukan!"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Contact', contactSchema)