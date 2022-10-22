const { Schema } = require('mongoose')
const creditCard = require('./credit-card')

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator(username) {
                    return username.length > 3
                },
                message: 'Username too short'
            },
            {
                validator(username) {
                    return !username.includes(' ')
                },
                message: 'Username has white spaces'
            }
        ]
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator(password) {
                    return password.length > 6
                },
                message: 'Password too short'
            },
            {
                validator(password) {
                    return !password.includes(' ')
                },
                message: 'Password has white spaces'
            }
        ]
    },
    creditCards: {
        type: [creditCard]
    }
})

module.exports = user