const { retrieveBuildsByChampion, retrieveBuildsByUser } = require( 'eb-logics' )
const {handleError, validateAuthorizationAndExtractPayload} = require( './helpers' )

module.exports = ( req, res ) => {
    try {
        debugger
        const { headers: { authorization }, query: { q: championId } } = req

        const { sub: userId } = validateAuthorizationAndExtractPayload( authorization )

        if ( championId ) {
            retrieveBuildsByChampion( championId )
                .then( builds => res.json( builds ) )
                .catch( error => handleError( error, res ) )
        } else {
            retrieveBuildsByUser( userId )
                .then( builds => res.json( builds ) )
                .catch( error => handleError( error, res ) )
        }
    } catch ( error ) {
        handleError( error, res )
    }
}