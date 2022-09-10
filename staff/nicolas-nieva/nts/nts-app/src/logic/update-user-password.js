import context from './context'

 function updateUserPassword(token, user) {
    // validateToken(token) TODO
    // validateOldPassword(user.validateOldPassword)
    // validatePassword(user.password)

    return (async () => {
        debugger
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
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

export default updateUserPassword