const { mongoose, models: { Build } } = require('eb-data')
const { validateId, validatePassword } = require('./helpers/validators')
const { NotFoundError } = require('eb-errors')

function deleteBuild(id) {  

    return Build.findById(id)
        .then(build => {
            if (!build) throw new NotFoundError('build not found')
            
                return build.remove(id)
                    .then(() => 'Build deleted succesfully')
        })

}

module.exports = deleteBuild