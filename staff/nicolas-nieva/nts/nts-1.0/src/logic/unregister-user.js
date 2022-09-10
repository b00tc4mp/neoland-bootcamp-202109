import context from './context'


function unregisterUser(token, password) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    return (async () => {
        debugger
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
                
            },body: JSON.stringify(password)
        })

        const { status } = res

        if (status === 204) {
            return
        } else if (status === 400 || status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        }// else throw new Error('unknown error')
    })()
}

export default unregisterUser
