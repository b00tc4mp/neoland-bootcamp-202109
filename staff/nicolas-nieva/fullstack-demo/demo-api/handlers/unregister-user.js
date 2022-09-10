const { unregisterUser } = require('users')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const handleError = require('./helpers/handle-error')

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