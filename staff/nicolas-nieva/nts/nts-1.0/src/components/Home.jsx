import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Reservations from './Reservations'
import ReservationDetail from './ReservationDetail'
import Profile from './Profile'
import AppContext from './AppContext'
import NewReservation from './NewReservation'
import NavBar from './NavBar'
import Results from './Results'
import { retrieveUser } from '../logic/index'
import ModifyReservation from './ModifyReservation'
import DeleteReservation from './DeleteReservation'
import AddNoteToReservation from './AddNoteToReservation'


function Home({ showDetails }) {
  const { onFlowStart, onFlowEnd, onModal, onSignOut } = useContext(AppContext)

  const [username, setUsername] = useState(null)

  const [query, setQuery] = useState({})

  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { token } = sessionStorage

    if (token) {
      try {
        onFlowStart()

        const user = await retrieveUser(token)

        const { username } = user

        setUsername(username)

        onFlowEnd()
      } catch ({ message }) {
        onFlowEnd()

        onModal()

        onSignOut()
      }
    }
  }, [])

  const search = (query) => {
    setQuery(query)
    navigate(`/search?q=${query}`)
  }

  const goToItem = (id) => {
    navigate(`/reservations/${id}`)
  }

  const goToProfile = () => {
    navigate('/profile')
  }

  const goToHome = () => {
    navigate('/')
  }

  const goToReservation = () => {
    navigate('/newreservation')
  }

  const goToModify = (id) => {
    navigate(`/modifyreservation/${id}`)
  }

  const goToDelete = (id) => {
    navigate(`/deletereservation/${id}`)
  }
  const goToAddNotes = (id) => {
    navigate(`reservation/addnote/${id}`)
  }

  return (
    <>
      <NavBar
        username={username}
        goToProfile={goToProfile}
        onSearch={search}
        query={query}
        goToReservation={goToReservation}
        goToHome={goToHome}
      />

      <Routes>
        <Route
          path='/'
          element={
            <Reservations
              goToItem={goToItem}
            />
          } x
        />

        <Route path='/profile' element={<Profile goToHome={goToHome} />} />

        <Route
          path='/reservations/:id'
          element={<ReservationDetail goToHome={goToHome} goToModify={goToModify} goToDelete={goToDelete} goToAddNotes={goToAddNotes} />}
        />

        <Route
          path='/newreservation'
          element={<NewReservation goToHome={goToHome} />}
        />

        <Route
          path='/modifyreservation/:id'
          element={<ModifyReservation goToHome={goToHome} />}
        />

        <Route
          path='/deletereservation/:id'
          element={<DeleteReservation goToHome={goToHome} />}
        />

        <Route
          path='/reservation/addnote/:id'
          element={<AddNoteToReservation goToHome={goToHome} />}
        />

        <Route
          path='/search'
          element={<Results goToHome={goToHome} goToItem={goToItem} />}
        />
      </Routes>
    </>
  )
}

export default Home
