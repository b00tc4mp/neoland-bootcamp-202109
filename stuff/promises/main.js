// function delay(callback) {
//     setTimeout(callback, 1000)
// }

// delay(() => {
//     console.log(1)

//     delay(() => {
//         console.log(2)

//         delay(() => {
//             console.log(3)
//         })
//     })
// })

// function delay() {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 1000)
//     })
// }

// delay()
//     .then(() => { // "theneables" ("entoncesables")
//         console.log(1)

//         return delay()
//     })
//     .then(() => {
//         console.log(2)

//         return delay()
//     })
//     .then(() => {
//         console.log(3)
//     })

// (async () => {
//     await delay()

//     console.log(1)

//     await delay()

//     console.log(2)

//     await delay()

//     console.log(3)
// })()


// function authenticateUser(username, password, callback) {
//     if (typeof username !== 'string')  throw new TypeError(username + ' is not a string')
//     if (!username.trim().length) throw new Error('username is empty or blank')
//     if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
//     if (username.length < 4) throw new Error('username has less than 4 characters')

//     if (typeof password !== 'string')  throw new TypeError(password + ' is not a string')
//     if (!password.trim().length) throw new Error('password is empty or blank')
//     if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
//     if (password.length < 6) throw new Error('password has less than 6 characters')

//     if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

//     var xhr = new XMLHttpRequest

//     xhr.onload = function () {
//         var status = xhr.status

//         if (status === 401) {
//             var response = JSON.parse(xhr.responseText)

//             var message = response.error

//             callback(new Error(message))
//         } else if (status === 200) {
//             var response = JSON.parse(xhr.responseText)

//             var token = response.token

//             callback(null, token)
//         }
//     }

//     xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

//     xhr.setRequestHeader('Content-Type', 'application/json')

//     var body = { username: username, password: password }

//     xhr.send(JSON.stringify(body))
// }

// try {
//     authenticateUser('manuelbarzi', '123123123', (error, token) => {
//         if (error) return console.error(error.message)

//         console.log(token)
//     })
// } catch(error) {
//     console.error(error.message)
// }

// function authenticateUser(username, password) {
//     if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
//     if (!username.trim().length) throw new Error('username is empty or blank')
//     if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
//     if (username.length < 4) throw new Error('username has less than 4 characters')

//     if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
//     if (!password.trim().length) throw new Error('password is empty or blank')
//     if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
//     if (password.length < 6) throw new Error('password has less than 6 characters')

//     return new Promise((resolve, reject) => {
//         var xhr = new XMLHttpRequest

//         xhr.onload = function () {
//             var status = xhr.status

//             if (status === 401) {
//                 var response = JSON.parse(xhr.responseText)

//                 var message = response.error

//                 reject(new Error(message))
//             } else if (status === 200) {
//                 var response = JSON.parse(xhr.responseText)

//                 var token = response.token

//                 resolve(token)
//             }
//         }

//         xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

//         xhr.setRequestHeader('Content-Type', 'application/json')

//         var body = { username: username, password: password }

//         xhr.send(JSON.stringify(body))
//     })
// }

// try {
//     authenticateUser('manuelbarzi', '123123123')
//         .then(token => {
//             console.log(token)
//         })
//         .catch(error => {
//             console.error(error.message)
//         })
// } catch (error) {
//     console.error(error.message)
// }

// (async () => {
//     try {
//         const token = await authenticateUser('manuelbarzi', '123')

//         console.log(token)
//     } catch (error) {
//         console.error(error.message)
//     }
// })()

function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
    if (!username.trim().length) throw new Error('username is empty or blank')
    if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
    if (username.length < 4) throw new Error('username has less than 4 characters')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
    if (password.length < 6) throw new Error('password has less than 6 characters')

    if (callback) {
        if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

        var xhr = new XMLHttpRequest

        xhr.onload = function () {
            var status = xhr.status

            if (status === 401) {
                var response = JSON.parse(xhr.responseText)

                var message = response.error

                callback(new Error(message))
            } else if (status === 200) {
                var response = JSON.parse(xhr.responseText)

                var token = response.token

                callback(null, token)
            }
        }

        xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

        xhr.setRequestHeader('Content-Type', 'application/json')

        var body = { username: username, password: password }

        xhr.send(JSON.stringify(body))
    } else {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest

            xhr.onload = function () {
                var status = xhr.status

                if (status === 401) {
                    var response = JSON.parse(xhr.responseText)

                    var message = response.error

                    reject(new Error(message))
                } else if (status === 200) {
                    var response = JSON.parse(xhr.responseText)

                    var token = response.token

                    resolve(token)
                }
            }

            xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

            xhr.setRequestHeader('Content-Type', 'application/json')

            var body = { username: username, password: password }

            xhr.send(JSON.stringify(body))
        })
    }
}

// try {
//     authenticateUser('manuelbarzi', '123123123', (error, token) => {
//         if (error) return console.error(error.message)

//         console.log(token)
//     })
// } catch(error) {
//     console.error(error.message)
// }

// try {
//     authenticateUser('manuelbarzi', '123123123')
//         .then(token => {
//             console.log(token)
//         })
//         .catch(error => {
//             console.error(error.message)
//         })
// } catch (error) {
//     console.error(error.message)
// }

(async () => {
    try {
        const token = await authenticateUser('manuelbarzi', '123123123')

        console.log(token)
    } catch (error) {
        console.error(error.message)
    }
})()

console.log('hola mundo')