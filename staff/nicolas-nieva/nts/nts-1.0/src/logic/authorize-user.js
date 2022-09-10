import context from './context'
const { validateUsername, validatePassword } = require ('nts-logic/helpers/validators')

function authorizeUser(username, password) {
    // validateUsername (username)
    // validatePassword (password)
 
    return (async () => {
        const res = await fetch(`${context.API_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username, password)
        })

        const { status } = res

        if (status === 200) {
            const { token } = await res.json()

            return token
        } else if (status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknown error')
    })()
}

export default authorizeUser