import AppContext from './AppContext'
import { useContext } from 'react'
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import nts from '../../src/nts.png'
import './NavBar.css'

function NavBar({ username, goToProfile, onSearch, goToReservation, goToHome }) {

  const { onSignOut } = useContext(AppContext)

  return (
    <>
        <Navbar className="justify-content-center" bg='myBlue' variant='dark' sticky='top' expand='lg'>
          <Navbar.Brand className='Nav'>
            <img onClick={() => goToHome()} src={nts} width='84px' height='60px' alt='logo' />{' '}
          </Navbar.Brand>
          <Nav className='w-100 d-flex justify-content-around'>
            <Form className="d-flex" onSubmit={(event) => {
              event.preventDefault()
              const query = event.target.query.value

              onSearch(query)
            }}>
              <FormControl type="search" placeholder="buscar pax" className="me-2" aria-label="Search" name='query' style={{ width: '250px' }} />
              <Button variant="outline-primary" type='submit'><i class="fas fa-search"></i> </Button>
            </Form>
            <Button variant="outline-primary" onClick={goToReservation}>Nueva Reserva <i class="fas fa-plus-circle"></i></Button>
            <Nav.Item>
            </Nav.Item>
            <Nav.Item>
            </Nav.Item>
            <Nav.Item className='d-flex'>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={goToProfile}>Perfil</Dropdown.Item>
                  <Dropdown.Item onClick={onSignOut}>Cerrar sesion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Nav.Item>
          </Nav>
        </Navbar>
    </>
  )
}
export default NavBar
