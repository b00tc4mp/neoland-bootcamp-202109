import context from './context'
const { validateName, validateUsername, validatePassword, validateMail, validateAddress, validateProvince, validateLocation  } = require ('nts-logic/helpers/validators')


function signupUser(user) {

    const { name, username, password, email, address, phone, province, location, country } = user
    validateName (name)
    validateUsername (username)
    validatePassword (password)
    validateMail(email)
    validateAddress(address)
    validateProvince(province)
    validateLocation(location)

    return (async () => {

        const res = await fetch(
            `${context.API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, username, password, email, address, phone, province, location, country
                })
            }
        )

        const { status } = res

        if (status === 409 || status === 400) {
            const { error } = await res.json()
            throw new Error (error)
        }
        else if (status === 201) return
        else throw new Error('unknown error')

    })()

}


export default signupUser