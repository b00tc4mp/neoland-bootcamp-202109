const { registerUser } = require('./../../nts-logic')
const { handleError } = require('./helpers')

module.exports = async (req, res) => {
    const { body: { name, username, password, email, address, phone, province, location, country } } = req

    try {
        await registerUser(name, username,password, email, address, phone, province, location, country)
        res.status(201).send()
    } catch (error) {
        handleError(error, res)
    }
}