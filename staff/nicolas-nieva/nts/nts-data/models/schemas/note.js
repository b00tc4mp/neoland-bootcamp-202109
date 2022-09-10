const { Schema, Types: { ObjectId } } = require('mongoose')


const note = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
})

module.exports = note