import React from 'react'
import { retrieveItems } from "../logic"
import { useEffect, useState } from 'react'
import Item from './Item'
import AppContext from './AppContext'
import { useContext } from 'react'
import { deleteBuild } from '../logic'


const BuildChampion = ( { build: { id, champion }, onBuildDeleted } ) => {

    const [items, setItems] = useState( [] )
    const {onOpenModal} = useContext(AppContext);
    useEffect( () => {
        ( async () => {
            const items = await retrieveItems( sessionStorage.token, id )
            setItems( items )

        } )()

    }, [] )
    const eliminateBuild = async () => {
        try {
            await deleteBuild( sessionStorage.token, id )

        
            onBuildDeleted()
        }
        catch ( { message } ) {
            onOpenModal( message )
        }

    }
    return items && items.length ? <>
        <div className='build'>
            <div className='champ'>
            <img className="results__image" src={`/images/champions/${champion.name.replace( /\'/g, '' ).replace( /\s+/, '' )}.png`} />
                <h1>{champion.name}</h1>
            </div>
            <div className='items'>
                
            {
                items.map( item => <Item item={item} key={item.id} /> )
            }
            </div>
            <button className='button' onClick={eliminateBuild}>X</button>
        </div>
    </> : null
    }

    export default BuildChampion