import Landing from "./pages/Landing";
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContext from "./components/AppContext";
import { useState } from "react";
import Feedback from "./components/Feedback";
import Loading from "./components/Loading"
import Home from "./pages/Home";

function App() {
  const [view, setView] = useState(sessionStorage.token ? 'home' : 'landing')
  const [modalFeedback, setModalFeedback] = useState(false);
  const [modalFeedbackTitle, setModalFeedbackTitle] = useState('')
  const [modalFeedbackMessage, setModalFeedbackMessage] = useState('');
  const [levelFeedback, setLevelFeedback] = useState('');
  const [loading, setLoading] = useState(false)


  // Go to ..
  const goToHome = () => setView('home')
  const goToLanding = () => setView('landing')
  const onSignOut = () => {
    goToLanding()
    resetToken()
  }

  // Delete Token

  const resetToken = () => delete sessionStorage.token

  const showModalFeedback = (title, message, level) => {
    setModalFeedbackTitle(title)
    setModalFeedbackMessage(message)
    setLevelFeedback(level)
    setModalFeedback(true)
  }

  const handleClose = () => setModalFeedback(false)

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  return <>
    <AppContext.Provider value={{ showModalFeedback, showLoading, hideLoading, onSignOut}}>
      {view === 'home' && <Home />}
      {view === 'landing' && <Landing goToHome={goToHome} />}

      {modalFeedback && <Feedback modalFeedbackTitle={modalFeedbackTitle} modalFeedbackMessage={modalFeedbackMessage}
        levelFeedback={levelFeedback} handleClose={handleClose} modalFeedback={modalFeedback} />}

      {loading && <Loading />}
    </AppContext.Provider>
  </>


}

export default App;
