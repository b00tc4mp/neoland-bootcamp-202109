const { addCreditCardToUser } = require('demo-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { name, number, expirationDate, cvv } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        addCreditCardToUser(id, name, number, new Date(expirationDate), cvv)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}