const { Schema } = require('mongoose')

const champion = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    key: {
        type: Number,
        required: true
    }
})

module.exports = champion