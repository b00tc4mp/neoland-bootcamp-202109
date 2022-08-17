import React from 'react'
import { retrieveItems } from "../logic"
import { useEffect, useState } from 'react'
import Item from './Item'


const Build = ( { build: { id, user } } ) => {

    const [items, setItems] = useState( [] )

    useEffect( () => {
        ( async () => {

            const items = await retrieveItems( sessionStorage.token, id )
            setItems( items )

        } )()

    }, [] )
    return items && items.length ? <>
        <div className='build__container'>
            <div className='build__username'>
            <h2 className='username'>{user.username}</h2>
            </div>
            <div className='items'>

            {
                items.map( item => <Item item={item} key={item.id} /> )
            }
            </div>

        </div>
    </> : null

}

export default Build