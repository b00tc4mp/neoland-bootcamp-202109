require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('./unregister-user')
const { mongoose, models: { User } } = require('../nts-data')
const { CredentialsError, FormatError, NotFoundError } = require('../nts-errors')
const { Types: { ObjectId } } = mongoose
const { env: { MONGO_URL } } = process

describe.only('unregisterUser', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(() => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123',
            address: 'joan pol 35',
            location: 'Barcelona',
            province: 'Barcelona',
            email: 'asd@asd.com',
            phone: 644830315
        }

        return User.create(user)
            .then(user => userId = user.id)
    })
    describe('When user already exists', () => {



        it('Should succeed when user is deleted from data base', () => {
            const { password } = user
            return unregisterUser(userId, password)
                .then(response => {
                    expect(response).to.equal('User deleted successfully')
                })
                .catch(() => {
                    throw new CredentialsError('Wrong password')

                })

        })
    })

    it('Should fail with wrong password', () => {

        return unregisterUser(userId, '12345678')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('Wrong password')

            })
    })

    it('Should fail when user id does not correspond to any user', () => {
        const userId = ObjectId().toString()

        const { password } = user

        return unregisterUser(userId, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} not found`)
                expect(error).to.be.instanceOf(NotFoundError)
            })
    })

    describe('When parameters are note valid', () => {
        describe('When id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => unregisterUser(true, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(123, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser({}, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(() => { }, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser([], {}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => unregisterUser('', {}, () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => unregisterUser('   ', {}, () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => unregisterUser(' abcd1234abcd1234abcd1234 ', {}, () => { })).to.throw(FormatError, 'id has blank spaces')

                expect(() => unregisterUser('abcd 1234abc d1234abc d1234', {}, () => { })).to.throw(FormatError, 'id has blank spaces')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => unregisterUser('abc', {}, () => { })).to.throw(FormatError, 'id doesn\'t have 24 characters')
            })
        })

        describe('When password is not valid', () => {
            it('Should fail when password is not a string', () => {
                expect(() => unregisterUser(userId, true, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, 123, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, {}, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, () => { }, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, [], () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('Should fail when password is empty', () => {
                expect(() => unregisterUser(userId, '', () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => unregisterUser(userId, '   ', () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('Should fail when password has spaces around', () => {
                expect(() => unregisterUser(userId, ' 123123123 ', () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => unregisterUser(userId, '1231 23123', () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('Should fail when password length is less than 8 characters', () => {
                expect(() => unregisterUser(userId, '1231', () => { })).to.throw(FormatError, 'password has less than 8 characters')
            })
        })

    })


    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
})