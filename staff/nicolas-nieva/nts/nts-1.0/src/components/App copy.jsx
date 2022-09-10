import React from "react";
import {useState, useEffect} from "react";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import PostSignUp from "./PostSignUp";
import Spinner from "./Spinner";
import Modal from "./Modal";

// Logic Business
import {
  signinUser,
  retrieveUser,
} from "../logic/index"


function App () {
      const [view, setView] = useState (sessionStorage.token ? 'home' : 'landing')
      const [username, setUsername] = useState (null)
      const [spinner, setSpinner] = useState (sessionStorage.token ? true : false )
      const [modal, setModal] = useState(null)
     
      useEffect(() => {
        const { token } = sessionStorage 
        showSpinner ()
        if (token) {
            try {
                retrieveUser(token, (error, user) => {
                    if (error) {
                       
                      showModal(error.message)

                      onSignOut()
  
                        hideSpinner()

                        return
                    }
                    hideSpinner()
                    const {username} = user

                    setView('home')
                    setUsername(username)
                })
            } catch ({ message }) {
                showModal(message)
                onSignOut()
                hideSpinner()

                return
            }
        }
        hideSpinner()
    }, [])

  // Go to ..
  const goToSignIn = () => setView('signin')
  const goToSignUp = () => setView('signup')
  const goToLanding = () => setView('landing')
  const onSignOut = () => {
    goToLanding()
    resetToken()
  }
  const goToPostSignUp = () => setView('postsignup')
  const showSpinner = () => setSpinner (true)
  const hideSpinner = () => setSpinner (false)

  const showModal = (message) => setModal(message)
  const acceptModal = () => setModal(null)

  // Delete Token
  
  const resetToken = () => delete sessionStorage.token

  // Logic Functions
  
  const login = (username, password) => {
    showSpinner()
    try {
      signinUser(username, password, (error, _token) => {
        if (error) {
          
          hideSpinner()
          showModal (error.message)
          return
        } else {
          hideSpinner()
          sessionStorage.token = _token
        }
        try {
          retrieveUser(_token, (error, user) => {
            if (error) {
              showModal(error.message)
              hideSpinner()
              return
            }
            const {username} = user
            // const username = user.usarname
            setView('home')
            setUsername (username)
            hideSpinner()
          })
        } catch (error) {
          showModal(error.message)
          hideSpinner()
        }
      })
    } catch (error) {
      showModal(error.message)
      hideSpinner()
      return
    }
  }

    return (<>
      {view === 'landing' && <Landing
        onSignIn={goToSignIn}
        onSignUp={goToSignUp}
      />}

      {view === 'signin' && <SignIn onSignUp={goToSignUp} onSubmitSignIn={login} />}

      {view === 'signup' && <SignUp goToPostSignUp={goToPostSignUp} onSignIn={goToSignIn} />}

      {view === 'postsignup' && <PostSignUp onSignIn={goToSignIn} />}

      {view === 'home' && <Home username={username} 
        onSignOut={onSignOut}
        showSpinner = {showSpinner} 
        hideSpinner={hideSpinner} 
         showModal={showModal} />}

      {modal && <Modal  message={modal} onAccept={acceptModal} showModal = {showModal} />}

      {spinner && <Spinner  />}  
    </>)
}
export default App;

/*
    App
      Landing
      SignUp
      SignIn
      Search
      Profile
      UpdatePassword
      Unregister
      Landing
      Home
        Search
        Results
        Details

*/