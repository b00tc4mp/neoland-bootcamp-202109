const { retrieveOwnersFromProperty } = require('demo-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, params: { propertyId } } = req

    try {
        validateAuthorizationAndExtractPayload(authorization)

        retrieveOwnersFromProperty(propertyId)
            .then(owners => res.json(owners))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}