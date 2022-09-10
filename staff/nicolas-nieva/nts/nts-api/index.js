require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { mongoose } = require('../nts-data')
const { registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    createReservation,
    retrieveReservation,
    searchReservations,
    modifyReservation,
    addNoteToReservation,
    deleteNoteFromReservation,
    deleteReservation,
    retrieveReservations
}
    = require('./handlers')

const cors = require('cors')
const corsOptions = {
    'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE']
}

const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8080] } = process;

(async () => {
    try {
        await mongoose.connect(MONGO_URL)

        const server = express()

        server.use(cors(corsOptions))

        const api = express.Router()

        const jsonBodyParser = bodyParser.json()

        api.post('/users', jsonBodyParser, registerUser)
        api.post('/users/auth', jsonBodyParser, authenticateUser)
        api.get('/users', retrieveUser)
        api.patch('/users', jsonBodyParser, modifyUser)
        api.delete('/users', jsonBodyParser, unregisterUser)

        api.post('/reservations', jsonBodyParser, createReservation)
        api.get('/reservations', retrieveReservations)
        api.get('/reservations/search', searchReservations)
        api.get('/reservations/:reservationId', retrieveReservation)
        api.patch('/reservations/:reservationId', jsonBodyParser, modifyReservation)
        api.delete('/reservations/:reservationId', jsonBodyParser, deleteReservation)

        api.post('/reservations/:reservationId/notes/', jsonBodyParser, addNoteToReservation)
        api.delete('/reservations/:reservationId/notes/:noteId', jsonBodyParser, deleteNoteFromReservation)

        

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
        })

        server.use('/api', api)

        server.listen(port, () => console.log(`server up and listening on port ${port}`))


    } catch (error) {
        console.error(error)
    }
})()

