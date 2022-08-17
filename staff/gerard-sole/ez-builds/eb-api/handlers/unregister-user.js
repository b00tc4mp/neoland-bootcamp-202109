const { unregisterUser } = require('eb-logics')
const jwt = require('jsonwebtoken')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')
const { env: { SECRET } } = process

module.exports = (req, res) => {
    const { headers: { authorization }, body: { password } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        unregisterUser(id, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}