require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('../nts-data')
const { ConflictError, FormatError } = require('../nts-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('registerUser', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('should succeed with new user', () => {
        const name = 'Wendy Pan'
        const username = 'wendypan'
        const password = '123123123'
        const email = 'aaddsad@asda.com'
        const address = 'ramon tullo 3'
        const phone = 644830315
        const province = 'barcelona'
        const location = 'el masnou'
        const country = 'espana'

        return registerUser(name, username, password, email, address, phone, province, location, country)
            .then(res => {
                expect(res).to.be.undefined

                return User.findOne({ username })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)
                expect(bcrypt.compareSync(password, user.password)).to.be.true
                expect(user.email).to.equal(email)
                expect(user.phone).to.equal(phone)
            })
    })

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'Wendy Pan',
                username: 'wendypan',
                password: '123123123',
                email: 'asd@asd.com',
                address: 'joan pol 35',
                phone: 644830315,
                province: 'Barcelona',
                location: 'Barcelona'
            }

            return User.create({ ...user, password: bcrypt.hashSync(user.password) })
        })

        it('should fail when user already exists', () => {
            const { name, username, password, email, address, phone, province, location, country } = user

            return registerUser(name, username, password, email, address, phone, province, location, country)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.instanceOf(ConflictError)
                    expect(error.message).to.equal(`user with username ${username, email} already exists`)
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

            it('should fail when username length is less that 6 characters', () => {
                expect(() => registerUser('Wendy Pan', 'wp', '123123123', () => { })).to.throw(FormatError, 'username has less than 6 characters')
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

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
})