const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const modifyUser = require('./users/modify-user')
const unregisterUser = require('./users/unregister-user')
const registerItems = require('./items/register-items')
const searchItems = require('./items/search-items')
const retrieveFavItems = require('./items/retrieve-fav-items')
const registerSubscription = require('./items/register-subscription')
const retrieveItem = require('./items/retrieve-item')
const registerClickedItem = require('./items/register-clicked-item')
const registerSearch = require('./items/register-search')
const sendEmail = require('./mails/mailer')
// import sendEmail from ('./mails/mailer')
// const retrieveTrendingItems = require('./retrieve-trending-items')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    registerItems,
    searchItems,
    retrieveFavItems,
    registerSubscription,
    retrieveItem,
    registerClickedItem,
    registerSearch,
    sendEmail
    // retrieveTrendingItems
}