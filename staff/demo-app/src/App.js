import { useState, useEffect } from 'react'
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PostSignUp from "./components/PostSignUp";
import Feedback from "./components/Feedback";
import Spinner from "./components/Spinner";

// Logger
import logger from './utils/logger';

// Logic Business
import {
  signinUser,
  signupUser,
  retrieveUser
} from "./logic";


function App() {
  logger.debug('App -> render')
  const [view, setView] = useState(sessionStorage.token ? 'home' : 'landing')
  const [user, setUser] = useState(null)
  const [spinner, setSpinner] = useState(sessionStorage.token ? true : false)
  const [feedback, setFeedback] = useState(null)
  const [level, setLevel] = useState(null)

  useEffect(() => {
    logger.debug('App -> useEffect')
    if (sessionStorage.token) {
      try {
        retrieveUser(sessionStorage.token, (error, _user) => {
          if (error) {
            hideSpinner()
            deleteToken()
            goToLanding()
            showFeedback(error.message)
            return
          }
          const user = _user.username
          goToHome()
          setUser(user)
          hideSpinner()
        })
      } catch ({ message }) {
        hideSpinner()
        deleteToken()
        goToLanding()
        showFeedback(message, 'warn')
      }
    }
  }, [])

  // Go to ..
  const goToSignIn = () => setView('signin')
  const goToSignUp = () => setView('signup')
  const goToLanding = () => setView('landing')
  const goToHome = () => setView('home')
  const goToPostSignUp = () => setView('postsignup')

  // Delete Token
  const deleteToken = () => delete sessionStorage.token

  // Spinner on | off
  const showSpinner = () => setSpinner(true)
  const hideSpinner = () => setSpinner(false)

  // Feedback
  const acceptFeedback = () => setFeedback(null)

  const showFeedback = (message, level = 'error') => {
    setFeedback(message)
    setLevel(level)
  }

  // Logic Functions
  const login = (username, password) => {
    showSpinner()
    try {
      signinUser(username, password, (error, _token) => {
        if (error) {
          hideSpinner()
          showFeedback(error.message)
          return
        }
        sessionStorage.token = _token
        try {
          retrieveUser(sessionStorage.token, (error, _user) => {
            if (error) {
              hideSpinner()
              showFeedback(error.message)
              return
            }
            const user = _user.username
            hideSpinner()
            setUser(user)
            goToHome()
          })
        } catch ({ message }) {
          hideSpinner()
          showFeedback(message, 'warn')
        }
      })
    } catch ({ message }) {
      hideSpinner()
      showFeedback(message, 'warn')
    }
  }

  const register = (name, username, password) => {
    showSpinner()
    try {
      signupUser(name, username, password, (error) => {
        if (error) {
          hideSpinner()
          showFeedback(error.message)
          return
        }
        hideSpinner()
        goToPostSignUp()
      })
    } catch ({ message }) {
      hideSpinner()
      showFeedback(message, 'warn')
      return
    }
  }

  return (<>
    {view === 'landing' && <Landing onSignIn={goToSignIn} onSignUp={goToSignUp} />}

    {view === 'signin' && <SignIn onSignUp={goToSignUp} onSubmitSignIn={login} />}

    {view === 'signup' && <SignUp onSignUp={register} onSignIn={goToSignIn} />}

    {view === 'postsignup' && <PostSignUp onSignIn={goToSignIn} onLanding={goToLanding} />}

    {view === 'home' && <Home
      myUserName={user}
      goToLanding={goToLanding}
      showSpinner={showSpinner}
      hideSpinner={hideSpinner}
      showFeedback={showFeedback} />}

    {feedback && <Feedback level={level} message={feedback} onAccept={acceptFeedback} />}

    {spinner && <Spinner />}

  </>)
}
export default App;

/*
    App
      Landing
      SignUp
      SignIn
      Search
      Home
        HeaderUser
        Profile
          UpdatePassword
          Unregister
        Search
        Results
        Details
*/