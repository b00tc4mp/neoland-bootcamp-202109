const { mongoose, models: { User } } = require('data')
const { validateId, validateData } = require('./helpers/validators')
const { NotFoundError, ConflictError, CredentialsError } = require('errors')

/**
 * TODO doc me
 * @param {*} id 
 * @param {*} data 
 * @param {*} callback 
 */
function modifyUser(id, data) { // data => { username: ?, password: ?, oldPassword: ? }
    validateId(id)
    validateData(data)
    
    // readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
    //     if (error) return callback(error)

    //     const users = JSON.parse(json)

    //     const user = users.find(user => user.id == id)

    //     if (!user) return callback(new Error(`no user with id ${id} found`))

    //     const { username, password, oldPassword } = data 

    //     if (username) {
    //         const exists = users.some(user => user.username === username)

    //         if (exists) return callback(new Error('username already exists'))

    //         user.username = username 
    //     }

    //     if (password) {
    //         if (oldPassword !== user.password) return callback(new Error('wrong password'))

    //         user.password = password 
    //     }

    //     for (const key in data)
    //         if (key !== 'username'
    //         && key !== 'password'
    //         && key !== 'oldPassword')
    //             user[key] = data[key] // estudiar este statement

    //     const json2 = JSON.stringify(users, null, 4)

    //     writeFile(`${__dirname}/../users.json`, json2, error => {
    //         if (error) return callback(error)

    //         callback(null)
    //     })
    // })

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
    
            // const { name, username, password, newPassword } = data 
        
            if (data.password !== user.password) throw new CredentialsError('wrong password')
            
            if (data.newPassword) {
                data.password = data.newPassword 
    
                delete data.newPassword 
            }

            for (const property in data)
                user[property] = data[property] // estudiar esta línea
                
            return user.save()
                .catch(error => {
                    if (error.code === 11000)
                        throw new ConflictError(`user with username ${data.username} already exists`)
                    
                    throw error
                })
                .then(() => {})
        })
}

module.exports = modifyUser