const { createBuild } = require('eb-logics')
const {handleError, validateAuthorizationAndExtractPayload} = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { items, champion } } = req
    
    try {
        
        const { sub: user } = validateAuthorizationAndExtractPayload( authorization )
        
        createBuild(items, champion, user)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }       
}