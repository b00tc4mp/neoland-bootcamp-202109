import React, { useState, useEffect, useContext } from "react"
import Search from "./Search"
import Results from "./Results"
import Detail from "./Detail"
import { useQueryParams } from '../hooks'
import Profile from "./Profile"
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import BuildCreator from "./BuildCreator"
import ItemResults from "./ItemResults"
import AppContext from "./AppContext"
import MyBuilds from "./MyBuilds"

function Home( { onSignOut } ) {
    const [champion, setChampion] = useState( null )
    const queryParams = useQueryParams()
    const navigate = useNavigate()
    const goToSearch = () => search( query )
    const [query, setQuery] = useState( queryParams.get( 'name' ) )
    const [buildItems, setBuildItems] = useState( [] )
    const {onOpenModal} = useContext(AppContext)



    const search = query => {
        setQuery( query )

        navigate( `/search/?name=${query}` )
    }

    const searchItem = query => {
        setQuery( query )

        navigate( `/itemResult/?q=${query}` )
    }

    const buildCreator = ( legend ) => { navigate( '/buildCreator' ); setChampion( legend ) }

    const goToProfile = () => navigate( '/profile' )

    const goToMyBuilds = () => navigate( '/myBuilds')

    const location = useLocation()

    useEffect( () => {


    }, [] );

    const getItems = ( id ) => {
        if ( buildItems.length < 5 ) {
            if ( !buildItems.includes( id ) ) {
                setBuildItems( [...buildItems, id] )

                onOpenModal( 'item added' )
            } else onOpenModal( 'item already in build' )
        }
        else {
            if ( !buildItems.includes( id ) ) {
                setBuildItems( [...buildItems, id] )

                onOpenModal( 'item added' )
            } else onOpenModal( 'item already in build' )
           
            navigate( `/BuildCreator` )
        }
    }
    
    return <div className="container container--gapped container--vertical">
        <div className="container ">
            <button className="button tutton-medium" onClick={goToMyBuilds}>My builds</button>
            <button className={`button button-medium ${location.pathname === '/profile' && 'button--dark'}`} onClick={goToProfile}>Profile</button>
            <button className="button button-medium" onClick={onSignOut}>Sign out</button>
        </div>

        <Routes> 
            <Route path="/" element={<Search onSearch={search} query={query} />}>
                <Route path="search" element={
                    <Results />
                } />
                <Route path="champion" element={
                    <Detail onBack={goToSearch} buildCreator={buildCreator} />
                } />
            </Route>

            {champion && <Route path="/buildCreator" element={
                <BuildCreator buildItems={buildItems} onBack={goToSearch} onSearchItem={searchItem} buildCreator={buildCreator} championId={champion.id} />
            }></Route>}


            <Route path="/itemResult" element={
                <ItemResults getItems={getItems} buildCreator={buildCreator} champion={champion} />
            } />

            <Route path="/myBuilds" element={<MyBuilds onBack={goToSearch} onSignOut={onSignOut}/>}/>

            <Route path="/profile" element={<Profile onBack={goToSearch} onSignOut={onSignOut} />} />
        </Routes>
    </div>
}

export default Home
