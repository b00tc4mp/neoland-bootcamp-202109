const { Schema, Types: { ObjectId } } = require('mongoose')

const build = new Schema({
    champion: {
        type: ObjectId,
        ref: 'Champion',
        required: true
    },
    items: [{
        type: ObjectId,
        ref: 'Item'
    }],
    user: {      
        type: ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = build