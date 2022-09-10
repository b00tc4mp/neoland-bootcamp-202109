const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('demo-errors')
const { models: { User } } = require('demo-data')
const bcrypt = require('bcryptjs')

/**
 * TODO doc me
 * @param {*} name 
 * @param {*} username 
 * @param {*} password 
 * @param {*} callback 
 */
function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password: bcrypt.hashSync(password) })
        .then(() => { })
        .catch(error => {
            if (error.code === 11000)
                throw new ConflictError(`user with username ${username} already exists`)

            throw error
        })
}

module.exports = registerUser