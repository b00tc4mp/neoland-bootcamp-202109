const { models: { User } } = require('data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('errors')

function retrieveUser(id) {
    validateId(id)

    return User.findById(id).lean() // estudiar esta línea
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
    
            user.id = user._id.toString()
            delete user._id // el proceso de estas dos líneas se conoce como saneamiento de datos
    
            delete user.password

            delete user.__v // peculiaridad de mongoose

            return user
        })
}

module.exports = retrieveUser