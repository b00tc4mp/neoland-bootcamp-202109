import context from './context'

function searchReservations(token, query) {
    if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
    if (!query.trim().length) throw new Error('query is empty or blank')

    return (async () => {
        const res = await fetch(`${context.API_URL}/reservations/search?q=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const { status} = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status === 200) {
            
            const reservations = await res.json()

            return reservations

        }else throw new Error('unknown error')


    })()

}
export default searchReservations