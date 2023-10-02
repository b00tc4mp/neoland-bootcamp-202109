const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const review = new Schema({
    nameGame: [{
        type: ObjectId,
        ref: 'Game'
    }],
    content: {
        type: String,
    },
    user: [{
        type: ObjectId,
        ref: 'User'
    }]
})

module.exports = review