import { Component } from 'react'
import logger from '../logger'
import { retrieveUser } from '../logic'
import { signUpUser } from '../logic'
import { signInUser } from '../logic'
import Logo from './Logo'
import Time from './Time'
import Landing from './Landing'
import SignUp from './SignUp'
import PostSignUp from './PostSignUp'
import SignIn from './SignIn'
import Home from './Home'
import Spinner from './Spinner'
import Modal from './Modal'

class App extends Component {
    constructor() {
        logger.debug('App -> constructor')

        super()

        this.state = { 
            view: sessionStorage.token ? '' : 'landing',
            name: null,
            modal: null,
            spinner: sessionStorage.token ? true : false,
            level: 'error'
        }
    }

    componentDidMount() {
        logger.debug('App -> componentDidMount')

        const { token } = sessionStorage
        const { resetTokenAndGoToLanding, showModal } = this

        if (token) {
            try {
                retrieveUser(token, (error, user) => {
                    if (error) {
                        alert(error.message)

                        resetTokenAndGoToLanding()

                        return
                    }

                    var name = user.name

                    this.setState({ 
                        name, 
                        view: 'home', 
                        spinner: false 
                    })
                })
            } catch ({ message }) {
                showModal(message, 'warn')

                resetTokenAndGoToLanding()

                return // Por qué este return?
            }
        }
    }

    resetTokenAndGoToLanding = () => {
        delete sessionStorage.token

        this.setState({ 
            view: 'landing',
            spinner: false 
        })
    }

    
    goToSignUp = () => this.setState({ view: 'signup' })
    
    goToSignIn = () => this.setState({ view: 'signin' })

    showSpinner = () => this.setState({ spinner: true })

    hideSpinner = () => this.setState({ spinner: false })

    goToPostSignUp = () => this.setState({ view: 'post-signup' })

    goToHome = () => this.setState({ view: 'home' })

    showModal = (message, level = 'error') => this.setState({ modal: message, level })

    acceptModal = () => this.setState({ modal: null })

    signUp = (name, username, password) => {
        const { showSpinner, hideSpinner, showModal, goToPostSignUp } = this
        
        showSpinner()

        try {
            signUpUser(name, username, password, error => {
                if (error) {
                    hideSpinner()

                    showModal(error.message)

                    return
                }

                goToPostSignUp()

                hideSpinner()
            })
        } catch ({ message }) {
            hideSpinner()

            showModal(message, 'warn')
        }
    }

    signIn = (username, password) => {
        const { showSpinner, hideSpinner, showModal, goToHome } = this
        
        showSpinner()

        try {
            signInUser(username, password, (error, token) => {
                if (error) {
                    // alert(error.message)
                    hideSpinner()

                    showModal(error.message)

                    return
                }

                sessionStorage.token = token

                try {
                    retrieveUser(token, (error, user) => {
                        if (error) {
                            hideSpinner()

                            showModal(error.message)

                            return
                        }

                        const { name } = user

                        this.setState({ name })

                        goToHome()

                        hideSpinner()
                    })
                } catch ({ message }) {
                    hideSpinner()

                    showModal(message, 'warn')
                }
            })
        } catch ({ message }) {
            hideSpinner()

            showModal(message, 'warn')
        }
    }

    render() {
        logger.debug('App -> render')

        const { goToSignIn, goToSignUp, signUp, signIn, resetTokenAndGoToLanding, showSpinner, hideSpinner, acceptModal, showModal, state: { view, name, spinner, modal, level } } = this
        
        return <>
            <Logo image="./assets/logo.png" text='Demo App' />

            <Time />

            {view === 'landing' && 
            <Landing
                onSignIn={goToSignIn}
                onSignUp={goToSignUp}
            />}

            {view === 'signup' && <SignUp onSignUp={signUp} onSignIn={goToSignIn} />}

            {view === 'post-signup' && <PostSignUp onSignIn={goToSignIn} />}

            {view === 'signin' && <SignIn  onSignIn={signIn} onSignUp={goToSignUp} />}

            {view === 'home' && <Home 
            name={name} 
            onSignOut={resetTokenAndGoToLanding}
            onFlowStart={showSpinner}
            onFlowEnd={hideSpinner}
            onModal={showModal} />}

            {spinner && <Spinner />}

            {modal && <Modal level={level} message={modal} onAccept={acceptModal} />}
        </>
    }
}

export default App