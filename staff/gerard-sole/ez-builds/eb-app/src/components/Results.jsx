import { useQueryParams } from '../hooks'
import { useState, useEffect, useContext, Fragment } from 'react'
import { searchChampionsByName } from '../logic'
import AppContext from './AppContext'
import { useNavigate } from 'react-router-dom'


function Results() {

    const { openModal } = useContext( AppContext )

    const [champions, setChampions] = useState()

    const navigate = useNavigate()

    const queryParams = useQueryParams()

    const query = queryParams.get( 'name' )

    const onItem = id => navigate(`/champion/?id=${ id }`)

    useEffect( async () => {
        try {

            const champions = await searchChampionsByName( sessionStorage.token, query )

            setChampions( champions )
        } catch ( { message } ) {

            openModal(message)
        }
    }, [query] )
    
    return champions && champions.length ?
        <ul className="results container container--vertical">
            {
                champions.map( ( { id, name, title } ) =>
                    <li key={id} className="home__result" onClick={() => onItem( id )}>
                        <div className='result'>
                            <img className="results__image" src={`/images/champions/${name.replace( /\'/g, '' ).replace( /\s+/, '' ).replace( /\./g, '' )}.png`} />
                            <div className='results__text'>
                            <h1>{name}</h1>
                            <h2>{title}</h2>
                            </div>
                        </div>
                    </li>
                )
            }
        </ul>
        :
        <div className='notfound'>
        <h1 className='container--title'>No champion found</h1>
        </div>
}

export default Results