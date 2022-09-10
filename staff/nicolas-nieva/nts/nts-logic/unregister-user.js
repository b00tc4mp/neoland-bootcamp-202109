const { models: { User } } = require('../nts-data')
const { NotFoundError, CredentialsError } = require('../nts-errors')
const { validateId, validatePassword } = require('./helpers/validators')
const bcrypt = require('bcryptjs')

function unregisterUser(id, password) {
    validateId(id)
    validatePassword(password)

    return (async () => {
        const user = await User.findById(id)
        debugger
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        // Si el password que pasamos por parametro es igual password del usuario encontrado entonces eliminMOA AL USUARIO
        if (bcrypt.compareSync(password, user.password)) {

            await user.delete(id)

            return ('User deleted successfully')
        }
        else {
          throw new CredentialsError('Wrong password')
        }
    })()
}
module.exports = unregisterUser