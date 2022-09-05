const { searchVehicles } = require('.')

const { argv: [, , command] } = process

if (command === 'search') {
    const { argv: [, , , query] } = process

    searchVehicles(query, (error, vehicles) => {
        if (error) return console.log(error.message)

        console.table(vehicles)
    })
}