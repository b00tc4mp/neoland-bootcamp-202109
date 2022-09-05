const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('errors')
const { models: { User } } = require('data')

/**
 * TODO doc me
 * @param {*} name 
 * @param {*} username 
 * @param {*} password 
 */

// function registerUser(name, username, password, callback) {
//     validateName(name)
//     validateUsername(username)
//     validatePassword(password)
//     validateCallback(callback)

//     const users = context.db.collection('users')

//     users.insertOne({ name, username, password }, error => {
//         if (error) {
//             if (error.code === 11000)
//                 callback(new ConflictError(`user with username ${username} already exists`))
//             else
//                 callback(error)

//             return
//         }

//         callback(null)
//     })
    
// }

function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password })
        .then(() => { }) // estudiar esta línea
        .catch(error => {
            if (error.code === 11000)
                throw new ConflictError(`user with username ${username} already exists`)

            throw error
        })
        
}

module.exports = registerUser//.bind(context)