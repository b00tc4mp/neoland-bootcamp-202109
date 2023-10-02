const { models: { User } } = require('data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('customs-errors')

function retrieveUser(id) {
    validateId(id)

    return (async () => {
        const user = await User.findById(id).lean()
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.id = user._id.toString()

        delete user._id

        delete user.password

        delete user.__v

        return user
    })()
}

module.exports = retrieveUser