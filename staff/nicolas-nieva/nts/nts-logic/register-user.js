const { validateName,
    validateUsername, 
    validatePassword,
    validateMail, 
    validateAddress, 
    validatePhone, 
    validateProvince, 
    validateLocation } = require('./helpers/validators')
const { ConflictError } = require('../nts-errors')
const { models: { User } } = require('../nts-data')
const bcrypt = require('bcryptjs')

function registerUser(name, username, password, email, address, phone, province, location, country) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)
    // validateMail(email)
    // validatePhone(phone)
    // validateAddress(address)
    // validateProvince(province)
    // validateLocation(location)

    return (async () => {
        try {
            await User.create({ name, username, password: bcrypt.hashSync(password), email, address , phone, province, location, country})
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictError(`user with username ${username, email} already exists`)

            throw error
        }
    })()
}

module.exports = registerUser