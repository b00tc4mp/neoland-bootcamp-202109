const { validateString, validateNumber, validateId } = require('./helpers/validators')
const { NotFoundError } = require('demo-errors')
const { models: { User, Property }, mongoose: { Types: { ObjectId } } } = require('demo-data')

function registerProperty(cadastre, address, squareMeters, price, currency, owners) {
    validateString(cadastre)
    validateString(address)
    validateNumber(squareMeters)
    validateNumber(price)
    validateString(currency)
    owners.forEach(validateId)

    return User.find({ _id: { $in: owners.map(id => ObjectId(id)) } })
        .then(users => {
            if (users.length !== owners.length) throw new NotFoundError('one or more of the owners do not exist')

            return Property.create({ cadastre, address, squareMeters, price, currency, owners })
        })
        .then(() => {})
}

module.exports = registerProperty