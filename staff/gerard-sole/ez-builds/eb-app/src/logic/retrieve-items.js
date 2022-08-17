import context from './context'


function retrieveItems(token, buildId) {
    // TODO verificar los parámetros de etrada
    return (async () => {
        const res = await fetch(
            `${context.API_URL}/items/?q=${buildId}`,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )

        const { status } = res

        if (status === 200) {
            const items = await res.json()
            
            return items
        } else if (status === 401) {
            const { error } = await res.json()

        } else{ throw new Error('unknown error')}
    })()
}

export default retrieveItems