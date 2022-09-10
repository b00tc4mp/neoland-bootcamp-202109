const { models: { Reservation } } = require('../nts-data')
const { validateId } = require('./helpers/validators')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')
const { sanitizeReservation } = require('./helpers/sanitizers')

function retrieveReservation(userId, reservationId) {
    debugger
    validateId(userId)
    validateId(reservationId)

    return (async () => {
        await checkIfUserExist(userId)

        await checkIfUserExistInReservation(userId, reservationId)

        const reservation = await Reservation.findById(reservationId).lean()
        
        sanitizeReservation(reservation)

        return reservation
    })()
}

module.exports = retrieveReservation