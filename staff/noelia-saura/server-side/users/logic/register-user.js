const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('errors')
const { models: { User } } = require('data')

function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password })
        .then(() => { })
        .catch(error => {
            if (error.code === 11000)
                throw new ConflictError(`user with username ${username} already exists`)

            throw error
        })
}

module.exports = registerUser
