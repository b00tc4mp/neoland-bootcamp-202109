require('dotenv').config()

const { 
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    searchVehicles,
    addCreditCardToUser,
    registerProperty,
    retrieveOwnersFromProperty
} = require('./handlers')
const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('demo-data')

const logger = require('./utils/my-logger')

const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8080] } = process

logger.info('Starting server')

mongoose.connect(MONGO_URL)
    .then(() => {
        const server = express()

        const api = express.Router()

        const jsonBodyParser = bodyParser.json()
    
        api.post('/users', jsonBodyParser, registerUser)
     
        api.post('/users/auth', jsonBodyParser, authenticateUser)
     
        api.get('/users', retrieveUser)
     
        api.patch('/users', jsonBodyParser, modifyUser)
     
        api.delete('/users', jsonBodyParser, unregisterUser)

        api.post('/users/cards', jsonBodyParser, addCreditCardToUser)
     
        api.get('/hotwheels/vehicles', searchVehicles)

        api.post('/properties', jsonBodyParser, registerProperty)

        api.get('/properties/:propertyId', retrieveOwnersFromProperty)

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
        })
    
        server.use('/api', api)
    
        server.listen(port, () => console.log(`Server up and listening on ${port}`))
    
        process.on('SIGINT', () => {
            logger.info('Stopping server')

            process.exit(0)
        })
    })
    .catch(error => console.error(error))
