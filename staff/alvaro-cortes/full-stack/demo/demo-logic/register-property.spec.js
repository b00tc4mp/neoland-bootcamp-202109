require('dotenv').config()

const { expect } = require('chai')
const registerProperty = require('./register-property')
const { mongoose, models: { User, Property } } = require('demo-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('demo-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('registerProperty', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Property.deleteMany()]))

    let user, userId

    beforeEach(async () => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        const user2 = await User.create({ ...user, password: bcrypt.hashSync(user.password) })

        userId = user2.id
    })
    debugger
    it('should succeed on correct property and owner data', async () => {
        const cadastre = '123ABC', address = 'Poblenou (Barcelona)', squareMeters = 60, price = 1500000, currency = 'euro'

        await registerProperty(cadastre, address, squareMeters, price, currency, [userId])

        const property = await Property.findOne({ cadastre })

        expect(property.address).to.equal(address)
        expect(property.squareMeters).to.equal(squareMeters)
        expect(property.price).to.equal(price)
        expect(property.currency).to.equal(currency)
        expect(property.owners).to.have.lengthOf(1)
        expect(property.owners.map(id => id.toString())).to.include(userId)
    })

    it('should fail on correct property and missing owner data', async () => {
        const cadastre = '123ABC', address = 'Poblenou (Barcelona)', squareMeters = 60, price = 1500000, currency = 'euro'

        try {
            await registerProperty(cadastre, address, squareMeters, price, currency, [userId, ObjectId().toString()])

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('one or more of the owners do not exist')
        }
    })

    it('should fail on non-string cadastre', () => {
        const address = 'Poblenou (Barcelona)', squareMeters = 60, price = 1500000, currency = 'euro'

        let cadastre = true

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(TypeError, `${cadastre} is not a string`)

        cadastre = 123

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(TypeError, `${cadastre} is not a string`)

        cadastre = {}

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(TypeError, `${cadastre} is not a string`)
    })

    it('should fail on empty or blank string cadastre', () => {
        const address = 'Poblenou (Barcelona)', squareMeters = 60, price = 1500000, currency = 'euro'

        let cadastre = ''

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(FormatError, 'string is empty or blank')

        cadastre = '   '

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(FormatError, 'string is empty or blank')

        cadastre = '\t\n'

        expect(() => registerProperty(cadastre, address, squareMeters, price, currency, [userId])).to.throw(FormatError, 'string is empty or blank')
    })

    after(async () => {
        await Promise.all([User.deleteMany(), Property.deleteMany()])
        
        await mongoose.disconnect()
    })
})