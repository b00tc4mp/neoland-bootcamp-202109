const { registerProperty } = require('demo-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { cadastre, address, squareMeters, price, currency, owners } } = req

    try {
        validateAuthorizationAndExtractPayload(authorization)

        registerProperty(cadastre, address, squareMeters, price, currency, owners)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}