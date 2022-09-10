


// const { addCreditCardToUser } = require('demo-logic')
// const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

// module.exports = (req, res) => {
//     const { headers: { authorization }, body: { name, number, expirationDate, cvv } } = req

//     try {
//         const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

//         addCreditCardToUser(id, name, number, new Date(expirationDate), cvv)
//             .then(() => res.status(201).send())
//             .catch(error => handleError(error, res))
//     } catch (error) {
//         handleError(error, res)
//     }
// }

const { validateId, validateName, validateCreditCardNumber, validateDate, validateCreditCardCVV } = require('./helpers/validators')
const { NotFoundError, CredentialsError } = require('demo-errors')
const { models: { User, CreditCard } } = require('demo-data')

function addCreditCardToUser(userId, name, number, expirationDate, cvv) {
    validateId(userId)
    validateName(name)
    validateCreditCardNumber(number)
    validateDate(expirationDate)
    validateCreditCardCVV(cvv)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const creditCard = new CreditCard({ name, number, expirationDate, cvv })

            user.creditCards.push(creditCard)

            return user.save()
        })
        .then(() => {})
}

module.exports = addCreditCardToUser


require('dotenv').config()

const { expect } = require('chai')
const addCreditCardToUser = require('./add-credit-card-to-user')
const { mongoose, models: { User } } = require('demo-data')
// const { CredentialsError, FormatError } = require('demo-errors')
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

    it('should succeed on existing user and correct credit card details', () => {
        const { name, username } = user
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

    // TODO all unhappies possible

    after(() =>
        User.deleteMany()
            .then(() => mongoose.disconnect())
    )
})