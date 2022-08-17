const { validateQuery, sanitizer } = require( './helpers' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { models: { Champion } } } = require( 'eb-data' )

const retrieveChampion = query => {

    var regex = new RegExp( `\\b${query}`, 'gi' )
    validateQuery( query )

    return ( async () => {
        try {
            const champions = await Champion.find( { name: regex } ).lean()

            if ( !champions ) throw new NotFoundError( 'champions not found' )

            champions.forEach( sanitizer )
            
            return champions

        }
        catch ( error ) {
            throw error
        }
    } )()
}

module.exports = retrieveChampion