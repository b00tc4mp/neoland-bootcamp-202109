import context from './context'


function deleteBuild( token, id ) {
debugger
    return ( async () => {
        const res = await fetch( `${context.API_URL}/builds`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'

            },
            body: JSON.stringify( { id } )
        } )

        const { status } = res

        if ( status === 201 ) {

            return
        } else if ( status === 401 ) {
            const { error } = await res.json()

        } else { throw new Error( 'unknown error' ) }
    } )()
}

export default deleteBuild