const { readFile } = require("fs");
const { ObjectId } = require('mongodb')

function findUsers(query, callback) {
    // TODO implement me
        const users = context.db.collection('users')

        const usersMatch = users.filter(({ id, name, username }) => id.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()) || username.toLowerCase().includes(query.toLowerCase()))

        if (!usersMatch) return callback(new Error(`No user found with ${query} input`))

        const publicData = usersMatch.map(element => {
            return {
                name: element.name,
                username: element.username
            }
        })

        callback(null, publicData)
}
module.exports = findUsers