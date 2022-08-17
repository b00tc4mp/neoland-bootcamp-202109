import { useQueryParams } from '../hooks'
import { retrieveBuild, retrieveBuildsByChampion, searchChampionsById } from "../logic"
import { useEffect, useState } from 'react'
import Build from './Build'

function Detail( { onBack, buildCreator } ) {

    const [champion, setChampion] = useState( {} )
    const [builds, setBuilds] = useState( [] )


    const queryParams = useQueryParams()
    const championId = queryParams.get( 'id' )

    useEffect( () => {
        ( async () => {

            const champion = await searchChampionsById( sessionStorage.token, championId )
            setChampion( champion )
            const builds = await retrieveBuildsByChampion( sessionStorage.token, championId )

            setBuilds( builds )
        } )()

    }, [] )

    return champion && champion.id && builds ? <>
        <div className="container container--gapped">
            <button className='button button--dark' onClick={() => buildCreator(champion)}>Create Build</button>
            <button className="button" onClick={onBack}>Go back</button>
        </div>
        <div className='champion--container'>
            <div className="container champion--detail container--vertical" >
                <img className="results__image" src={`/images/champions/${champion.name.replace( /\'/g, '' ).replace( /\s+/, '' )}.png`} />
                <h1 className='content'>{champion.name}</h1>
                <p className='content'>{champion.title}</p>
               

                {
                    builds.map( build => <Build build={build} key={build.id} /> )
                }   
            </div>
        </div>
    </> : null

}

export default Detail