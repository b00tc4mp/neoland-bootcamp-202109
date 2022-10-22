const { unregisterUser } = require('demo-logic')
const jwt = require('jsonwebtoken')
const handleError = require('./helpers/handle-error')
const { env: { SECRET } } = process

module.exports = (req, res) => {
    const { headers: { authorization }, body: { password } } = req

    try {
        const [, token] = authorization.split(' ')

        const { sub: id } = jwt.verify(token, SECRET)

        unregisterUser(id, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}