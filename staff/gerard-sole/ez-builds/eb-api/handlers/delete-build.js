const { deleteBuild } = require('eb-logics')
const { env: { SECRET } } = process
const {handleError, validateAuthorizationAndExtractPayload} = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: {id} } = req
    debugger
    try {
       validateAuthorizationAndExtractPayload( authorization )
        deleteBuild(id)
        .then(() => res.status(201).send())
        .catch(error => handleError(error, res))
            
    } catch (error) {
        handleError(error, res)
    }
}