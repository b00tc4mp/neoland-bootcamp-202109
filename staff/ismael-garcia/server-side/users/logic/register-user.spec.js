require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
// const { MongoClient } = require('mongodb')
// const context = require('./context')
const { mongoose, models: { User } } = require('data')
const { ConflictError, FormatError } = require('errors')

const { env: { MONGO_URL } } = process

describe('registerUser', () => {
    // let client, db, users

    // before(done => {
    //     client = new MongoClient('mongodb://localhost:27017')

    //     client.connect(error => {
    //         if (error) return done(error)

    //         db = client.db('demo')

    //         context.db = db 

    //         users = db.collection('users')
            
    //         users.createIndex({ username: 1 }, { unique: true })

    //         done()

    //     })
    // })

    // beforeEach(done => {
    //     users.deleteMany({}, done)

    // })

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('should suceed with new user', () => {
        const name = 'Wendy Pan'
        const username = 'wendypan'
        const password = '123123123'

        // return registerUser(name, username, password, error => {
        //     if (error) return done(error)

        //     users.findOne({ username }, (error, user) => {
        //         if (error) return done(error)
                
        //         expect(user).to.exist
        //         expect(user.name).to.equal(name)
        //         expect(user.username).to.equal(username)
        //         expect(user.password).to.equal(password)
    
        //         done()

        //     })
        // })
        return registerUser(name, username, password)
            .then(() => User.findOne({ username }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })
    })

    describe('when user already exists', () => {
        let user 

        // beforeEach(done => {
        //     user = {
        //         name: 'Wendy Pan',
        //         username: 'wendypan',
        //         password: '123123123'
        //     }

        //     users.insertOne(user, done)
        // })

        beforeEach(() => {
            user = {
                name: 'Wendy Pan',
                username: 'wendypan',
                password: '123123123'
            }

            return User.create(user) //repasar esta línea
        })

        it('should fail when user already exists', () => {
            const { name, username, password } = user

            // registerUser(name, username, password, error => {
            //     expect(error).to.exist
            //     expect(error).to.be.instanceOf(ConflictError) 
            //     expect(error.message).to.equal(`user with username ${username} already exists`)

            //     done()
            // })
            return registerUser(name, username, password)
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ConflictError) 
                    expect(error.message).to.equal(`user with username ${username} already exists`)
                })
        })
    })

    describe('when parameters are not valid', () => {
        describe('when name is not valid', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser(true, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser(123, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser({}, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser(() => { }, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser([], 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')
            })

            it('should fail when name is empty', () => {
                expect(() => registerUser('', 'wendypan', '123123123', () => { })).to.throw(FormatError, 'name is empty or blank')

                expect(() => registerUser('   ', 'wendypan', '123123123', () => { })).to.throw(FormatError, 'name is empty or blank')
            })

            it('should fail when name has spaces around', () => {
                expect(() => registerUser(' Wendy Pan ', 'wendypan', '123123123', () => { })).to.throw(FormatError, 'blank spaces around name')
            })
        })

        describe('when username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => registerUser('Wendy Pan', true, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', 123, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', {}, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', () => { }, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', [], '123123123', () => { })).to.throw(TypeError, 'username is not a string')
            })

            it('should fail when username is empty', () => {
                expect(() => registerUser('Wendy Pan', '', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')

                expect(() => registerUser('Wendy Pan', '   ', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')
            })

            it('should fail when username has spaces', () => {
                expect(() => registerUser('Wendy Pan', ' wendypan ', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')

                expect(() => registerUser('Wendy Pan', 'wendy pan', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')
            })

            it('should fail when username length is less that 4 characters', () => {
                expect(() => registerUser('Wendy Pan', 'wp', '123123123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
            })
        })

        describe('when password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', true, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 123, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', {}, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', () => { }, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', [], () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('should fail when password is empty', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', '', () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => registerUser('Wendy Pan', 'wendypan', '   ', () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('should fail when password has spaces', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', ' 123123123 ', () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => registerUser('Wendy Pan', 'wendypan', '123 123 123', () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('should fail when password length is less that 8 characters', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', '123123', () => { })).to.throw(FormatError, 'password has less than 8 characters')
            })
        })
    })

    // after(done => users.deleteMany({}, error => {
    //     if (error) return done(error)
    //     // client.close(error => {
    //     //     if (error) return done(error)

    //     //     done()
    //     // })
    //     client.close(done)
    // }))
    
    after(() => 
        User.deleteMany()
           .then(() => mongoose.disconnect()) 
    )
})