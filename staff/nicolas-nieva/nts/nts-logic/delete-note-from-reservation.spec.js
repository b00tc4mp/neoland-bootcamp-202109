require('dotenv').config()

const { expect, assert } = require('chai')
const deleteNoteFromReservation = require('./delete-note-from-reservation')
const { mongoose, models: { User, Reservation, Note } } = require('nts-data')
const user = require('nts-data/models/schemas/user')
const { Types: { ObjectId } } = mongoose

const { env: { MONGO_URL } } = process

describe('deleteNoteFromReservation', () => {
    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Reservation.deleteMany()]))

    let user, userId, reservation, reservationId, noteId

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
                    agency: userId,
                    notes: {text: 'pepini' }
                }

                return Reservation.create(reservation)
                    .then(reservation => {
                        reservationId = reservation.id
                        noteId = reservation.notes[0].id
                    })
            })
    })

    it('should succeed when note is deleted from data base', () => {
        return deleteNoteFromReservation(userId, reservationId, noteId)
            .then(res => {
                expect(res).to.be.undefined

                return Reservation.findById(reservationId)
            })
            .then(reservation => {
                expect(reservation.notes).to.have.lengthOf(0)
            })
    })

    after(() =>
        Promise.all([User.deleteMany(), Reservation.deleteMany()])
            .then(() => mongoose.disconnect())
    )
})