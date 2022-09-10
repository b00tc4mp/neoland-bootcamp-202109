import context from './context'

 function modifyReservation(token, reservation, reservationId) {
    // validateToken(token) TODO
    // validateOldPassword(reservation.validateOldPassword)
    // validatePassword(user.password)

    return (async () => {
        debugger
        const res = await fetch(`${context.API_URL}/reservations/${reservationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservation)
        })

        const { status } = res

        if (status === 204) {
            return
        } else  if (status === 400 || status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknown error')
    })()
}

export default modifyReservation