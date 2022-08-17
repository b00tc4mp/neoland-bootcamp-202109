const { model } = require('mongoose')
const { user, champion, item, build } = require('./schemas')

module.exports = {
    User: model('User', user),
    Champion: model('Champion', champion),
    Item: model('Item', item),
    Build: model('Build', build)
}