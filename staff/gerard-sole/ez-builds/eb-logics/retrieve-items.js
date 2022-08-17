const { sanitizer } = require( "./helpers" );
const { mongoose: { Types: { ObjectId } } , models: { Item, Build } } = require('eb-data');


function retrieveItems(buildId) {
    return (async () => {

        const build = await Build.findOne ({ _id: new Object ( buildId ) }).lean()
        const itemsIds = build.items
        const itemsPromise = itemsIds.map( id => Item.findById(id.toString()).lean() ) 
        const items = await Promise.all ( itemsPromise )
        items.forEach(item => {

            sanitizer(item)
           
        })

        
        return items
    })()
}

module.exports = retrieveItems