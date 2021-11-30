require("dotenv").config()

const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('data')
const { registerUser, authenticateUser, retrieveUser, modifyUser, unregisterUser } = require('./handlers')
const { context } = require('users')

const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(MONGO_URL)
    .then(() => {

        context.db = mongoose.connection.db

        const server = express()

        const api = express.Router()

        const jsonBodyParser = bodyParser.json()


        api.post('/users', jsonBodyParser, registerUser)

        api.post('/users/auth', jsonBodyParser, authenticateUser)

        api.get('/users', retrieveUser)

        api.patch('/users', jsonBodyParser, modifyUser)

        api.delete("/users", jsonBodyParser, unregisterUser)

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
        })

        server.use('/api', api)

        server.listen(port, () => console.log(`server up and listening on port ${port}`))

    })
    .catch(error => console.error(error))
