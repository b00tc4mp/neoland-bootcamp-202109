import React from 'react'
import { useState, useEffect } from 'react'
import Home from './Home'
import Landing from './Landing'
import SignUp from './SignUp'
import PostSignUp from './PostSignUp'
import SignIn from './SignIn'
import Modal from './Modal'
import AppContext from './AppContext'

function App() {

    const [view, setView] = useState( sessionStorage.token ? 'home' : 'landing' )
    const [modal, setModal] = useState( { state: false, message: null } )
    const openModal = ( message ) => {
                setModal( { state: true, message } )
            }

    const resetTokenAndGoToLanding = () => {
        delete sessionStorage.token

        setView( 'landing' )
    }

    const goToSignIn = () => setView( 'signin' )

    const goToSignUp = () => setView( 'signup' )

    const goToPostSignUp = () => setView( 'post-signup' )

    const goToHome = () => setView( 'home' )

    const closeModal = () => setModal( { state: false } )

    return <>
        <AppContext.Provider value={{
            onGoHome: goToHome,
            onOpenModal: openModal
        }}>

            {view === 'landing' && <Landing
                onSignIn={goToSignIn}
                onSignUp={goToSignUp}
            />}

            {view === 'signup' && <SignUp onSignedUp={goToPostSignUp} onSignIn={goToSignIn} />}

            {view === 'post-signup' && <PostSignUp onSignIn={goToSignIn} />}

            {view === 'signin' && <SignIn onSignedIn={goToHome} onSignUp={goToSignUp} />}

            {view === 'home' &&
                <Home onSignOut={resetTokenAndGoToLanding} onAuthError={resetTokenAndGoToLanding} />}
            {modal.state && 
                <Modal message={modal.message} onCloseModal={closeModal}></Modal>}
        </AppContext.Provider>
    </>
}

export default App
