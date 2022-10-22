import context from './context'

function retrieveMostFavs() {

    return (async () => {
        const res = await fetch(`${context.API_URL}/users/mostFavorites`, {
            method: 'GET'
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status === 200) {
            const favorites = await res.json()

            return favorites
        }
    })()
}

export default retrieveMostFavs