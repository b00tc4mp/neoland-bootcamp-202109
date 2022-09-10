function sanitizeUser(user) {
    user.id = user._id.toString()

    delete user._id
        
    delete user.password

    delete user.__v
}

function sanitizeReservation(reservation) {
    reservation.id = reservation._id.toString()

    delete reservation._id

    delete reservation.__v

    delete reservation.agency

    reservation.from = new Intl.DateTimeFormat('es-BO').format(reservation.from)
    reservation.until = new Intl.DateTimeFormat('es-BO').format(reservation.until)

    reservation.notes.forEach(sanitizeNote)
}

function sanitizeNote(note) {
    note.id = note._id.toString()

    delete note._id

    delete note.__v

    note.date = new Intl.DateTimeFormat('es-BO').format(note.date)
}

module.exports = {
    sanitizeUser,
    sanitizeReservation,
    sanitizeNote
}