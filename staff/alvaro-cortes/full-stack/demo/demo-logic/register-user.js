const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('demo-errors')
const { models: { User } } = require('demo-data')
const bcrypt = require('bcryptjs')

/**
 * Signs up a user in the application.
 * 
 * @param {String} name The name of the user to be registered.
 * @param {String} username The username to be registered.
 * @param {String} password The password to be registered.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password: bcrypt.hashSync(password) })
        .then(() => { })
        .catch(error => {
            if(error.code === 11000)
                throw new ConflictError(`user with username ${username} already exists`)
       
            throw error
        })
}

module.exports = registerUser