const { modifyUser } = require( 'eb-logics' )
const jwt = require( 'jsonwebtoken' )
const { handleError, validateAuthorizationAndExtractPayload } = require( './helpers' )
const { env: { SECRET } } = process

module.exports = ( req, res ) => {
    const { headers: { authorization }, body: data } = req

    try {
        const payload = validateAuthorizationAndExtractPayload( authorization )
        const { sub: id} = payload
        modifyUser( id, data )
            .then( () => { res.status( 204 ).send() } )
            .catch( error => handleError( error, res ) )
    } catch ( error ) {
        handleError( error, res )
    }
}