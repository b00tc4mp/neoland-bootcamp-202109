import React from "react";
  import {useState} from "react";
import Landing from "./Landing";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import PostSignUp from "./PostSignUp";
import Spinner from "./Spinner";
import Modal from "./Modal";
import AppContext from './AppContext'
import { useNavigate } from 'react-router-dom';


function App () {
      const [view, setView] = useState (sessionStorage.token ? 'home' : 'landing')
      const [spinner, setSpinner] = useState (sessionStorage.token ? true : false )
      const [modal, setModal] = useState(null)
      const navigate = useNavigate();
     
      
  // Go to ..
  const goToHome = () => setView('home')
  
  const goToSignIn = () => setView('signin')

  const goToSignUp = () => setView('signup')

  const goToLanding = () => setView('landing')
  
  const onSignOut = () => {
    navigate ('/')
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
  
    return <>

      <AppContext.Provider value={{
            onFlowStart: showSpinner,
            onFlowEnd: hideSpinner,
            onModal: showModal,
            onSignOut: onSignOut
        }}>

    
      {view === 'landing' && <Landing
        onSignIn={goToSignIn}
        onSignUp={goToSignUp}
      />}

      {view === 'signin' && <SignIn onSignUp={goToSignUp} onSignedIn={goToHome} />}

      {view === 'signup' && <SignUp goToPostSignUp={goToPostSignUp} onSignIn={goToSignIn} />}

      {view === 'postsignup' && <PostSignUp onSignIn={goToSignIn} />}

      {view === 'home' && <Home  onSignOut={onSignOut} />}
      
      {modal && <Modal message={modal} onAccept={acceptModal}  />}

      {spinner && <Spinner  />}  
      </AppContext.Provider>
    </>
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