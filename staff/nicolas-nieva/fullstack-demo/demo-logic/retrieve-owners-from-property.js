const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('demo-errors')
const { models: { User, Property }, mongoose: { Types: { ObjectId } } } = require('demo-data')

function retrieveOwnersFromProperty(propertyId) {
    validateId(propertyId)

    return Property.findById(propertyId).populate('owners').lean()
        .then(({owners}) => {
            owners.forEach(owner => {
                owner.id = owner._id.toString()
                delete owner._id

                delete owner.password

                delete owner.creditCards

                delete owner.__v
            })

            return owners
        })
}

module.exports = retrieveOwnersFromProperty