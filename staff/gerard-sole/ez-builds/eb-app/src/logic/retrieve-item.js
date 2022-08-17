import context from './context'


function retrieveItem(token, query) {
    return (async () => {
        const res = await fetch(`${context.API_URL}/item?q=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const { status } = res

        if (status === 200) {
            const item = await res.json()
            
            return item
        } else if (status === 401) {
            const { error } = await res.json()

        } else{ throw new Error('unknown error')}
    })()
}

export default retrieveItem