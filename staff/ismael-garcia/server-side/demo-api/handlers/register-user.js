const { registerUser } = require('users')
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { body: { name, username, password } } = req 

    try {
        registerUser(name, username, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    // estudiar este bloque
    } catch (error) {
        handleError(error, res)
    }
}