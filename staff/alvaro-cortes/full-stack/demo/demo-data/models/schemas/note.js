const { Schema } = require('mongoose')

const note = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = note