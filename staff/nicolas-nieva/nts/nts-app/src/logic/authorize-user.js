import context from './context'
const { validateName, validateUsername, validatePassword, validateMail, validateAddress, validateProvince, validateLocation, validateNumber  } = require ('./../helpers/validators.js')

function authorizeUser(user) {
    const { username, password } = user
    // validateUsername (username)
    // validatePassword (password)
 
    return (async () => {
        const res = await fetch(`${context.API_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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