require('dotenv').config()

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    searchBeaches,
    retrieveSwellConditions,
    retrieveSwellConditionsText,
    retrieveWeatherConditions,
    retrieveWindConditions,
    retrieveTides,
    toggleFavBeach,
    retrieveFavBeaches,
    getMostFavorites
} = require('./handlers')
const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('crowdaids-data')
const cors = require('cors')
const corsOptions = { "Access-Control-Allow-Methods": ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'] }
const helmet = require('helmet')

const logger = require('./utils/my-logger')

const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8080] } = process

logger.info('Starting server');

(async () => {
    try {
        await mongoose.connect(MONGO_URL)
        
        const server = express()
        server.use(cors(corsOptions))
        server.use(helmet({
            nocache: true,
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", 'trusted-cdn.com']
              }
            }
          }));

        const jsonBodyParser = bodyParser.json()

        const api = express.Router()
        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.patch('/users', jsonBodyParser, modifyUser)
        api.delete('/users', jsonBodyParser, unregisterUser)
        api.patch('/users/:nameBeach/:beachId',  toggleFavBeach)
        api.get('/users/favorites', retrieveFavBeaches)
        api.get('/users/mostfavorites', getMostFavorites)
        api.get('/forecast/site', searchBeaches)
        api.get('/forecast/swell', retrieveSwellConditions)
        api.get('/forecast/swelltext', retrieveSwellConditionsText)
        api.get('/forecast/weather', retrieveWeatherConditions)
        api.get('/forecast/wind', retrieveWindConditions)
        api.get('/forecast/tides', retrieveTides)

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
        })

        server.use('/api', api)
        server.listen(port, () => console.log(`Server up and listening on ${port}`))

        process.on('SIGINT', () => {
            logger.info('Stopping server')
            process.exit(0)
        })
    } catch (error) {
        console.error(error)
    }
})()
