const { modifyUser } = require('demo-logic')
const jwt = require('jsonwebtoken')
const handleError = require('./helpers/handle-error')
const { env: { SECRET } } = process

module.exports = (req, res) => {
    const { headers: { authorization }, body: data } = req

        try {
            const [, token] = authorization.split(' ')

            const { sub: id } = jwt.verify(token, SECRET)

            modifyUser(id, data)
                .then(() => {res.status(204).send()})
                .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
        }
}