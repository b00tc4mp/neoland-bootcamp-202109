import { useQueryParams } from '../hooks'
import { useState, useEffect, useContext, Fragment } from 'react'
import { retrieveItem, searchChampionsByName } from '../logic'
import AppContext from './AppContext'


function ItemResults({getItems, buildCreator, champion}) {

    const { onOpenModal } = useContext( AppContext )

    const [item, setItem] = useState()

    const queryParams = useQueryParams()

    const query = queryParams.get( 'q' )

    useEffect( async () => {
        try {
            const item = await retrieveItem( sessionStorage.token, query )

            setItem( item )
        } catch ( { message } ) {

            onOpenModal(message)
        }
    }, [query] )
    
    return item && item.length ?
        <ul className="results container container--vertical">
            <button className='button' onClick={() => buildCreator(champion)}>search items</button>
            {
                item.map( ( { id, name, key } ) =>
                    <li key={id} className="home__result" onClick={() => getItems(id)}>
                        <div className='result'>
                            <img className="results__image" src={`/images/items/${key}.png`} />
                            <h1>{name}</h1>
                        </div>
                    </li>
                )
            }
        </ul>
        :
        <div className='notfound'>
        <button className='button' onClick={() => buildCreator(champion)}>search items</button>
        <h1 className='container--title'>item not found</h1>
        </div>
}

export default ItemResults