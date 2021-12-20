import { useState } from 'react'
import logger from '../logger'
import SignIn from './SignIn'
import Home from './Home'
import Spinner from './Spinner'
import Feedback from './Feedback'
import { useContext } from 'react'
import AppContext from './AppContext'
import { signInUser } from '../logic'


function App() {
    logger.debug('App -> render')

    const [view, setView] = useState(sessionStorage.token ? 'home' : 'signin')
    const [spinner, setSpinner] = useState(sessionStorage.token ? true : false)
    const [feedback, setFeedback] = useState(null)
    const [level, setLevel] = useState(null)

    const resetTokenAndGoToLanding = () => {
        delete sessionStorage.token

        setView('signin')
        setSpinner(false)
    }

    const goToSignUp = () => setView('signup')

    const showSpinner = () => setSpinner(true)

    const hideSpinner = () => setSpinner(false)

    const acceptFeedback = () => setFeedback(null)

    const showFeedback = (message, level = 'error') => {
        setFeedback(message)
        setLevel(level)
    }

    const goToSignIn = async (username, password) => {

        try {
            showSpinner()

            const token = await signInUser(username, password)

            sessionStorage.token = token

            hideSpinner()

            setView('home')        
            
        } catch ({ message }) {
            hideSpinner()

            showFeedback(message, 'warn')
        }

    }
    
    return <>
        <AppContext.Provider value={{
            onFlowStart: showSpinner,
            onFlowEnd: hideSpinner,
            onFeedback: showFeedback
        }}>

            {view === 'signin' && <SignIn onSignedIn={goToSignIn} x={1} />}

            {view === 'home' && <Home onSignOut={resetTokenAndGoToLanding} onAuthError={resetTokenAndGoToLanding} />}

            {feedback && <Feedback level={level} message={feedback} onAccept={acceptFeedback} />}

            {spinner && <Spinner />}
        </AppContext.Provider>
    </>
}

export default App