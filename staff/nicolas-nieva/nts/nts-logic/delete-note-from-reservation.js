const { models: { User, Note, Reservation } } = require('nts-data')
const { NotFoundError } = require('../nts-errors')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')

function deleteNoteFromReservation(userId, reservationId, noteId) {
    // TODO validate args

    return (async () => {
        await checkIfUserExist(userId)

        await checkIfUserExistInReservation(userId, reservationId)

        const reservation = await Reservation.findById({ _id: reservationId, agency: userId })

        if (!reservation) throw new NotFoundError(`reservation with id ${reservationId} not found`)

        const notes = reservation.notes.filter(note => note.id !== noteId)

        reservation.notes = notes

        await reservation.save()
    })()

}

module.exports = deleteNoteFromReservation
