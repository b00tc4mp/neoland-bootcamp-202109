function addComent(token, id, text) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')
    if (typeof id !== "string") throw new Error(`${id} is not a string`)
    if (typeof text !== "string") throw new Error(`${text} is not a string`)

    return (async () => {
        const res = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = await res.json()

            throw new Error(error)
        } else if (status === 200) {
            const user = await res.json()

            const { comments = [] } = user

            const item = comments.find(item => item.id === id)

            let index

            if (item) {
                item.text.push(text)
                index++
            } else {
                comments.push({ id, text: [text] })
                index = 0
            }

            const res2 = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comments })
            })

            const { status } = res2

            if (status === 400 || status === 401) {
                const { error } = await res2.json()

                throw new Error(error)
            } else if (status === 204) {

                return index
            }
        }
    })()
}

export default addComent