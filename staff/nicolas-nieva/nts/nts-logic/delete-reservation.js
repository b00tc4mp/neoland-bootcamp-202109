const { models: { Reservation } } = require('../nts-data')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')

function deleteReservation(userId, reservationId) {
    // TODO validate args   

    return (async () => {
        await checkIfUserExist(userId)

        await checkIfUserExistInReservation(userId, reservationId)

        await Reservation.deleteOne({ _id: reservationId })
    })()
}

module.exports = deleteReservation