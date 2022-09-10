require('dotenv').config()

const { expect } = require('chai')
const deleteReservation = require('./delete-reservation')
const { mongoose, models: { Reservation, User } } = require('../nts-data')
const { CredentialsError, FormatError, NotFoundError } = require('../nts-errors')
const { Types: { ObjectId } } = mongoose
const { env: { MONGO_URL } } = process

describe('deleteReservation', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Reservation.deleteMany()]))

    let reservation, reservationId

    beforeEach(() => {
        user = {
            name: 'Pepi Pan',
            username: 'PepiPan',
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
                    from: new Date (2022,03,13),
                    until: new Date (2022/05/16),
                    status: 'required',
                    agent: 'viajers',
                    agency: userId
                }
        
                return Reservation.create(reservation)
                    .then(reservation => reservationId = reservation.id)
            })
    })


    it('Should succeed when reservation is deleted from data base', () => {
        return deleteReservation(userId, reservationId)
            .then(response => {
                expect(response).to.be.undefined

                return Reservation.findById(reservationId)
            })
            .then(reservation => {
                expect(reservation).to.be.null
            })
    })

    after(() =>
        Promise.all([User.deleteMany(), Reservation.deleteMany()])
            .then(() => mongoose.disconnect())
    )
})
