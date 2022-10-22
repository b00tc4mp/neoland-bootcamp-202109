const { validateId, validateName, validateCreditCardNumber, validateDate, validateCreditCardCVV } = require('./helpers/validators')
const { NotFoundError } = require('demo-errors')
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