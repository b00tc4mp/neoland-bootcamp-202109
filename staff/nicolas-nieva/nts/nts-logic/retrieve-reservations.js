const { models: { Reservation } } = require('nts-data')
const { validateId } = require('./helpers/validators')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')
const { sanitizeReservation } = require('./helpers/sanitizers')
const { ObjectId } = require('mongodb')

function retrieveReservations(userId) {
    // validateId(userId)
    // validateId()

    return (async () => {
        const user = await checkIfUserExist(userId)

        let reservations

        if (user.role === 'operator')
            reservations = await Reservation.find().lean()
        else
            reservations = await Reservation.find({ agency: ObjectId(userId) }).lean()
        
        reservations.forEach(sanitizeReservation)

        return reservations
    })()
}

module.exports = retrieveReservations