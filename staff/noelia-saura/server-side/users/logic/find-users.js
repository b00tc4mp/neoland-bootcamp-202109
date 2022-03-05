const {readFile}=require('fs')
function findUsers(query, callback) {
       readFile('./users.json', 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)
        
        query = query.toLowerCase()

        const results = users.filter(({ name,username}) => name.toLowerCase().includes(query) || username.toLowerCase().includes(query) )
        
        if(results.length<0){
            callback(new Error(`user doesn't find`))
            
        } else{
            callback(null,results)
        }
        
    })
}
module.exports = findUsers