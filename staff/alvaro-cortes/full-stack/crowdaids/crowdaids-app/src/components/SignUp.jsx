import React from 'react'
import logger from '../logger'
import { useContext, useState } from 'react'
import AppContext from './AppContext'
import { registerUser } from '../logic'
import cablue from '../assets/cablue.png'

function SignUp() {
    logger.info('SignUp -> render')

    const { showSpinner, hideSpinner, showModal, goToSignIn } = useContext(AppContext)

    const [errorInput, setErrorInput] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
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
            <form className='register container container--vertical' onSubmit={async event => {
                event.preventDefault()
                
                const { target: { reset, name: { value: name }, username: { value: username }, email: { value: email }, password: { value: password } } } = event

                const user = {
                    name,
                    username,
                    email,
                    password
                }

                try {
                    showSpinner()
                    await registerUser(user)
                    hideSpinner()
                    showModal('Éxito', 'Cuenta creada satisfactoriamente')
                    goToSignIn()
                } catch ({ message }) {
                    hideSpinner()
                    setErrorMessage(message)
                    setErrorInput(true)
                }

                event.target.reset()
            }}>
                <h3 className='titles'>Registro</h3>
                <h4 style={{ display: `${errorInput ? 'inline-block' : 'none'}`, color: 'rgb(187, 40, 40)' }}>{ errorMessage }</h4>
                <input className={`${currentInput.target >= 1 && currentInput.name === 'name' && !errorInput ? 'texting ': ''} ${errorInput ? 'error' : ''} `} type='text' placeholder='Nombre y Apellido' id='name' onChange={(e) => onChange(e, 'name')}></input>
                <input className={`${currentInput.target >= 1 && currentInput.name === 'email' && !errorInput ? 'texting ': ''} ${errorInput ? 'error' : ''} `} type='email' placeholder='Email' id='email' onChange={(e) => onChange(e, 'email')}></input>
                <input className={`${currentInput.target >= 1 && currentInput.name === 'username' && !errorInput ? 'texting ': ''} ${errorInput ? 'error' : ''} `} type='text' placeholder='Usuario' id='username' onChange={(e) => onChange(e, 'username')}></input>
                <input className={`${currentInput.target >= 1 && currentInput.name === 'password' && !errorInput  ? 'texting ': ''} ${errorInput ? 'error' : ''} `} type='password' placeholder='Contraseña' id='password' onChange={(e) => onChange(e, 'password')}></input>

                <div className='container'>
                    <button type='submit' className='button'>Crear cuenta</button>
                </div>
                <hr />
                <div>
                    <button type='button' className='button button--grey' onClick={() => goToSignIn()}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
}

export default SignUp