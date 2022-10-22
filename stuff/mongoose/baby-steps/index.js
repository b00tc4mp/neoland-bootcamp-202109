const mongoose = require('mongoose')

const { Schema, model, ObjectId } = mongoose

const creditCard = new Schema({
    number: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(number) {
                return number.length === 16
            }
        }
    },
    expirationDate: {
        type: Date,
        required: true
    }
})

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator(username) {
                    return username.length > 3
                },
                message: 'username too short'
            },
            {
                validator(username) {
                    return !username.includes(' ')
                },
                message: 'username has white spaces'
            }
        ]
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator(password) {
                    return password.length > 6
                },
                message: 'password too short'
            },
            {
                validator(password) {
                    return !password.includes(' ')
                },
                message: 'password has white spaces'
            }
        ]
    },
    creditCards: {
        type: [creditCard]
    }
})

const property = new Schema({
    cadastre: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owners: {
        type: [{
            type: ObjectId,
            ref: 'User'
        }],
        required: true
    }
})

const User = model('User', user)
const CreditCard = model('CreditCard', creditCard)
const Property = model('Property', property)

mongoose.connect('mongodb://localhost/demo')
    .then(() => {
        //return User.deleteMany()
        return Promise.all([User.deleteMany(), Property.deleteMany()])
    })
    .then(() => {
        // const user = new User

        // user.name = 'Peter Pan'
        // user.username = 'peterpan'
        // user.password = '123123123'

        //const user = new User({ name: 'Peter Pan', username: 'peterpan', password: '123123123' })

        //return user.save()

        return User.create({ name: 'Peter Pan', username: 'peterpan', password: '123123123' })
    })
    // .then(user => {
    //     console.log('user saved')

    //     const id = user.id // user._id.toString()

    //     return User.findById(id)
    // })
    // .then(user => {
    //     console.log(user)

    //     user.name = 'Wendy Pan'

    //     return user.save()
    // })
    // .then(user => {
    //     console.log('user saved')

    //     const id = user.id // user._id.toString()

    //     return User.findById(id)
    // })
    // .then(user => {
    //     console.log(user)

    //     const username = user.username

    //     return User.findOne({ username })
    // })
    // .then(user => {
    //     console.log(user)

    //     const id = user.id

    //     return User.deleteOne({ id })
    // })
    .then(user => {
        const creditCard = new CreditCard({ number: '1234123412341234', expirationDate: new Date(2023, 10, 26) })
        const creditCard2 = new CreditCard({ number: '2345234523452345', expirationDate: new Date(2024, 10, 26) })

        //return creditCard.save()

        user.creditCards.push(creditCard)
        user.creditCards.push(creditCard2)

        return user.save()
    })
    .then(user => {
        const property = new Property({ cadastre: '123T', address: 'Barcelona', owners: [user.id] })

        return property.save()
    })
    .then(property => {
        const user = new User({ name: 'Bu Rro', username: 'burro', password: '123123123' })

        property.owners.push(user.id)

        return Promise.all([user.save(), property.save()])
    })
    .then(([user, property]) => {
        const property2 = new Property({ cadastre: '345T', address: 'Tarragona', owners: [user.id] })

        return property2.save()
    })
    // .then(property => {
    //     const [id] = property.owners

    //     return Property.find({ owners: id }) // > db.properties.find({ owners: { $elemMatch: { $eq: ObjectId("61a0cac540583d001dc1cb54") } } }).pretty()
    // })
    // .then(properties => {
    //     console.log(properties)
    // })
    .then(() => {
        return User.findOne({ username: 'peterpan'})
    })
    .then(user => {
        return Property.find({ owners: user.id })
    })
    .then(properties => {
        console.log(properties)
    })
    .catch(error => {
        console.error(error.message)
    })
    .finally(() => {
        mongoose.disconnect()
    })