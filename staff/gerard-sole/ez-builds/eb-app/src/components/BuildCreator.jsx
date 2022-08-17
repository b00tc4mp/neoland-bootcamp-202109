import React from 'react'
import createBuild from '../logic/create-build'
import AppContext from './AppContext'
import { useContext } from 'react'



function BuildCreator( { championId, onSearchItem, buildItems, BuildCreator,  onBack } ) {
    const { token } = sessionStorage
    const {onOpenModal} = useContext(AppContext);

    const newBuild = async () => {
        try {
            await createBuild( token, buildItems, championId )

            onOpenModal('build created')
        }
        catch ( { message } ) {
            onOpenModal( message )
        }

    }

    return <>
        <form className="container" onSubmit={event => {
            event.preventDefault()

            const query = event.target.query.value

            onSearchItem( query )
        }}>
            <input className="field" type="text" placeholder="item name" name="query" />
            <button className="button button--medium button--dark">Search</button>
        </form>
        <div>
        <button className='button button--dark' onClick={ newBuild }>create build</button>
        <button className='button' onClick={onBack}>go back</button>
        </div>
    </>
}

export default BuildCreator