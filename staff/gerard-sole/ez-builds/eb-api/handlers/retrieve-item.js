const { retrieveItem } = require('eb-logics')
const { query } = require( 'winston' )
const { env: { SECRET } } = process
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { query: {q} } = req
    try {
        retrieveItem(q)
            .then(item => res.json(item))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}