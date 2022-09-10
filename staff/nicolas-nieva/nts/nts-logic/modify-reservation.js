// TODO params: userId, reservationId, data

const { models: { Reservation } } = require('../nts-data')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')

function modifyReservation(userId, reservationId, data) {
    // TODO validate args
    debugger
    return (async () => {
        await checkIfUserExist(userId)

        await checkIfUserExistInReservation(userId, reservationId)

        const reservation = await Reservation.findOne({ _id: reservationId, agency: userId })

        for (const property in data)
            reservation[property] = data[property]


        await reservation.save()
    })()
}

module.exports = modifyReservation