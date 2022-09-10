const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const note = require('./note')

const reservation = new Schema({
    agency: {
        type: ObjectId,
        ref: 'User',
        required: true
    }, // create reservation necesito el id del usuario para crear la logica, y crear la reserva como registrar usuario

    pax: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: String,
        require: true,
    },
    from: {
        type: Date,
        required: true
    },
    until: {
        type: Date
    },
    state: {
        type: String,
        enum: ['required', 'confirmed', 'cancelled']
    },
    agent: {
        type: String,
        required: true
    },
    notes: {
        type: [note]
    }
})

module.exports = reservation