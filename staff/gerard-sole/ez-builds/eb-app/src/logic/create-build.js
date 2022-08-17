import context from './context'


function createBuild( token, items, champion ) {

    return ( async () => {
        const res = await fetch( `${context.API_URL}/builds`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'

            },
            body: JSON.stringify( { items, champion } )
        } )

        const { status } = res

        if ( status === 201 ) {

            return
        } else if ( status === 401 ) {
            const { error } = await res.json()

        } else { throw new Error( 'unknown error' ) }
    } )()
}

export default createBuild