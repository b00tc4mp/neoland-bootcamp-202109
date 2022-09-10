import context from './context'

function retrieveReservations(token) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    return (async () => {
        const res = await fetch(`${context.API_URL}/reservations`, {
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

export default retrieveReservations