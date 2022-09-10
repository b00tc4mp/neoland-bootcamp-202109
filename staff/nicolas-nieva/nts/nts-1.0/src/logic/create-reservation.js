import context from './context'
// const { validateName, validateUsername, validatePassword } = require ('nts-logic/helpers/validators')


function createReservation(token, reservation) {

    // validateName (name)
    // validateUsername (username)
    // validatePassword (password)


    return (async () => {
        const res = await fetch(
            `${context.API_URL}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservation)
            }
        )

        const { status } = res

        if (status === 409 || status === 400) {
            const { error } = await res.json()
            throw new Error (error)
        }
        else if (status === 201) return
        else throw new Error('unknown error')

    })()

}


export default createReservation