import './index.css'

import { authenticateUser } from '../../services'

import AppContext from '../../context/AppContext'
import { useContext } from 'react'

export default function Login({ goToHome, goToRegister }) {
    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

    const handleSubmit = async event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        try {
            showSpinner()
            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            hideSpinner()
            goToHome()
        } catch ({ message }) {
            hideSpinner()
            showModal(message)
        }
    }

    return <>
        <div className='background'>
            <div className="login">
                <h1 className="login__title">Login</h1>

                <form className="loginForm" onSubmit={handleSubmit}>
                    <input className="input loginForm__input" type="text" name="username" id="username" placeholder="Username" />
                    <input className="input loginForm__input" type="password" name="password" id="password" placeholder="Password" />

                    <div className="container">
                        <button type="submit" className="btn loginForm__btn">Login</button>
                        <button type="button" className="btn loginForm__btn" onClick={() => goToRegister()}>Don't have account? Register</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}