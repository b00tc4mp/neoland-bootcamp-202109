const validators = require ('./validators')

const {  
    validateId,
    validateUsername,
    validatePassword,
    validateOldPassword,
    validateData,
    validateName,
    validateCallback,
    validateItems,
    validateChampion,
    validateQuery 
} = validators

module.exports= {
    sanitizer: require ('./sanitizer'),
    validateId,
    validateUsername,
    validatePassword,
    validateOldPassword,
    validateData,
    validateName,
    validateCallback,
    validateItems,
    validateChampion,
    validateQuery    
}

