const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { MongoClient, ObjectId } = require('mongodb')
const context = require('./context')
const { NotFoundError, FormatError } = require('errors')

describe('retrieveUser', () => {
    let client, db, users 

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect(error => {
            if (error) return done(error)

            db = client.db('demo')

            context.db = db

            users = db.collection('users')

            users.createIndex({ username: 1 }, { unique: true })

            done()
        })
    })

    beforeEach(done => users.deleteMany({}, done))

    let user, userId 

    beforeEach(done => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        users.insertOne(user, (error, result) => {
            if (error) return done(error)

            userId = result.insertedId.toString() // estudiar esta línea

            done()
        })
    })

    it('should suceed with correct id for an already existing user', done => { 
        const { name, username } = user 

        retrieveUser(userId, (error, user) => {
            if (error) return done(error)

            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.username).to.equal(username)

            done()
        })
    })

    it('should fail with incorrect id', done => {
        const { name, username } = user
        
        userId = ObjectId().toString()

        retrieveUser(userId, (error, user) => {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)

            expect(user).to.be.undefined

            done()
        })
    })

    describe('when parameters are not valid', () => {
        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => retrieveUser(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser({}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser([], () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => retrieveUser('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveUser('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => retrieveUser(' abcd1234abcd1234abcd1234 ', () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => retrieveUser('abcd 1234abc d1234abc d1234', () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => retrieveUser('abc', () => { })).to.throw(FormatError, 'id does not have 24 characters')
            })
        })

        describe('when callback is not valid', () => {
            it('should fail when callback is not a function', () => {
                expect(() => retrieveUser('abcd1234abcd1234abcd1234', true)).to.throw(TypeError, 'callback is not a function')

                expect(() => retrieveUser('abcd1234abcd1234abcd1234', 123)).to.throw(TypeError, 'callback is not a function')

                expect(() => retrieveUser('abcd1234abcd1234abcd1234', {})).to.throw(TypeError, 'callback is not a function')

                expect(() => retrieveUser('abcd1234abcd1234abcd1234', '...')).to.throw(TypeError, 'callback is not a function')

                expect(() => retrieveUser('abcd1234abcd1234abcd1234', [])).to.throw(TypeError, 'callback is not a function')
            })
        })
    })

    after(done => users.deleteMany({}, error => {
        if (error) return done(error)

        client.close(done)
    }))
})