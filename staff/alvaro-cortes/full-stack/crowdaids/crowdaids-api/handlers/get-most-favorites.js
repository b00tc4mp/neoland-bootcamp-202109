const { getMostFavorites } = require('crowdaids-logic')
const { handleError } = require('./helpers')

module.exports = async (req, res) => {

    try {
        const mostFavs = await getMostFavorites()

        res.json(mostFavs)
    } catch (error) {
        handleError(error, res)
    }
}