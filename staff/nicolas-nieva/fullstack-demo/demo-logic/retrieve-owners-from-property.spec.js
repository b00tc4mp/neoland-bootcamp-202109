require('dotenv').config()

const { expect } = require('chai')
const retrieveOwnersFromProperty = require('./retrieve-owners-from-property')
const { mongoose, models: { User, Property } } = require('demo-data')
//const { Types: { ObjectId } } = mongoose
//const { NotFoundError, FormatError } = require('demo-errors')

const { env: { MONGO_URL } } = process

describe('retrieveOwnersFromProperty', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Property.deleteMany()]))

    let user1, user2, user3, property

    beforeEach(() => {
        user1 = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        user2 = {
            name: 'Ti Gre',
            username: 'tigre',
            password: '123123123'
        }

        user3 = {
            name: 'Le Chuza',
            username: 'lechuza',
            password: '123123123'
        }

        return Promise.all([User.create(user1), User.create(user2), User.create(user3)])
            .then(([_user1, _user2, _user3]) => {
                user1.id = _user1.id
                user2.id = _user2.id
                user3.id = _user3.id

                delete user1.password
                delete user2.password
                delete user3.password

                property = {
                    cadastre: '123QWE',
                    address: 'Manhattan (NYC)',
                    squareMeters: 200,
                    price: 1000000,
                    currency: 'dollar',
                    owners: [user1.id, user2.id, user3.id]
                }

                return Property.create(property)
            })
            .then(_property => property.id = _property.id)
    })

    it('should succeed on existing users (owners) and property', () =>
        retrieveOwnersFromProperty(property.id)
            .then(owners => expect(owners).to.have.deep.members([user1, user2, user3]))
    )

    // TODO test unhappies

    after(() =>
        Promise.all([User.deleteMany(), Property.deleteMany()])
            .then(() => mongoose.disconnect())
    )
})