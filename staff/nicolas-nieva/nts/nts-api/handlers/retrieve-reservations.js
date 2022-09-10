const { retrieveReservations } = require('../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require ('./helpers')

module.exports = async (req, res) => {

    const { headers: { authorization } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload (authorization)

        const reservation = await retrieveReservations (id)

        res.json(reservation)

    } catch (error) {
        handleError (error, res)
    }
}