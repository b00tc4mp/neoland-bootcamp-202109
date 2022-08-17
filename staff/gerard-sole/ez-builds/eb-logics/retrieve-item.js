const { validateQuery, sanitizer } = require( './helpers' )
const { NotFoundError } = require( 'eb-errors' )
const { mongoose: { models: { Item } } } = require( 'eb-data' )

const retrieveItem = query => {
    validateQuery( query )
    const regex = new RegExp( query, 'i' )

    return ( async () => {

        const item = await Item.find( { name: regex } ).lean()
        if ( !item ) throw new NotFoundError( 'Wrong Name' )
        item.forEach( sanitizer )

        return item
    } )()
}


module.exports = retrieveItem