const { model } = require('mongoose')
const { user, reservation, note } = require('./schemas')

module.exports = {
    User: model('User', user),
    Reservation: model ('Reservation', reservation),
    Note: model ('Note', note)
}