import logger from '../../utils/logger'
import './Detail.css'
import { Component } from 'react'

class Detail extends Component {
    constructor(props) {
        super()

        this.state = { fav: props.item.isFav }
    }

    toggleFav = id => {
        this.setState({ fav: !this.state.fav })

        this.props.onToggleFav(id)
    }

    render() {  
    logger.debug('Detail -> render')

    const {
        props: {
            item: { id, name, image, year, price, color, style, collection, maker, url }, 
            onBack
        },
        state: { fav },
        toggleFav
    } = this
    
    return <div className="home__detail container container--vertical">
        <button className="button button-medium button" onClick={onBack}>Back to Results</button>
        <h2>{name}</h2>
        <img className="home__detail-image" src={image} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas sapiente veritatis, magni natus necessitatibus velit aliquam enim iste? Beatae velit explicabo temporibus et blanditiis! Deleniti nemo voluptatem cumque nam.</p>
        <time>{year}</time>
        <span>{price}</span>
        <span>{color}</span>
        <span>{style}</span>
        <span>{collection}</span>
        <span>{maker}</span>
        <a href={url}>original</a>
        <button className='button' onClick={() => toggleFav(id)}>{fav ? '🧡' : '🤍'}</button>
    </div>
    }
}

export default Detail