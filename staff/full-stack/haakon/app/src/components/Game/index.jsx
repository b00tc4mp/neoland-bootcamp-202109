import { useNavigate } from 'react-router-dom'
import { toggleFavGame, togglePlayingGame, togglePlayedGame } from '../../services'
import './index.css'
import AppContext from '../../context/AppContext'
import { useContext, useEffect, useState } from 'react'


const Game = ({ id, backgroundImage, name, platforms, genres, score, favGames, playingGames, playedGames }) => {
    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

    const [isFavGame, setIsFavGame] = useState(false)
    const [isPlayingGame, setIsPlayingGame] = useState(false)
    const [isPlayedGame, setIsPlayedGame] = useState(false)
    const [view, setView] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const isFavGame = favGames.some(favId => favId === id)
        setIsFavGame(isFavGame)

        const isPlayingGame = playingGames.some(playingId => playingId === id)
        setIsPlayingGame(isPlayingGame)

        const isPlayedGame = playedGames.some(playedId => playedId === id)
        setIsPlayedGame(isPlayedGame)
    }, [])

    const handleClick = () => {
        navigate(`/games/${id}`)
    }

    const handleFavGame = async () => {
        try {
            showSpinner()
            await toggleFavGame(sessionStorage.token, id)
            setIsFavGame(!isFavGame)
            hideSpinner()
        } catch ({ message }) {
            showModal(message)
            hideSpinner()
        }
    }

    const handlePlayingGame = async () => {
        try {
            showSpinner()
            await togglePlayingGame(sessionStorage.token, id)
            setIsPlayingGame(!isPlayingGame)
            if (isPlayedGame) {
                togglePlayedGame(sessionStorage.token, id)
                setIsPlayedGame(!isPlayedGame)
            }
            hideSpinner()
        } catch ({ message }) {
            showModal(message)
            hideSpinner()
        }
    }

    console.log(platforms)

    const handlePlayedGame = async () => {
        try {
            showSpinner()
            await togglePlayedGame(sessionStorage.token, id)
            setIsPlayedGame(!isPlayedGame)
            if (isPlayingGame) {
                togglePlayingGame(sessionStorage.token, id)
                setIsPlayingGame(!isPlayingGame)
            }

            hideSpinner()
        } catch ({ message }) {
            showModal(message)
            hideSpinner()
        }
    }

    const ifPlatform = (name, id) => {
        if (name.includes('Xbox')) return <i key={id} className="fab fa-xbox"></i>
        if (name.includes('PlayStation' || 'PS Vita')) return <i key={id} className="fab fa-playstation"></i>
        if (name.includes('Nintendo')) return <i key={id} className="fas fa-dice-d6"></i>
        if (name.includes('PC')) return <i key={id} className="fab fa-windows"></i>
        if (name.includes('Linux')) return <i key={id} className="fab fa-linux"></i>
        if (name.includes('macOS' || 'iOS')) return <i key={id} className="fab fa-apple"></i>
        if (name.includes('Android')) return <i key={id} className="fab fa-android"></i>
        if (name.includes('Web')) return <i key={id} className="fas fa-globe"></i>
    }

    return <>
        <li key={id} className='gameCard'>
            <div className='gameCardBackground'>
                <img className='gameCardBackground__img' loading="lazy" src={backgroundImage} alt={name} />
                <button className='btnIcon gameCardBackground__btnIcon' onClick={handleFavGame}>
                    <i className={`${isFavGame ? 'fa' : 'far'} fa-heart`}></i>
                </button>
            </div>
            <div className='gameCardData'>
                <div className='gameCardData__row-1'>
                    <div className="gameCardData__row-1__platforms">{platforms.map(({ _id, name }) => ifPlatform(name, id))}</div>
                    {
                        score
                            ? <div className="score">{score}</div>
                            : null
                    }
                </div>
                <h3 className='gameCardData__row-2' onClick={handleClick}>{name}</h3>
                <div className="gameCardData__row-3">
                    <div >{genres.map(({ _id, name }) => <span className='gameCardData__row-1__genres__item' key={_id}>{name}</span>)}</div>
                    <div className='btnIconPlusTooltip'>
                        <button className='btnIcon' onClick={() => setView('tooltip')}>
                            <i className="fas fa-angle-up"></i>
                        </button>
                        {view === 'tooltip' && <div className='tooltip'>
                            <i className="tooltipClose fas fa-angle-right" onClick={() => setView('')}></i>
                            <div className='tooltip__items'>
                                <div className={`tooltip__item ${isPlayingGame ? 'tooltip__item--active' : null}`} onClick={handlePlayingGame}><i className="fas fa-headset"></i>Playing</div>
                                <div className={`tooltip__item ${isPlayedGame ? 'tooltip__item--active' : null}`} onClick={handlePlayedGame}><i className="fas fa-check"></i>Played</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </li>
    </>
}

export default Game