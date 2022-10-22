require('dotenv').config()

const { expect } = require('chai')
const addCreditCardToUser = require('./add-credit-card-to-user.js')
const { mongoose, models: { User } } = require('demo-data')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('addCreditCardToUser', () => {
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

    it('Should succed on existing user and correct credit card details', () => {
        const { name, username} = user
        const number = '0123012301230123', expirationDate = new Date(2022, 0, 1), cvv = '056'
    
        return addCreditCardToUser(userId, name, number, expirationDate, cvv)
            .then(res => {
                expect(res).to.be.undefined

                return User.findOne({ username })
            })
            .then(user => {
                expect(user.creditCards).to.have.lengthOf(1)

                const [creditCard] = user.creditCards

                expect(creditCard.name).to.equal(name)
                expect(creditCard.number).to.equal(number)
                expect(creditCard.expirationDate).to.deep.equal(expirationDate)
                expect(creditCard.cvv).to.equal(cvv)
            })
    })

    after(() => 
        User.deleteMany()
            .then(() => mongoose.disconnect()))
})