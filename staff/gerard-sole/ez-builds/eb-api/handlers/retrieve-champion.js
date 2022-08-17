const { retrieveChampion, retrieveChampionById } = require( 'eb-logics' )
const {handleError, validateAuthorizationAndExtractPayload} = require( './helpers' )

module.exports = ( req, res ) => {
    const {  headers: { authorization }, query: { name, id }} = req
    
    try {
        validateAuthorizationAndExtractPayload( authorization )
        if(name && typeof name === 'string') {
            retrieveChampion( name )
            .then( champion => res.json( champion ) )
            .catch( error => handleError( error, res ) )
        }
        else if ( id && typeof id === 'string'){
            retrieveChampionById( id )
            .then( champion => res.json( champion ) )
            .catch( error => handleError( error, res ) )
        }
        else{
            return error
        }
    } catch ( error ) {
        handleError( error, res )
    }
}