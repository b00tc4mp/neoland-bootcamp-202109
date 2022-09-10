const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const createReservation = require('./create-reservation')
const addNoteToReservation = require('./add-note-to-reservation')
const searchReservations = require('./search-reservations')
const modifyReservation = require('./modify-reservation')
const deleteNoteFromReservation = require('./delete-note-from-reservation')
const deleteReservation = require('./delete-reservation')
const retrieveReservation = require ('./retrieve-reservation')
const retrieveReservations = require ('./retrieve-reservations')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    createReservation,
    addNoteToReservation,
    searchReservations,
    modifyReservation,
    deleteNoteFromReservation,
    deleteReservation,
    retrieveReservation,
    retrieveReservations
}

