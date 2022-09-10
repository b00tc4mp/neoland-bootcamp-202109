require('dotenv').config()

const searchReservations = require('./search-reservations')
const { mongoose, models: { User, Reservation } } = require('nts-data')

const { env: { MONGO_URL } } = process

    ; (async () => {
        await mongoose.connect(MONGO_URL)

        await User.deleteMany()
        await Reservation.deleteMany()

        let userId

        const user = {
            name: 'nico agencia',
            username: 'wendypan',
            password: '123123123',
            address: 'joan pol 35',
            location: 'Barcelona',
            province: 'Barcelona',
            email: 'asd@asd.com',
            phone: 644830315
        }

        const user2 = await User.create(user)
        userId = user2.id
        console.log(userId)

        const reservation = {
            pax: 'nicolas nieva',
            quantity: 2,
            product: 'exc',
            from: new Date(2022, 03, 13),
            until: new Date(2022 / 05 / 16),
            status: 'required',
            agent: 'viajers',
            agency: userId,
            notes: { text: 'pepini' }
        }

        // await Reservation.create(reservation)
        

        const reservation2 = {
            pax: 'pedro del piero',
            quantity: 3,
            product: 'hotel',
            from: new Date(2022, 03, 13),
            until: new Date(2022 / 05 / 16),
            status: 'required',
            agent: 'viajers',
            agency: userId,
            notes: { text: 'cucu' }
        }

        await Reservation.create(reservation, reservation2)

        const reservation_3 = {
            pax: 'nicolas nieva',
            quantity: 4,
            product: 'transfer',
            from: new Date(2022, 03, 18),
            until: new Date(2022 / 05 / 19),
            status: 'required',
            agent: 'viajers',
            agency: userId,
            notes: { text: 'adios' }
        }

        await Reservation.create(reservation_3)

       const query = 'NICO' 

       const foundReservations =  await searchReservations (userId, query)

        console.log(foundReservations)
       
        // TODO call searchReservations

        await mongoose.disconnect()
        
    })() // IIFE