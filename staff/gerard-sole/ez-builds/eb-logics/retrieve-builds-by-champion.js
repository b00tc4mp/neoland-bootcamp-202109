const { validateId, sanitizer } = require( './helpers' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { Types: { ObjectId } }, models: { Build } } = require( 'eb-data' )


const retrieveBuildsByChampion =  (championId) => {

    validateId( championId )

    return ( async () => {
        
        try {
        
        const builds = await Build.find( { champion: new ObjectId(championId) } ).populate('user').lean()
        if ( !builds ) throw new NotFoundError( 'Wrong ID' )
    
        builds.forEach(sanitizer)
        return builds
        }
        catch (error) {

        }
    } )()
}

module.exports = retrieveBuildsByChampion