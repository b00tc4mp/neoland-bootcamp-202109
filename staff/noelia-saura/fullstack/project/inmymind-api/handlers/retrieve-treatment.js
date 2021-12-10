const { retrieveTreatment } = require('inmymind-logic')
const { handleError} = require('./helpers')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    try {

        const date = req.query.date

        const [, token] = authorization.split(' ')

        const payload = jwt.verify(token, SECRET)

        const { sub: id } = payload

        const user_id = id
       console.log(user_id)
        retrieveTreatment(user_id, new Date(date))
            .then(treatment => res.json(treatment))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
