require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const { mongoose, models: { User } } = require('demo-data')
const { CredentialsError, FormatError } = require('demo-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe.only('authenticateUser', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(() => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        return User.create({ ...user, password: bcrypt.hashSync(user.password) })
            .then(user => userId = user.id)
    })

    it('should succeed with correct credentials for an already existing user', () => {
        const { username, password } = user

        return authenticateUser(username, password)
            .then(id => {
                expect(id).to.exist
                expect(id).to.equal(userId)
            })
    })

    it('should fail with incorrect password', () => {
        const { username, password } = user

        return authenticateUser(username, password + '-wrong')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong credentials')
            })
    })

    it('should fail with incorrect username', () => {
        const { username, password } = user

        return authenticateUser(username + '-wrong', password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong credentials')
            })
    })

    it('should fail with incorrect username and password', () => {
        const { username, password } = user

        return authenticateUser(username + '-wrong', password + '-wrong')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong credentials')
            })
    })

    describe('when parameters are not valid', () => {
        describe('when username is not valid', () => {
            it('should fail when username is not a string', () => {
                expect(() => authenticateUser(true, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => authenticateUser(123, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => authenticateUser({}, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => authenticateUser(() => { }, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => authenticateUser([], '123123123', () => { })).to.throw(TypeError, 'username is not a string')
            })

            it('should fail when username is empty', () => {
                expect(() => authenticateUser('', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')

                expect(() => authenticateUser('   ', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')
            })

            it('should fail when username has spaces', () => {
                expect(() => authenticateUser(' wendypan ', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')

                expect(() => authenticateUser('wendy pan', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')
            })

            it('should fail when username length is less that 4 characters', () => {
                expect(() => authenticateUser('wp', '123123123', () => { })).to.throw(FormatError, 'username has less than 4 characters')
            })
        })

        describe('when password is not valid', () => {
            it('should fail when password is not a string', () => {
                expect(() => authenticateUser('wendypan', true, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => authenticateUser('wendypan', 123, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => authenticateUser('wendypan', {}, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => authenticateUser('wendypan', () => { }, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => authenticateUser('wendypan', [], () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('should fail when password is empty', () => {
                expect(() => authenticateUser('wendypan', '', () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => authenticateUser('wendypan', '   ', () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('should fail when password has spaces', () => {
                expect(() => authenticateUser('wendypan', ' 123123123 ', () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => authenticateUser('wendypan', '123 123 123', () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('should fail when password length is less that 8 characters', () => {
                expect(() => authenticateUser('wendypan', '123123', () => { })).to.throw(FormatError, 'password has less than 8 characters')
            })
        })
    })

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
})