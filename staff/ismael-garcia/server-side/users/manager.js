const findUsers = require( './logic/find-users' )
const registerUser = require('./logic/register-user')
const retrieveUser = require( './logic/retrieve-user' )
const unregisterUser = require('./logic/unregister-user')
const modifyUser = require('./logic/modify-user')
const authenticateUser = require('./logic/authenticate-user')

const { argv: [, , command] } = process

if (command === 'register') { // $ node manager register "Peter Pan" peterpan 123123123
    const { argv: [, , , name, username, password] } = process

    registerUser(name, username, password, error => {
        if (error) return console.log(error.message)

        console.log('user registered')
    
    })
} else if (command === 'unregister') { // $ node manager unregister kw0mnxlk 123123123
    const { argv: [, , , id, password] } = process

    unregisterUser(id, password, error => {
        if (error) return console.log(error.message)

        console.log(`user ${id} unregistered`)
    
    })
} else if (command === 'retrieve') { // $ node manager retrieve kw0ms3h9
    const { argv: [, , , id]} = process

    retrieveUser(id, (error, user) => {
        if (error) return console.log(error.message)

        console.log(user)
    
    })
} else if (command === 'find') { // $ node manager find pan
    const { argv: [, , , query]} = process

    findUsers(query, (error, results) => {
        if (error) return console.log(error.message)

        console.log('ID NAME USERNAME PASSWORD')

        results.forEach(( { id, name, username } ) => console.log(id, name, username))
    
    })
} else if (command === 'modify') { // $ node manager modify kw0ms3h9 . . 123123123:234234234
// $ node manager modify kw0ms3h9 "Juanito Perez" . .
    const { argv: [, , , id, name, username, password] } = process

    modifyUser(id, name, username, password, error => {
        if (error) return console.log(error.message)

        console.log(`user with id${id} has been updated`)
    
    }) 
} else if (command === 'authenticate') { // $ node manager authenticate peterpan 123123123
    const { argv: [, , , username, password] } = process

    authenticateUser(username, password, (error, id) => {
        if (error) return console.log(error.message)
        
        console.log(id)
        
    })
}