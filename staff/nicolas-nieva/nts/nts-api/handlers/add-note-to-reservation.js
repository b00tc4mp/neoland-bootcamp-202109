const { addNoteToReservation } = require('../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async(req, res) => {
    const { headers: { authorization }, body: { text }, params: { reservationId }} = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        await addNoteToReservation(id, reservationId, text)
           res.status(201).send()
            
    } catch (error) {
        handleError(error, res)
    }
}