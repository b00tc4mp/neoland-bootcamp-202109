require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('demo-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('demo-errors')

const { env: { MONGO_URL } } = process

describe('retrieveUser', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(() => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        return User.create(user)
            .then(user => userId = user.id)
    })

    it('Should succed with correct id', () => {
        const { name, username } = user

        return retrieveUser(userId)
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)
            })
    })

    it('Should fail when incorrect id', () => {

        userId = ObjectId().toString()

        return retrieveUser(userId)
            .then(() => { throw new Error('Should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Wrong ID')
            })
    })

    describe('When parameters are not valid', () => {
        describe('When id is not valid', () => {
            it('Should fail when id is not a string', () => {
                expect(() => retrieveUser(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser([], () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveUser({}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveUser('', '123123123', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveUser('   ', '123123123', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveUser(' 111111111111111111111111 ', () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveUser('1111111111111', () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })

    after(() => 
        User.deleteMany()
            .then(() => mongoose.disconnet))
})