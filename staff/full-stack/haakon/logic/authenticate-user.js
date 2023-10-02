const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('customs-errors')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

/**
 * TODO doc me 
 * @param {*} username 
 * @param {*} password 
 */

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ username })
        if (!user || !bcrypt.compareSync(password, user.password)) throw new CredentialsError('wrong credentials')

        return user.id
    })()
}

module.exports = authenticateUser