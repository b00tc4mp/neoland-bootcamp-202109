const { model } = require('mongoose')
const { user, creditCard, property } = require('./schemas')

module.exports = {
    User: model('User', user),
    CreditCard: model('CreditCard', creditCard),
    Property: model('Property', property)
}