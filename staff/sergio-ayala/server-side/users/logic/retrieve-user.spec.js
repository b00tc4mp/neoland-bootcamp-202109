const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { MongoClient, ObjectId } = require('mongodb')
const context = require('./context');

describe('Retrieve User', () => {
    let users, db, client

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect(error => {
            if (error) done(error)
            else {

                db = client.db('demo')
                context.db = db

                users = db.collection('users')

                users.createIndex({ username: 1 }, { unique: true })

                done()
            }
        })
    })

    beforeEach(done => {
        users.deleteMany({}, done)
    })

    let user, userId

    beforeEach(done => {
        user = {
            name: 'Juana la Loca',
            username: 'crazyJ',
            password: '123123123'
        }
        users.insertOne(user, (error, result) => {
            if (error) done(error)
            else {
                userId = result.insertedId.toString()

                done()
            }
        })
    })

    it('should suceed with correct id of an existing user', (done) => {
        const { name, username } = user

        retrieveUser(userId, (error, user) => {
            if (error) done(error)
            else {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)

                done()
            }
        })
    });

    it('should fail with incorrect id', (done) => {
        userId = ObjectId().toString()

        retrieveUser(userId, (error) => {

            expect(error).to.exist
            expect(error.message).to.equal(`No user with the id: ${userId}`)

            done()

        })
    });

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
                expect(() => retrieveUser('', () => { })).to.throw(Error, 'id is empty or blank')

                expect(() => retrieveUser('   ', () => { })).to.throw(Error, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => retrieveUser(' abcd1234abcd1234abcd1234 ', () => { })).to.throw(Error, 'id has blank spaces')

                expect(() => retrieveUser('abcd 1234abc d1234abc d1234', () => { })).to.throw(Error, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => retrieveUser('abc', () => { })).to.throw(Error, 'id doesn\'t have 24 characters')
            })
        })

        describe('when callback is not valid', () => {
            it('should fail when callback is not a string', () => {
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
});
