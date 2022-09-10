const { searchReservations } = require('./../../nts-logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
debugger
    const { headers: { authorization }, query: { q } } = req
    try {
       
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

       const reservation = await searchReservations(id, q)

           res.json(reservation)
          
        } catch (error) {
        handleError(error, res)
    }
}