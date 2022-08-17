const { mongoose, models: { User } } = require('eb-data')
const { validateId, validatePassword } = require('./helpers/validators')
const { NotFoundError, CredentialsError } = require('eb-errors')

const unregisterUser = (id, password, callback) => {
    validateId(id)
    validatePassword(password)
    return (async () => {
       
        try {
        
        const user = await User.findById(id)
         if (!user ) throw new NotFoundError(`user with id ${id} not found`)
            if (user.password === password) {
                user.remove(id)
 
            }
            else throw new CredentialsError('Wrong password')
            return 'user dleleted succesfuly'
        
    }
    catch ( error ) {
        throw error
    }
    }) 
}

module.exports = unregisterUser