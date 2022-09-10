const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('demo-errors')
const { models: { User } } = require('demo-data')
const bcrypt = require('bcryptjs')

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return User.findOne({ username })
        .then(user => {
            if (!user || !bcrypt.compareSync(password, user.password)) throw new CredentialsError('wrong credentials')

            return user.id
        })
}

module.exports = authenticateUser