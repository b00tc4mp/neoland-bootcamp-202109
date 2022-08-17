const sanitizer = doc => {
    if (doc._id) {
        doc.id = doc._id.toString()
    
        delete doc._id
    }    
    
    delete doc.__v
}

module.exports = sanitizer