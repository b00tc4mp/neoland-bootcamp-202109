import context from './context'
const { validateUsername, validatePassword } = require ('nts-logic/helpers/validators')

function signinUser(username, password) {
    // validateUsername (username)
    // validatePassword (password)
    
    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username, password)
        })
        
        const { status } = res

        if (status === 201)
            return
        else if (status === 409 || status === 400) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknown error')
    })()
}


export default signinUser