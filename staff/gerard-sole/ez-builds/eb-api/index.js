require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('../eb-data')
const { registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    retrieveChampion,
    retrieveItem,
    createBuild,
    deleteBuild,
    retrieveBuilds,
    retrieveItems,
} = require('./handlers')
const cors = require('cors')
const corsOptions = {
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE']}    
const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(MONGO_URL)
        .then(() => {

            
            const server = express()

            server.use(cors(corsOptions))

            const api = express.Router()

            const jsonBodyParser = bodyParser.json()


            api.post('/users', jsonBodyParser, registerUser)

            api.post('/users/auth', jsonBodyParser, authenticateUser)

            api.get('/users', retrieveUser)

            api.patch('/users', jsonBodyParser, modifyUser)

            api.delete("/users", jsonBodyParser, unregisterUser)

            api.get("/champions", jsonBodyParser, retrieveChampion)

            api.get("/item", jsonBodyParser, retrieveItem)

            api.post("/builds", jsonBodyParser, createBuild)

            api.delete("/builds", jsonBodyParser, deleteBuild)
            
            api.get("/builds", jsonBodyParser, retrieveBuilds)

            api.get("/items", jsonBodyParser, retrieveItems )

            api.all('*', (req, res) => {
                res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
            })

            server.use('/api', api)

            server.listen(port, () => console.log(`server up and listening on port ${port}`))

        })
        .catch(error => console.error(error))