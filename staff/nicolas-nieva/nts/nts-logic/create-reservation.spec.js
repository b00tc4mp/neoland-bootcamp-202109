require('dotenv').config()

const { expect, assert } = require('chai')
const createReservation = require('./create-reservation')
const { mongoose, models: { User, Reservation, Note } } = require('./../nts-data')
const { Types: { ObjectId } } = mongoose
// const { NotFoundError, FormatError } = require('./../nts-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('createReservation', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Reservation.deleteMany()]))

    let user, userId

    beforeEach(async () => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123',
            address: 'joan pol 35',
            location: 'Barcelona',
            province: 'Barcelona',
            email: 'asd@asd.com',
            phone: 644830315
        }

        const user2 = await User.create({ ...user, password: bcrypt.hashSync(user.password) })

        userId = user2.id
    })

    it('should succeed on correct user and reservation data', async () => {
        const agency = userId,
            pax = 'nico',
            quantity = 2,
            product = 'hotel',
            from = new Date(2022, 03, 13),
            until = new Date(2022 / 05 / 16),
            status = "required",
            agent = "viajers",
            text = 'sinsin'

        await createReservation(agency, pax, quantity, product, from, until, status, agent, text)

        const reservation = await Reservation.findOne({ pax })

        expect(reservation.pax).to.equal(pax)
        expect(reservation.quantity).to.equal(quantity)
        expect(reservation.product).to.equal(product)
        assert.deepEqual(reservation.from, from)
        assert.deepEqual(reservation.until, until)
        expect(reservation.status).to.equal(status)
        expect(reservation.agent).to.equal(agent)
        expect(reservation.notes[0].text).to.equal(text)

        const date = new Date

        expect(reservation.notes[0].date.getFullYear()).to.equal(date.getFullYear())
        expect(reservation.notes[0].date.getMonth()).to.equal(date.getMonth())
        expect(reservation.notes[0].date.getDate()).to.equal(date.getDate())

        expect(reservation.agency).to.be.instanceOf(ObjectId)
        expect(reservation.agency.toString()).to.equal(userId)
    })

    after(async () => {
        await Promise.all([User.deleteMany(), Reservation.deleteMany(), Note.deleteMany()])

        await mongoose.disconnect()
    })
})