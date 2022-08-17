const { validateName, validateUsername, validatePassword } = require( './helpers/validators' )
const { ConflictError } = require( 'eb-errors' )
const { models: { User } } = require( 'eb-data' )

const registerUser = ( name, username, password ) => {

    validateName( name )
    validateUsername( username )
    validatePassword( password )

    return ( async () => {

        try {

            const user = await User.create( { name, username, password } )

            return 'user created'
        }
        catch ( error ) {

            if ( error.code === 11000 )
                throw new ConflictError( `user with username ${username} already exists` )

            throw error
        }
    } )()
}


module.exports = registerUser