const { mongoose, models: { User } } = require( 'eb-data' )
const { validateId, validateData } = require( './helpers/validators' )
const { NotFoundError, ConflictError, CredentialsError } = require( 'eb-errors' )
const { sanitizer } = require( './helpers' )

const modifyUser = ( id, data ) => {

    validateId( id )
    validateData( data )

    return ( async () => {

        try {

            const user = await User.findById( id )
            if ( !user ) throw new NotFoundError( `user with id ${id} not found` )
            const { password, oldPassword } = data

            if ( password && oldPassword !== user.password )

                throw new CredentialsError( 'wrong password' )

            else delete data.oldPassword

            for ( const property in data )
                user[property] = data[property]

            const newUser = await user.save()
            sanitizer( newUser )

            return newUser
        }

        catch ( error ) {

            throw error
        }

    } )()

}

module.exports = modifyUser