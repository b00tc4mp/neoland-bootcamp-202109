const { registerProperty } = require('demo-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization }, body: { cadastre, address, squareMeters, price, currency, owners } } = req

    try {
        validateAuthorizationAndExtractPayload(authorization)

        await registerProperty(cadastre, address, squareMeters, price, currency, owners)

        res.status(201).send()
    } catch (error) {
        handleError(error, res)
    }
}