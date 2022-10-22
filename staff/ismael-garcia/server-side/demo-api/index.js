require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
// const { registerUser, authenticateUser, retrieveUser, modifyUser, context } = require('users')
const { mongoose } = require('data')
const { registerUser, authenticateUser, retrieveUser, modifyUser, searchVehicles } = require('./handlers')
const { context } = require('users')
// const { searchVehicles } = require('vehicles')
// const jwt = require('jsonwebtoken')
// const { MongoClient } = require('mongodb')

const { env: { PORT, SECRET, MONGO_URL }, argv: [, , port = PORT || 8080] } = process // estudiar esta línea

// MongoClient.connect(MONGO_URL, (error, client) => {
//     if (error) return console.error(error)

//     context.db = client.db()
    
//     const server = express() // estudiar esta línea
    
//     const api = express.Router()
    
//     const jsonBodyParser = bodyParser.json() // estudiar esta línea
    
//     api.post('/users', jsonBodyParser, (req, res) => {
//         const { body: { name, username, password } } = req
    
//         try {
//             registerUser(name, username, password, error => {
//                 if (error) return res.status(409).json({ error: error.message })
    
//                 res.status(201).send()
    
//             })
//         } catch ({ message }) {
//             res.status(400).json({ error: message })
    
//         }
//     })
    
//     api.post('/users/auth', jsonBodyParser, (req, res) => {
//         const { body: { username, password } } = req
    
//         try {
//             authenticateUser(username, password, (error, id) => {
//                 if (error) return res.status(401).json({ error: error.message })
    
//                 const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET) // estudiar esta línea
    
//                 res.json({ token })
//             })
//         } catch ({ message }) {
//             res.status(400).json({ error: message })
//         }
//     })
    
//     api.get('/users', (req, res) => {
//         const { headers: { authorization } } = req 
    
//         try {
//             const [, token] = authorization.split(' ')
    
//             const payload = jwt.verify(token, SECRET) // estudiar método verify de jwt
    
//             const { sub: id } = payload
    
//             retrieveUser(id, (error, user) => {
//                 if (error) return res.status(404).json({ error: message })
    
//                 res.json(user)
//             })
//         } catch ({ message }) {
//             res.status(400).json({ error: message })
    
//         }
//     })
    
//     api.patch('/users', jsonBodyParser, (req, res) => {
//         const { headers: { authorization }, body: data } = req 
    
//         try {
//             const [, token] = authorization.split(' ')
    
//             const { sub: id } = jwt.verify(token, SECRET)
    
//             modifyUser(id, data, error => {
//                 if (error) {
//                     const { message } = error
//                     let status = 400
    
//                     if (message.includes('user with id'))
//                         status = 404
//                     else if (message.includes('username already exists'))
//                         status = 409
//                     else if (message.includes('wrong password'))
//                         status = 401
    
//                     return res.status(status).json({ error: error.message })
    
//                 }
    
//                 res.status(201).send()
    
//             })
//         } catch ({ message }) {
//             res.status(400).json({ error: message })
    
//         }
//     })
    
//     api.get('/hotwheels/vehicles', (req, res) => {
//         const { query: { q } } = req 
    
//         try {
//             searchVehicles(q, (error, vehicles) => {
//                 if (error) return res.status(400).json({ error: 'client error' })
    
//                 res.json(vehicles)
    
//             })
//         } catch (error) {
//             res.status(400).json({ error: 'client error' })
//         }
//     })
    
//     api.all('*', (req, res) => {
//         res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
//     })
    
//     server.use('/api', api)
    
//     server.listen(port, () => console.log(`server up and listening on port ${port}`))
// }) // COMPLETAR

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

        api.get('/hotwheels/vehicles', searchVehicles)

        api.all('*', (req, res) => {
            res.status(404).json({ message: 'sorry, this endpoint is not available' })
        })

        server.use('/api', api)

        server.listen(port, () => console.log(`server up and listening on port ${port}`))
    })
    .catch(error => console.error(error))
