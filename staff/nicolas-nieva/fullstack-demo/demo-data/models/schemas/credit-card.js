const { Schema } = require('mongoose')
const note = require('./note')

const creditCard = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator(number) {
                return number.length === 16
            }
        }
    },
    expirationDate: {
        type: Date,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    note: {
        type: note
    }
})

module.exports = creditCard