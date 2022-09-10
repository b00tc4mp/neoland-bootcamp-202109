const { ObjectId } = require('bson')
const { Schema } = require('mongoose')
const reservation = require ('./reservation')

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
                    return username.length > 6
                },
                message: 'username too short'
            },
            {
                validator(username) {
                    return !username.includes(' ')
                },
                message: 'username has white spaces'
            }
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator(email) {
                    return email.includes('@')
                },
                message: 'Is not an email'
            }
        ]
    },
    phone : {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator(password) {
                    return password.length > 8
                },
                message: 'password too short'
            },
            {
                validator(password) {
                    return !password.includes(' ')
                },
                message: 'password has white spaces'
            }
        ]
    },
    province: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    role: {
        type: String,
        enum: ['agency', 'operator'],
        default: 'agency'
    }, 
    
})

module.exports = user