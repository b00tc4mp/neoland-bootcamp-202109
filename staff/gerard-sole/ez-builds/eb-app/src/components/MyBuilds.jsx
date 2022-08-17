import { retrieveBuildsByUser } from "../logic"
import { useEffect, useState } from 'react'
import BuildChampion from './BuildChampion'

function MyBuilds( { onBack } ) {
    
    const [builds, setBuilds] = useState( [] )


    useEffect( () => {
        ( async () => {

            const builds = await retrieveBuildsByUser( sessionStorage.token )

            setBuilds( builds )
        } )()

    }, [] )

    const buildDeleted = async() => {
        const builds = await retrieveBuildsByUser( sessionStorage.token )

        setBuilds( builds )
    }

    return  builds ? <>
        <div className="container container--gapped">
            <button className="button" onClick={onBack}>Go back</button>
        </div>
                {
                    builds.map( build => <BuildChampion build={build} key={build.id} onBuildDeleted={buildDeleted} /> )
                }
    </> : null

}

export default MyBuilds