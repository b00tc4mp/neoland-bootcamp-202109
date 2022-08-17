const { validateId } = require( './helpers/validators' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { ObjectId }, models: { User } } = require( 'eb-data' )
const { sanitizer } = require( './helpers' )

const retrieveUser = id => {
    validateId( id )

    return ( async () => {

        try {


            const user = await User.findById( id )

            if ( !user ) throw new NotFoundError( 'Wrong ID' )

            sanitizer( user )
            return user

        }
        catch ( error ) {
            throw error
        }
    } )

}

module.exports = retrieveUser