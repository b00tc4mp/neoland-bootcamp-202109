const { models: { User } } = require('crowdaids-data');
const { NotFoundError } = require("crowdaids-errors");


function getMostFavorites() {

    return (async () => {
        const users = await User.find().lean()

        let favorites = []
        const mostFavorites = []

        for (let i = 0; i < users.length; i++) {
            if (users[i].favorites.length > 1) {

                for (let f = 0; f < users[i].favorites.length; f++) {

                    favorites.push(users[i].favorites[f])
                }
            } else if (users[i].favorites.length === 1) {
                favorites.push(users[i].favorites[0])
            }
        }

        if (favorites.length === 0) throw new NotFoundError('Not found favorites')

        for (let i = 0; i < favorites.length; i++) {
            let count = 0
            let deleted;

            for (let beach = 0; beach < favorites.length; beach++) {

                if (favorites[i].idBeach === favorites[beach].idBeach) {
                    count++

                    if (count >= 3 && mostFavorites.length <= 5) {
                        deleted = favorites.slice(beach, beach + 1)[0]
                        favorites = favorites.filter(beach1 => beach1 !== deleted)
                        mostFavorites.push(favorites[i])
                    }
                }
            }
        }
        return mostFavorites
    })()
}

module.exports = getMostFavorites;