const { NotFoundError, CredentialsError } = require('./../nts-errors')
const { models: { Note, Reservation } } = require('./../nts-data')
const { validateText } = require('./helpers/validators')
const { checkIfUserExist, checkIfUserExistInReservation } = require('./helpers/checkers')


function addNoteToReservation(userId, reservationId, text) {
    // TODO validate all params: user id, reservation id, text...

    validateText(text)

    return (async () => {
        await checkIfUserExist(userId)

        await checkIfUserExistInReservation(userId, reservationId)

        const reservation = await Reservation.findById({ _id: reservationId, agency: userId })

        const note = new Note({ text, date: new Date() })

        reservation.notes.push(note)

        await reservation.save()
    })()
}



module.exports = addNoteToReservation