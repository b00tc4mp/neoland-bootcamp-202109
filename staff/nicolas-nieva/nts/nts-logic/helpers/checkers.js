const { NotFoundError } = require('../../nts-errors')
const { models: { Reservation, User } } = require('./../../nts-data')

const checkIfUserExist = async (userId) => {
    // TODO validate args
    
    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    return user
}

const checkIfUserExistInReservation = async (userId, reservationId) => {
    // TODO validate args

    const reservation = await Reservation.findById(reservationId)

    if (!reservation) throw new NotFoundError(`reservation with id ${reservationId} not found`)

    if (reservation.agency.toString() !== userId) throw new NotFoundError(`user with id ${userId} not found`)

    return reservation
}

module.exports = {
    checkIfUserExist,
    checkIfUserExistInReservation
}