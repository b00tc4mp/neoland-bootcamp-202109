require('dotenv').config()

const { expect } = require('chai')
const retrieveReservation = require('./retrieve-reservation')
const { mongoose, models: { User, Reservation } } = require('nts-data')

const { env: { MONGO_URL } } = process

describe.only('retrieveReservation', () => {

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
                    pax: 'nico',
                    quantity: 2,
                    product: 'hotel',
                    from: new Date(2022, 03, 13),
                    until: new Date(2022 / 05 / 16),
                    status: 'required',
                    agent: 'viajers',
                    agency: userId
                }

                return Reservation.create(reservation)
                    .then(reservation => reservationId = reservation.id)
            })
    })

    it('should succeed with correct id for an already existing user and reservation', async () => {
        // const { name, username } = user
        const { pax, quantity } = reservation

        const reservation_1 = await retrieveReservation(userId, reservationId)
        expect(reservation_1).to.exist
        expect(reservation_1.pax).to.equal(pax)
        expect(reservation_1.quantity).to.equal(quantity)
    })

    after(() =>
        Promise.all([User.deleteMany(), Reservation.deleteMany()])
            .then(() => mongoose.disconnect())
    )

})