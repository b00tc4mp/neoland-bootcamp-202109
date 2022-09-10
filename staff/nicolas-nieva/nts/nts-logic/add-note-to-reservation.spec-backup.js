// require ('dotenv').config()

// const { expect } = require ('chai')
// const addNoteToReservation = require('./add-note-to-reservation')
// const { mongoose, models: { Reservation, Note } } = require('nts-data')
// const { Types: { ObjectId } } = mongoose

// const { env: { MONGO_URL } } = process

// describe.only('addNoteToReservation', () => {
//     before(() => mongoose.connect(MONGO_URL))

//     beforeEach(() => Promise.all([Reservation.deleteMany(), Note.deleteMany()]))
    
//     let reservation, reservationId

//     beforeEach(async () => {
//         reservation = {
//             pax: 'nico',
//             quantity: 2,
//             product: 'hotel',
//             from: new Date (2022,03,13),
//             until: new Date (2022/05/16),
//             status: 'required',
//             agent: 'viajers'
//         }

//         const reservation2 = await User.create({ ...reservation})

//         reservationId = reservation2.id
//     })

//     it('should succeed on correct user and reservation data', async () => {
            
//             const { reservationId } = reservation
//             const text = 'holanda',
//             date = new Date,
//             reservationId = {}
           
//              await addNoteToReservation(text, date, reservationId )
//              expect(res).to.be.undefined

//              return Reservation.findOne({ pax })
//     })

//         const reservation = await Reservation.findOne({ pax })

//         // expect(reservation.pax).to.equal(pax)
//         // expect(reservation.quantity).to.equal(quantity)
//         // expect(reservation.product).to.equal(product)
//         // assert.deepEqual(reservation.from, from)
//         // assert.deepEqual(reservation.until, until)
//         // expect (reservation.status).to.equal(status)
//         // expect (reservation.agent).to.equal(agent)
//         // expect (reservation.notes[0].text).to.equal(notes.text)
//         // assert.deepEqual(reservation.notes[0].date, notes.date)
        
//     })
//     after(async () => {
//         await Promise.all([User.deleteMany(), Reservation.deleteMany()])

//         await mongoose.disconnect()
//     })
// })