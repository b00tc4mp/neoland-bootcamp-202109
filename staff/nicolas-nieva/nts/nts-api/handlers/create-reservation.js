const { createReservation } = require('./../../nts-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')


module.exports = async (req, res) => {
    const { headers: { authorization }, body: { pax, quantity, product, from, until, state, agent, note} } = req


    try {
        const { sub: id } = validateAuthorizationAndExtractPayload (authorization)

        await createReservation (id, pax, quantity, product, from, until, state, agent, note)
        res.status(201).send()

    }catch (error){
        handleError (error, res)
    }
}