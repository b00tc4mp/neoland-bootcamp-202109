const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('eb-errors')
const { models: { User } } = require('eb-data')


const authenticateUser = (username, password) => {

    validateUsername(username)
    validatePassword(password)

    return ( async () => {

        try {
            
            const user = await User.findOne({ username, password })
            if (!user) throw new CredentialsError('Wrong credentials')
            return user.id
            
        } 
        catch ( error ) {

            //TODO manejar los errores
            throw error

        }

    })()
    
}

module.exports = authenticateUser