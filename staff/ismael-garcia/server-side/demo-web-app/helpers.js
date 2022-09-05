function getUserId(cookie) {
    const [, id] = cookie.split('=')

    return id 
}

module.exports = {
    getUserId
}