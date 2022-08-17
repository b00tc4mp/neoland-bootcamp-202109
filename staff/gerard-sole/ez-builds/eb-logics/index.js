const registerUser = require('./register-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const authenticateUser = require('./authenticate-user')
const retrieveChampion = require('./retrieve-champion')
const retrieveChampionById = require('./retrieve-champion-by-id')
const retrieveItem = require('./retrieve-item')
const createBuild = require('./create-build')
const deleteBuild = require('./delete-build')
const retrieveBuildsByChampion = require('./retrieve-builds-by-champion')
const retrieveBuildsByUser = require('./retrieve-builds-by-user')
const retrieveItems = require('./retrieve-items')


module.exports = {
    registerUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    authenticateUser,
    retrieveChampion,
    retrieveItem,
    createBuild,
    deleteBuild,
    retrieveBuildsByChampion,
    retrieveBuildsByUser,
    retrieveChampionById,
    retrieveItems
}