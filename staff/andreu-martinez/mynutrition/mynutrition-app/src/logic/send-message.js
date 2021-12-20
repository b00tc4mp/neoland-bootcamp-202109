import context from './context'

function sendMessage(token, to, subject, body){ 
    const newDate = new Date()
    
    return( async () => {
        const res = await fetch(`${context.API_URL}/messages`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({to, subject, body, newDate })
        })

        const {status} = res

        if (status === 201)
            return
        else if (status === 409 || status === 400) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknown error')
    })()
}

export default sendMessage
