const { models: { User, Reservation } } = require('nts-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('../nts-errors')
const { checkIfUserExist } = require('./helpers/checkers')
const { sanitizeReservation } = require('./helpers/sanitizers')

function searchReservations(userId, query) {
    validateId(userId)
    // TODO validate query is string

    return (async () => {
        const user = await checkIfUserExist(userId)

        const regex = new RegExp(query, 'i')

        let reservations

        if (user.role === 'operator')
            reservations = await Reservation.find({ pax: regex }).lean()
        else
            reservations = await Reservation.find({ pax: regex, agency: userId }).lean()

        reservations.forEach(sanitizeReservation)


        return reservations

    })()
}

module.exports = searchReservations