const{expect}=require('chai')
const authenticate=require('./authenticate-user')
const{readFile,writeFile}=require('fs');
const authenticateUser = require('./authenticate-user');

describe('authenticateUser', () => {
    let user
    beforeEach(done=>{
        user={
            id:'1234',
            name='Wendy Pan',
            username:'wendypan',
            password:'123123123'
        }
        const users=[user]

        writeFile('./users.json',JSON.stringify(users),done)
    })
    if('should succeed with correct credentials',done=>{
        const username='wendypan'
        const password='123123123'

            authenticateUser(username,password,(error,id)=>{
                if(error)return done(error)
                expect(id).to.equal(user.id)
                done()
            })
    })
    afterEach(done=>{
        writeFile('./users.json','[]',done)
    })
})
