const { expect } = require('chai')
const unregisterUser = require('./unregister.user')
const { readFile, writeFile } = require('fs')

describe('unregisterUser', () => {
    let user

    beforeEach(done => {
        user = {
            id: '1234',
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        const users = [user]

        writeFile('./users.json', JSON.stringify(users), done)
    })

    it('should succeed with correct password', done => {
        const id = '1234'
        const password = '123123123'

        unregisterUser(id, password, error => {
            if (error) return done(error)

            expect(user).to.not.exist

            done()
        })
    })

    afterEach(done => {
        writeFile('./users.json', '[]', done)
        
    })
})