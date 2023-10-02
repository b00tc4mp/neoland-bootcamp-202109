import './index.css'

import { registerUser } from '../../services'

import AppContext from '../../context/AppContext'
import { useContext } from 'react'

const Register = ({ goToLogin }) => {
    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: {
            name: { value: name },
            username: { value: username },
            password: { value: password }
        } } = event

        try {
            showSpinner()
            await registerUser(name, username, password)
            showModal('user register')
            hideSpinner()
        } catch ({ message }) {
            hideSpinner()
            showModal(message)
        }
    }

    return <>
        <div className='background'>
            <div className="register">
                <h1 className="register__title">Register</h1>

                <form className="registerForm" onSubmit={handleSubmit}>
                    <input className="input registerForm__input" type="text" name="name" id="name" placeholder="Name" />
                    <input className="input registerForm__input" type="text" name="username" id="username" placeholder="Username" />
                    <input className="input registerForm__input" type="password" name="password" id="password" placeholder="Password" />

                    <button className="btn registerForm__btn">Register</button>
                    <button className="btn registerForm__btn" onClick={() => goToLogin()}>I have an account</button>
                </form>

                <p>By signing up, you agree to HAAKON´s <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.</p>
            </div>
        </div>
    </>
}

export default Register