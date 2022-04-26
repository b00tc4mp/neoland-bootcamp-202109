import { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext'
import { retrieveFavItems, toggleFavItem } from '../logic'
import logger from '../utils/logger.js'
// import './Favs.css'

function Favs({ onItem }) {
    logger.debug('Favs -> render')

    const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext)

    const [items, setItems] = useState([])

    const { token } = sessionStorage

    useEffect(() => {
        (async () => {
            logger.debug('Favs -> useEffect')

            try {
                if (!token) {
                    onModal('Sign in to see your favorite items', 'warn')
                } else {
                    onFlowStart()
    
                    const items = await retrieveFavItems(token)
    
                    setItems(items)
    
                    onFlowEnd()
                }
            } catch ({ message }) {
                onFlowEnd()

                onModal(message, 'error')
            }
        })()
    }, [])

    const toggleFav = async (item_id) => {
        try {
            if (!token) {
                onModal('Sign in to add favorites to your profile', 'warn')
            } else {
                onFlowStart()
                
                await toggleFavItem(token, item_id)
    
                setItems(items.map(item => {
                    if (item.item_id === item_id) {
                        return { ...item, isFav: !item.isFav}
                    }
    
                    return item
                }))
    
                onFlowEnd()
            }
        } catch ({ message }) {
            onFlowEnd()

            onModal(message, 'warn')
        }
    }

    return items && items.length ?
        <ul className="favs container container--vertical">
            {
                items.map(({ item_id, name, images, price, isFav }) => <li key={item_id}className="home__results-item" onClick={() => onItem(item_id)}>
                <img src={images[0]} alt='' />
                <h2>{name}</h2>
                <span>{price}</span>
                <button className="button fav-button" onClick={event => {
                        event.stopPropagation()

                        toggleFav(item_id)
                    }}>{isFav ? '🧡' : '🤍'}</button>
            </li>)
            }
        </ul>
        :
        null
}

export default Favs