import React from "react"
import surf from '../assets/surf.jpg'
import './Welcome.sass'
import { useState, useEffect, useContext } from 'react'
import { IconContext } from "react-icons"
import { BsStarFill } from "react-icons/bs"
import { retrieveMostFavs } from "../logic"
import AppContext from './AppContext'

function Welcome({ onItem, theme }) {

    const { showSpinner, hideSpinner } = useContext(AppContext)

    const [most, setMost] = useState([])

    useEffect(() => {
        (async function () {
            try {

                showSpinner()

                const mostFavs = await retrieveMostFavs()

                setMost(mostFavs)

                hideSpinner()

            } catch (error) {
                hideSpinner()
            }
        })()
    }, []);

    return <>
        <div className={`${theme} grid__center1 center center--welcome`}>
            <aside className="grid__center-aside favs">
                <h2>PLAYAS MÁS FAVORITAS</h2>
                <IconContext.Provider value={{ color: '#d8a600', size: "0.8em", style: { verticalAlign: 'middle', margin: '5px' } }}>
                    {
                        most.map(({ idBeach, nameBeach }) =>
                            <span className="recommended-beach" onClick={() => onItem({ name: nameBeach }, idBeach)}><BsStarFill />{nameBeach}</span>
                        )
                    }
                </IconContext.Provider>
            </aside>
            <aside className="grid__center-aside img">
                <img className="image--welcome" src={surf} alt="foto1" />
            </aside>
            <aside className="grid__center-aside recommended">
                <h2>PLAYAS RECOMENDADAS</h2>
                <IconContext.Provider value={{ color: '#d8a600', size: "0.8em", style: { verticalAlign: 'middle', margin: '5px' } }}>
                    <span className="recommended-beach" onClick={() => onItem({ name: 'Pipeline', breadCrumbs: 'United States / Hawaii / Honolulu CountyO‘ahu' }, '5842041f4e65fad6a7708890')}><BsStarFill />Pipeline - Hawaii</span>
                    <span className="recommended-beach" onClick={() => onItem({ name: 'Peahi (Jaws)', breadCrumbs: 'United States / Hawaii / Maui CountyMaui' }, '5842041f4e65fad6a7708de9')}><BsStarFill />Jaws - Hawaii</span>
                    <span className="recommended-beach" onClick={() => onItem({ name: 'Praia de Itauna', breadCrumbs: 'Brazil / Rio de Janeiro / Saquarema' }, '5842041f4e65fad6a7708ce9')}><BsStarFill />Praia de Itauna - Brasil</span>
                    <span className="recommended-beach" onClick={() => onItem({ name: 'Teahupoo', breadCrumbs: 'French Polynesia / Vairao' }, '5842041f4e65fad6a7708dbf')}><BsStarFill />Teahupo'o - Tahiti</span>
                    <span className="recommended-beach" onClick={() => onItem({ name: 'Santa Teresa', breadCrumbs: 'Costa Rica / Provincia de Guanacaste / Nandayure' }, '5842041f4e65fad6a7708e31')}><BsStarFill />Santa Teresa - Costa Rica</span>
                </IconContext.Provider>
            </aside>
        </div>
    </>
}

export default Welcome