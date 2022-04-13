import Header from "../../components/Header"
import AllGames from "../../components/AllGames"
import ListOfGames from "../../components/ListOfGames"
import GameDetail from "../../components/GameDetail"
import Aside from "../../components/Aside"

import ProfileLibrary from "../ProfileLibrary"
import ProfileSettings from "../ProfileSettings"

import { Routes, Route, useNavigate } from "react-router-dom"

// import { useQueryParams } from '../../hooks'

import { useEffect, useState } from "react"

import { retrieveUser } from "../../services"

import AppContext from '../../context/AppContext'
import { useContext } from 'react'

const Home = ({ resetTokenAndGoToLanding }) => {
    const { showSpinner, hideSpinner } = useContext(AppContext)

    const [username, setUsername] = useState('')
    const [view, setView] = useState('')
    const [favGames, setFavGames] = useState([])
    const [playingGames, setPlayingGames] = useState([])
    const [playedGames, setPlayedGames] = useState([])

    const navigate = useNavigate()

    // const queryParams = useQueryParams()
    // const [query, setQuery] = useState(queryParams.get('q'))

    useEffect(() => {
        const { token } = sessionStorage

        if (token) {
            (async () => {
                try {
                    showSpinner()
                    retrieveUser(token)
                        .then(user => {
                            const { username, favGames, playingGames, playedGames } = user
                            setUsername(username)
                            setFavGames(favGames)
                            setPlayingGames(playingGames)
                            setPlayedGames(playedGames)
                        })
                    hideSpinner()
                } catch ({ message }) {
                    resetTokenAndGoToLanding()
                    hideSpinner()
                }
            })()
        }
    }, [])

    const showAside = () => setView('aside')

    const hideAside = () => setView('')

    const goToProfileLibrary = () => {
        navigate('/profile')
        setView('')
    }

    const goToProfileSettings = () => {
        navigate('/settings')
        setView('')
    }

    return <>
        <Header username={username} showAside={showAside} />

        {view === 'aside' && <Aside hideAside={hideAside} goToProfileLibrary={goToProfileLibrary} goToProfileSettings={goToProfileSettings} resetTokenAndGoToLanding={resetTokenAndGoToLanding} />}

        <Routes>
            <Route path='/' element={<AllGames favGames={favGames} playingGames={playingGames} playedGames={playedGames} />} />
            <Route path='games'>
                <Route path='search/:query' element={<ListOfGames favGames={favGames} playingGames={playingGames} playedGames={playedGames} />} />
                <Route path=':gameId' element={<GameDetail />} />
            </Route>
            <Route path='profile' element={<ProfileLibrary />} />
            <Route path='settings' element={<ProfileSettings resetTokenAndGoToLanding={resetTokenAndGoToLanding} />} />
        </Routes>
    </>
}

export default Home