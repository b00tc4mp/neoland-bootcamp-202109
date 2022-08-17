const { validateId, sanitizer } = require( './helpers' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { Types: { ObjectId } }, models: { Build } } = require( 'eb-data' )


function retrieveBuildsByUser( user ) {
    validateId(user)
    
    return ( async () => {
        const builds = await Build.find( { "user": new ObjectId(user) } ).populate('champion').lean()
        if ( !builds ) throw new NotFoundError( 'Wrong ID' )
        builds.forEach(build => {
            sanitizer(build)
            sanitizer(build.champion)
        })

        return builds
    } )() 
}

module.exports = retrieveBuildsByUser