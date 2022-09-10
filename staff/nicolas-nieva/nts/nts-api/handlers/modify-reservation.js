const { modifyReservation } = require('./../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('../../nts-api/handlers/helpers')

module.exports = async (req, res) => {

    const { headers: { authorization }, body: data, params: { reservationId } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        await modifyReservation(id, reservationId, data)

        res.status(204).send()

    } catch (error) {
        handleError(error, res)
    }
}