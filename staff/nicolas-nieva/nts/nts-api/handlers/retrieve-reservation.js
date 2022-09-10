const { retrieveReservation } = require('./../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require ('./helpers')

module.exports = async (req, res) => {

    const { headers: { authorization }, params: { reservationId } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload (authorization)

        const reservation = await retrieveReservation (id, reservationId )

        res.json(reservation)

    } catch (error) {
        handleError (error, res)
    }
}