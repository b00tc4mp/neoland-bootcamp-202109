const { registerUser } = require('demo-logic')
const { handleError } = require('./helpers')

module.exports = (req, res) => {
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}