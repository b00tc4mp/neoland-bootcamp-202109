module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require ('./authenticate-user'),
    retrieveUser: require ('./retrieve-user'),
    modifyUser: require ('./modify-user'),
    unregisterUser: require ('./unregister-user'),

    createReservation: require ('./create-reservation'),
    modifyReservation: require ('./modify-reservation'),
    deleteReservation: require ('./delete-reservation'),
    searchReservations: require ('./search-reservations'),
    retrieveReservation: require ('./retrieve-reservation'),
    retrieveReservations: require ('./retrieve-reservations'),

    addNoteToReservation: require ('./add-note-to-reservation') ,
    deleteNoteFromReservation: require ('./delete-note-from-reservation')
}