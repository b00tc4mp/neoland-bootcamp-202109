const { searchItems } = require('logical-echo-logic')
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { query: { q } } = req

    try {
        searchItems(q, (error, items) => {
            if (error) return handleError(error, res)

            res.json(items)
        })
    } catch (error) {
        handleError(error, res)
    }
}