const { retrieveItems } = require( 'eb-logics' )
const {handleError, validateAuthorizationAndExtractPayload} = require( './helpers' )

module.exports = async ( req, res ) => {
    const { headers: { authorization }, query: { q } } = req
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload( authorization )

        const items = await retrieveItems( q )
        res.status( 200 ).send( items )

    } catch ( error ) {
        handleError( error, res )
    }
}