const { validateId, sanitizer } = require( './helpers' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { models: { Champion } } } = require( 'eb-data' )

const retrieveChampionById = id => {

    
    validateId( id )

    return ( async () => {
        try {
            const champion = await Champion.findById( { _id: id } ).lean()

            if ( !champion ) throw new NotFoundError( 'champions not found' )
            
            sanitizer( champion )

            return champion

        }
        catch ( error ) {
            throw error
        }
    } )()
}

module.exports = retrieveChampionById