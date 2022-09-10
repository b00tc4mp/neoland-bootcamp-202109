const { deleteNoteFromReservation } = require('./../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {

    const { headers: { authorization }, params: { reservationId, noteId } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        await deleteNoteFromReservation (id, reservationId, noteId)
            res.status(200).send()
           
    } catch (error) {
        handleError(error, res)
    }
}