const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('customs-errors')
const { models: { User, Game } } = require('data')

function retrievePlayingGames(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const games = await Game.find({ _id: { $in: user.playingGames } }).populate('platforms', {
            name: 1
        }).populate('genres', {
            name: 1
        }).lean()

        games.forEach(game => {
            game.id = game._id.toString()
            delete game._id
            delete game.__v
        })

        return games
    })()
}

module.exports = retrievePlayingGames