import React from 'react'
import logger from '../logger'
import { useContext, useState } from 'react'
import AppContext from './AppContext'
import { authorizeUser } from '../logic'
import cablue from '../assets/cablue.png'


function SignIn() {
    logger.info('SignIn -> render')

    const { showSpinner, hideSpinner, showModal, goToHome, goToSignUp } = useContext(AppContext)

    const [errorInput, setErrorInput] = useState(false)
    const [currentInput, setCurrentInput] = useState({})

    const onChange = (e, name) => {

        setCurrentInput({
            target: e.currentTarget.value.length,
            name: name 
            })
        setErrorInput(false)
    }

    return <>
        <div className='landing'>
            <div className='logo'>
                <img className='logo--image' src={cablue} alt='' />
            </div>
            <form className='login container container--vertical' onSubmit={async event => {
                event.preventDefault()
                
                const { target: { username: { value: username }, password: { value: password } } } = event
                const user = {
                    username,
                    password
                }

                try {
                    showSpinner()
                    const token = await authorizeUser(user)
                    sessionStorage.token = token

                    hideSpinner()
                    goToHome()
                } catch ({ message }) {
                    hideSpinner()      
                    setErrorInput(true)
                }
                event.target.reset()
            }}>
                <h3 className='titles'>Iniciar Sesión</h3>
                <div className='color'>
                </div><h4 style={{ display: `${errorInput ? 'inline-block' : 'none'}`, color: 'rgb(187, 40, 40)' }}>Usuario y/o contraseña incorrecta</h4>
                <input className={`${errorInput ? 'error' : ''} ${currentInput.target >= 1 && currentInput.name === 'username' ? 'texting ': ''}`} onChange={(e) => onChange(e, 'username')} type='text' placeholder='Usuario' id='username'></input>
                <input className={`${errorInput ? 'error' : ''} ${currentInput.target >= 1 && currentInput.name === 'password' ? 'texting ': ''}`} onChange={(e) => onChange(e, 'password')} type='password' placeholder='Contraseña' id='password'></input>
                <div className='container'>
                    <button className='button'>Iniciar Sesión</button>
                </div>
                <hr />
                <div className='container'>
                    <button className='button button--grey' onClick={() => goToSignUp()}>Crear una cuenta</button>
                </div>
            </form>
        </div>
    </>
}

export default SignIn