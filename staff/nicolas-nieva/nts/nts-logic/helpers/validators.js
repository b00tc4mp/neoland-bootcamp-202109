const { FormatError, ConflictError } = require('../../nts-errors')

function validateId(id) {
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new FormatError('id is empty or blank')
    if (/\r?\n|\r|\t| /g.test(id)) throw new FormatError('id has blank spaces')
    if (id.length !== 24) throw new FormatError('id doesn\'t have 24 characters')
}

function validateUsername(username) {
    if (typeof username !== 'string') throw new TypeError('username is not a string')
    if (!username.trim().length) throw new FormatError('username is empty or blank')
    if (/\r?\n|\r|\t| /g.test(username)) throw new FormatError('username has blank spaces')
    if (username.length < 6) throw new FormatError('username has less than 6 characters')
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new FormatError('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new FormatError('password has blank spaces')
    if (password.length < 8) throw new FormatError('password has less than 8 characters')
}

function validateOldPassword(oldPassword) {
    if (typeof oldPassword !== 'string') throw new TypeError('old password is not a string')
    if (!oldPassword.trim().length) throw new FormatError('old password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(oldPassword)) throw new FormatError('old password has blank spaces')
    if (oldPassword.length < 8) throw new FormatError('old password has less than 8 characters')
}

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!name.trim().length) throw new FormatError('name is empty or blank')
    if (name.trim() !== name) throw new FormatError('blank spaces around name')
}

function validateMail (email) {
    if (email.trim() !== email) throw new Error('email spaces around name')
    // if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email)) throw new FormatError('email is not correct')
}

function validateText(text) {
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.trim().length) throw new FormatError('text is empty or blank')
}

function validateNumber(number) {
    if (typeof number !== 'number') throw new TypeError(`${number} is not a number`)
}

function validateAddress(address) {
    if (typeof address !== 'string') throw new TypeError('address is not a string')
    if (!address.trim().length) throw new FormatError('address is empty or blank')
    if (address.trim() !== address) throw new FormatError('blank spaces around address')
}

function validateProvince(province) {
    if (typeof province !== 'string') throw new TypeError('province is not a string')
    if (!province.trim().length) throw new FormatError('province is empty or blank')
    if (province.trim() !== province) throw new FormatError('blank spaces around province')
}

function validateLocation(location) {
    if (typeof location !== 'string') throw new TypeError('location is not a string')
    if (!location.trim().length) throw new FormatError('location is empty or blank')
    if (location.trim() !== location) throw new FormatError('blank spaces around location')
}

function validateData(data) {
    if (typeof data !== 'object' || data.constructor.name !== 'Object') throw new TypeError('data is not an object')

    const { name, username, password, oldPassword } = data

    if (typeof name !== 'undefined') {
        validateName(name)
    }

    if (typeof username !== 'undefined') {
        validateUsername(username)
    }

    if (typeof oldPassword === 'undefined' && typeof password !== 'undefined') throw new ConflictError('old password is not defined')
    if (typeof password === 'undefined' && typeof oldPassword !== 'undefined') throw new ConflictError('password is not defined')

    if (typeof password !== 'undefined') {
        validatePassword(password)
    }

    if (typeof oldPassword !== 'undefined') {
        validateOldPassword(oldPassword)
    }
}

module.exports = {
    validateId,
    validateUsername,
    validatePassword,
    validateOldPassword,
    validateData,
    validateName,
    validateMail,
    validateNumber,
    validateAddress,
    validateProvince,
    validateLocation,
    validateText
}