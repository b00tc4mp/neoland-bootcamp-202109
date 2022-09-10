import context from './context'

function retrieveReservation(token, reservationId) {
    //todo validators

    return (async () => {
        const res = await fetch(`${context.API_URL}/reservations/${reservationId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })

        const { status } = res

        if (status === 200) {
            
            return await res.json()

        } else if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else throw new Error('unknow error')
    })()
}

export default retrieveReservation