require('dotenv').config()

const { expect } = require('chai')
const modifyUser = require('./modify-user')
const { mongoose, models: { User } } = require('data')
const { Types: { ObjectId } } = mongoose
const { CredentialsError, FormatError, ConflictError, NotFoundError } = require('errors')

const { env: { MONGO_URL } } = process

describe('modifyUser', () => {
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

    it('should suceed with existing id and correct password', () => {
        let { name, username, password } = user 

        name += '-updated'
        username += '-updated'
        const newPassword = password + '-updated'

        const data = { name, username, password, newPassword }

        return modifyUser(userId, data)
            .then(res => {
                expect(res).to.be.undefined // estudiar esta línea
    
                return User.findById(userId)   
            })
            .then(res => {
                expect(res.name).to.equal(name)
                expect(res.username).to.equal(username)
                expect(res.password).to.equal(newPassword)
            })
    })

    it('should fail with non-existing id', () => {
        const { username, password } = user

        const userId = ObjectId().toString()

        return modifyUser(userId, { username, password })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${userId} not found`)

            })
    })

    it('should fail with incorrect password', () => {
        let { username, password } = user

        password += '-wrong'

        const data = { username, password }

        return modifyUser(userId, data)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')

            })
    })

    it('should fail when trying to update the username to another that already exists', () => {
        const user2 = {
            name: 'Peter Pan',
            username: 'peterpan',
            password: '123123123'
        }

        const username = 'peterpan'
        
        const { password } = user

        return User.create(user2)
            .then(() => {
                return modifyUser(userId, { username, password })
            })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(ConflictError)
                expect(error.message).to.equal(`user with username ${username} already exists`)

            })
    })
    

    describe('when parameters are not valid', () => {
        describe('when id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => modifyUser(true, { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser(123, { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser({}, { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser(() => { }, { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => modifyUser([], { }, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => modifyUser('', { }, () => { })).to.throw(Error, 'id is empty or blank')

                expect(() => modifyUser('   ', { }, () => { })).to.throw(Error, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => modifyUser(' abcd1234abcd1234abcd1234 ', { }, () => { })).to.throw(Error, 'id has blank spaces')

                expect(() => modifyUser('abcd 1234abc d1234abc d1234', { }, () => { })).to.throw(Error, 'id has blank spaces')
            })
        })

        describe('when data is not valid', () => {
            it('should fail when data is not an object', () => {
                expect(() => modifyUser('abcd1234abcd1234abcd1234', true, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', 123, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', '', () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', () => { }, () => { })).to.throw(TypeError, 'data is not an object')

                expect(() => modifyUser('abcd1234abcd1234abcd1234', [], () => { })).to.throw(TypeError, 'data is not an object')
            })
        })
    })

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
})