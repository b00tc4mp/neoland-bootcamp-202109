const { validateItems, validateChampion, validateId } = require( './helpers/validators' )
const { ConflictError } = require( 'eb-errors' )
const { models: { Build } } = require('eb-data')

const createBuild = (items, champion, user) => {

    validateItems(items)
    validateChampion(champion)

    return (async () => {
        try {

            await Build.create({items, champion, user})

        } catch (error) {

        throw error
        
        }
    })()
}

module.exports = createBuild