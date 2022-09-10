const { mongoose, models: { User } } = require('demo-data')
const { validateId, validateData } = require('./helpers/validators')
const { NotFoundError, ConflictError, CredentialsError } = require('demo-errors')
const bcrypt = require('bcryptjs')

function modifyUser(id, data) {
    validateId(id)
    validateData(data)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const { password, oldPassword } = data

            if (password) {
                if (!bcrypt.compareSync(oldPassword, user.password))
                    throw new CredentialsError('wrong password')
                else
                    delete data.oldPassword
            }

            for (const property in data) {
                if (property === 'password')
                    user[property] = bcrypt.hashSync(data[property])
                else
                    user[property] = data[property]
            }

            return user.save()
                .catch(error => {
                    if (error.code === 11000)
                        throw new ConflictError(`user with username ${data.username} already exists`)

                    throw error
                })
                .then(() => { })
        })
}

module.exports = modifyUser