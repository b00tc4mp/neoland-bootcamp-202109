const express = require('express')
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: false }) // estudiar esta línea
const { registerUser, authenticateUser, retrieveUser } = require('users')
const { landing, signUp, postSignUp, signIn, home, fail } = require('./components')
const { getUserId } = require('./helpers')
const { searchVehicles } = require('vehicles')

const server = express()

server.use(express.static('public')) // middleware

// Syntax: server.get(path, callback(request, response) => { asynchronous body })


// ----- landing -----
server.get('/', (req, res) => {
    const { headers: { cookie } } = req 
    
    if (cookie) {
        const id = getUserId(cookie)

    // if (id)
        return retrieveUser(id, (error, user) => {
            if (error)
                return res.send(fail({ message: error.message }))

            const { query: { q } } = req // estudiar esta línea

            if (q)
                return searchVehicles(q, (error, results) => {
                    if (error)
                        return res.send(fail({ message: error.message }))
                    
                    res.send(home({ name: user.name, results }))
                })

            res.send(home({ name: user.name }))
        
        })
    }

    res.send(landing())
})


// ----- signup -----
server.get('/signup', (req, res) => { // http://localhost:8000/signup
    const { headers: { cookie } } = req
    

    if (cookie) {
        const id = getUserId(cookie)

        return res.redirect('/')

    }

    res.send(signUp())

})

server.post('/signup', formBodyParser, (req, res) => {
    const { headers: { cookie } } = req
    
    if (cookie) {
        const id = getUserId(cookie)

        return res.redirect('/')
        
    }
    
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, error => {
            if (error) return res.send(signUp({ name, username, feedback: error.message }))
            
            res.send(postSignUp())

        })
    } catch (error) {
        if (error) return res.send(signUp({ name, username, feedback: error.message }))

    } 
})


// ----- signin -----
server.get('/signin', (req, res) => {
    const { headers: { cookie } } = req
    
    if (cookie) {
        const id = getUserId(cookie)

        return res.redirect('/')
        
    }

    res.send(signIn())
})

server.post('/signin', formBodyParser, (req, res) => {
    const { headers: { cookie } } = req
    // const id = getUserId(cookie)

    // if (id) return res.redirect('/')

    if (cookie) {
        const id = getUserId(cookie)

        return res.redirect('/')
        
    }
    
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error)
                return res.send(signIn({ username, feedback: error.message }))

            res.setHeader('Set-Cookie', `user-id=${id}; Max-Age=3600`)

            res.redirect('/')

        })
    } catch (error) {
        return res.send(signIn({ username, feedback: error.message }))

    }
})


// ----- signout -----
server.post('/signout', (req, res) => {
    res.setHeader('Set-Cookie', `user-id=null; Max-Age=0`)

    res.redirect('/')
})

server.all('*', (req, res) => {
    res.send(fail({ message: 'sorry, this page isn\'t available' }))
}) // estudiar este bloque


server.listen(8000)