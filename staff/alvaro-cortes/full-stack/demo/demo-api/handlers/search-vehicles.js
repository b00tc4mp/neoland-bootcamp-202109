const { searchVehicles } = require('demo-logic')
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { query: { q } } = req

        try {
            searchVehicles(q, (error, vehicles) => {
                if (error) return handleError(error, res)

                res.json(vehicles)
            })
        } catch (error) {
            handleError(error, res)
        }
}