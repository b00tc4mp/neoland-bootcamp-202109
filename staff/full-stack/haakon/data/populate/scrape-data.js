const axios = require('axios')
const fs = require('fs').promises
const path = require('path')
const mongoose = require('mongoose')
const { models: { Game, Platform, Genre } } = require('../index')

const uri = 'mongodb://localhost/demo'

    ; (async function () {
        try {
            await mongoose.connect(uri)

            await Platform.deleteMany()
            await Game.deleteMany()
            await Genre.deleteMany()

            const res = await axios.get('https://api.rawg.io/api/games?key=8cc91cc3d7094411940ec44617d66d39')

            const { results } = res.data

            const insertions = results.map(async ({ id, name, released, background_image, metacritic, platforms, genres, short_screenshots }) => {
                const game = {}

                const screenshots = short_screenshots.map(({ image }) => {
                    const a = image

                    return a
                })

                await Promise.all(
                    platforms.map(async item => {
                        const platform = {
                            name: item.platform.name
                        }

                        try {
                            await Platform.create(platform)
                        } catch (error) {
                            if (error.code === 11000)
                                console.log(error.code);
                        }
                    })
                )

                const _platforms = await Promise.all(
                    platforms.map(async item => {
                        const findPlatform = await Platform.findOne({ name: item.platform.name })
                        return findPlatform._id
                    })
                )

                await Promise.all(
                    genres.map(async genre => {
                        const _genre = {
                            name: genre.name
                        }

                        try {
                            await Genre.create(_genre)

                        } catch (error) {
                            if (error.code === 11000)
                                console.log(error.code);
                        }
                    })
                )

                const _genres = await Promise.all(
                    genres.map(async genre => {
                        const findGenre = await Genre.findOne({ name: genre.name })
                        return findGenre._id
                    })
                )

                const { data: { website, description_raw } } = await axios.get(`https://api.rawg.io/api/games/${id}?key=8cc91cc3d7094411940ec44617d66d39`)

                game.name = name
                game.released = released
                game.backgroundImage = background_image
                game.score = metacritic
                game.screenshots = screenshots
                game.platforms = _platforms
                game.genres = _genres
                game.description = description_raw
                game.website = website

                await Game.create(game)
            })

            await Promise.all(insertions)

            await mongoose.disconnect()
        } catch (error) {
            console.error(error)
        }
    })()