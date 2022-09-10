require('dotenv').config()

const { expect } = require('chai')
const modifyReservation = require('./modify-reservation')
const { mongoose, models: { User, Reservation, Note } } = require('nts-data')
const user = require('nts-data/models/schemas/user')
const { Types: { ObjectId } } = mongoose

const { env: { MONGO_URL } } = process

describe('modifyReservation', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Reservation.deleteMany()]))

    let user, userId, reservation, reservationId

    beforeEach(() => {
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

        return User.create(user)
            .then(user => {
                userId = user.id

                reservation = {
                    pax: 'Marcos L',
                    quantity: 2,
                    product: 'hotel',
                    from: new Date(2022, 03, 13),
                    until: new Date(2022 / 05 / 16),
                    status: 'required',
                    agent: 'Pedro B',
                    agency: userId
                }

                return Reservation.create(reservation)
                    .then(reservation => reservationId = reservation.id)
            })
    })

    it('should succeed updating date on a pre-existing reservation', async () => {
        let { pax, quantity, product, from, until, status, agent } = reservation

        pax += '-updated'
        quantity += 1
        product += '-updated'
        from = new Date(2022, 04, 13)
        until = new Date(2022, 08, 13)
        status = 'confirmed'
        agent += '-updated'

        const data = { pax, quantity, product, from, until, status, agent }

        const res = await modifyReservation(userId, reservationId, data)

        expect(res).to.be.undefined

        const reservation2 = await Reservation.findById(reservationId)

        expect(reservation2.pax).to.equal(pax)
        expect(reservation2.quantity).to.equal(quantity)
        expect(reservation2.product).to.equal(product)
        expect(reservation2.from).to.deep.equal(from)
        expect(reservation2.until).to.deep.equal(until)
        expect(reservation2.status).to.equal(status)
        expect(reservation2.agent).to.equal(agent)
    })

    after(() =>
        Promise.all([User.deleteMany(), Reservation.deleteMany()])
            .then(() => mongoose.disconnect())
    )

})