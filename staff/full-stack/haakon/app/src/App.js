import { useState } from 'react'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

import Spinner from './components/Spinner'
import Modal from './components/Modal'

import AppContext from './context/AppContext'

function App() {
  const [view, setView] = useState(sessionStorage.token ? 'home' : 'landing')
  const [spinner, setSpinner] = useState(sessionStorage.token ? true : false)
  const [modal, setModal] = useState(null)
  const [level, setLevel] = useState(null)

  const goToLanding = () => setView('landing')
  const goToRegister = () => setView('register')
  const goToLogin = () => setView('login')
  const goToHome = () => setView('home')

  const showSpinner = () => setSpinner(true)
  const hideSpinner = () => setSpinner(false)

  const acceptModal = () => setModal(null)

  const showModal = (message, level = 'error') => {
    setModal(message)
    setLevel(level)
  }

  const resetTokenAndGoToLanding = () => {
    delete sessionStorage.token
    setView('landing')
    setSpinner(false)
  }

  return <>
    <AppContext.Provider value={{
      showSpinner,
      hideSpinner,
      showModal
    }}>
      {view === 'landing' && <Landing goToRegister={goToRegister} goToLogin={goToLogin} />}

      {view === 'register' && <Register goToLogin={goToLogin} />}

      {view === 'login' && <Login goToHome={goToHome} goToRegister={goToRegister} />}

      {view === 'home' && <Home goToLanding={goToLanding} resetTokenAndGoToLanding={resetTokenAndGoToLanding} />}

      {spinner && <Spinner />}

      {modal && <Modal level={level} message={modal} onAccept={acceptModal} />}
    </AppContext.Provider>
  </>
}

export default App