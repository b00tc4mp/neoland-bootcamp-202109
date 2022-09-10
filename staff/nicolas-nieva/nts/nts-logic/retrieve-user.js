const { models: { User } } = require('../nts-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('../nts-errors')
const { sanitizeUser } = require('./helpers/sanitizers')

function retrieveUser(id) {
    validateId(id)

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        sanitizeUser(user)

        return user
    })()
}

module.exports = retrieveUser