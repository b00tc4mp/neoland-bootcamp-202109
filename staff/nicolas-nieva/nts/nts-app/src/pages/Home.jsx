import NavBar from "../components/NavBar"
import Reservations from "../components/Reservations"
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { retrieveUser } from './../logic'
import AppContext from './../components/AppContext';
import NewReservation from "../components/NewReservation"
import ReservationDetail from "../components/ReservationDetail"
import Profile from "./Profile"
import Results from "./../components/Results"


function Home() {
    const { showModalFeedback, showLoading, hideLoading, onSignOut } = useContext(AppContext);
    
    const [reservation, setReservation] = useState({}); 
    const [newReservation, setNewReservation] = useState(false);
    const handleCloseNewReservation = () => setNewReservation(false);
    const handleShowNewReservation = () => setNewReservation(true);

    const [username, setUsername] = useState(null)
    const [user, setUser] = useState({})
    const [query, setQuery] = useState({})

    const navigate = useNavigate()

    const onSearch = (query) => {
        setQuery(query)
        navigate(`/search?q=${query}`)
      }

      const goToItem = (id) => {
        navigate(`/reservations/${id}`)
      }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const { token } = sessionStorage
        if (token) {
            try {
                showLoading()

                const user = await retrieveUser(token)

                setUser(user)

                const { username } = user

                setUsername(username)
                hideLoading()

            } catch ({ message }) {
                hideLoading()
                showModalFeedback('Error', message, 'danger')
                onSignOut()


            }
        }
    }, [])

    return <>
        <NavBar username={username} handleShowNewReservation={handleShowNewReservation} onSearch={onSearch} query={query}   />
        <NewReservation handleCloseNewReservation={handleCloseNewReservation} newReservation={newReservation} setReservation={setReservation} />
        <Routes>
            <Route path='/'>
            <Route path='reservations' element={<Reservations reservation={reservation} /> } />
            <Route path='reservations/:id' element={<ReservationDetail />} /> 
            <Route path='profile' element={<Profile user={user} setUser={setUser} /> } />
            <Route path='/search' element={<Results goToItem={goToItem}  />} />
            </Route>
        </Routes>
    </>
}

export default Home