const { models: { Reservation }, mongoose: { Types: { ObjectId } } } = require('./../nts-data')
const bcrypt = require('bcryptjs')
const { checkIfUserExist } = require('./helpers/checkers')

function createReservation(userId, pax, quantity, product, from, until, state, agent, note) {
    // validateName(name)
    // validateUsername(username)
    // validatePassword(password)
    // validateMail(email)
    // validatePhone(phone)
    // validateAddress(address)
    // validateProvince(province)
    // validateLocation(location)

    return (async () => {
        await checkIfUserExist(userId)

        const reservation = await Reservation.create({ agency: userId, pax, quantity, product, from, until, state, agent })

        

        if (note) {
            reservation.notes.push({ text: note, date: new Date })
        }

        await reservation.save()
    })()
}

module.exports = createReservation