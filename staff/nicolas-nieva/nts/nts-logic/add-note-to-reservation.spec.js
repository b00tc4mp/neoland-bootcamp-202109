require ('dotenv').config()

const { expect, assert } = require ('chai')
const addNoteToReservation = require('./add-note-to-reservation')
const { mongoose, models: { User, Reservation, Note } } = require('nts-data')
const user = require('nts-data/models/schemas/user')
const { Types: { ObjectId } } = mongoose

const { env: { MONGO_URL } } = process

describe('addNoteToReservation', () => {
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

    it('should succeed on correct user and reservation data', () => {

        const text = 'test text'


        return addNoteToReservation(userId, reservationId, text)
            .then(res => {
                expect(res).to.be.undefined
                
                return Reservation.findById(reservationId)
            })
            .then(reservation => {
                expect(reservation.notes).to.have.lengthOf(1)

                const [note] = reservation.notes

                expect(note.text).to.equal(text)
                expect(note.date).to.exist
                expect(note.date).to.be.instanceOf(Date)

                const date = new Date

                expect(note.date.getFullYear()).to.equal(date.getFullYear())
                expect(note.date.getMonth()).to.equal(date.getMonth())
                expect(note.date.getDate()).to.equal(date.getDate())
            })
    })

    after(() =>
        Promise.all([User.deleteMany(), Reservation.deleteMany()])
            .then(() => mongoose.disconnect())
    )
})