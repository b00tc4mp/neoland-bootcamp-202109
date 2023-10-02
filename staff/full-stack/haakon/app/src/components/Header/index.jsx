import './index.css'

import { useState } from "react"

import { Link, Outlet, useNavigate } from 'react-router-dom'

const Header = ({ username, showAside }) => {
    const [query, setQuery] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        navigate(`games/search/${query}`)
    }

    const handleChange = event => {
        setQuery(event.target.value)
    }

    return <>
        <header className='header'>
            <h1 className='header__logo'><Link className='logo__link' to='/'>Haakon</Link></h1>
            <form className='header__search' onSubmit={handleSubmit}>
                <input className="input-elevated" placeholder="Search Here" type="text" name="query" defaultValue={query} onChange={handleChange} />
            </form>
            <div className="perfil" onClick={() => showAside()}>
                <span className='username'>{username}</span>
                <i className="fas fa-user-cog"></i>
            </div>
        </header>
        <Outlet />
    </>
}

export default Header