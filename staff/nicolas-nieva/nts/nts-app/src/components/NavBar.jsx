import AppContext from './AppContext'
import { useContext } from 'react'
import { Navbar, Nav, Button, Form, FormControl, NavDropdown, Container } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import nts from './../assets/nts.png'
import './NavBar.css'

function NavBar({ handleShowNewReservation, username, onSearch }) {

  const { onSignOut } = useContext(AppContext)

  const navigate = useNavigate()

  const goToProfile = () => {
    navigate('profile')
  }



  return (
    <>
    
      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Link to='/reservations'>
            <Navbar.Brand>
              <img
                src={nts}
                width='84px'
                height='58px'
                className="d-inline-block align-top ms-lg-5 ms-2"
                alt="Nts logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
          <Form id="collasible-nav-dropdown" className="d-flex align-items-center" onSubmit={(event) => {
            event.preventDefault()
            const query = event.target.query.value

            onSearch(query)
          }}>
            <FormControl style={{maxWidth:'230px'}}
              type="search"
              placeholder="buscar pax"
              className="me-2"
              aria-label="Search"
              name='query'
            />
            <Button variant="outline-success" type='submit'>Buscar</Button>
          </Form>
          <Button className='ms-1 mt-2 mt-sm-0 mt-lg-0 mt-xl-0'  variant="outline-primary" onClick={handleShowNewReservation}>Nueva Reserva</Button>

          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="me-auto">
            </Nav>
            <Nav  >
              <NavDropdown className='me-5' title={username} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={goToProfile} >Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onSignOut}>Cerrar Sesion</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
      <Outlet />


    </>
  )
}
export default NavBar

  // < Navbar className = "justify-content-center" bg = 'myBlue' variant = 'dark' sticky = 'top' expand = 'lg' >
  //       <Navbar.Brand className='Nav'>
  //         <img onClick={() => goToHome()} src={nts} width='84px' height='60px' alt='logo' />
  //       </Navbar.Brand>
  //       <Nav className='w-100 d-flex justify-content-around'>
  //         <Form className="d-flex" onSubmit={(event) => {
  //           event.preventDefault()
  //           const query = event.target.query.value

  //           onSearch(query)
  //         }}>
  //           <FormControl type="search" placeholder="buscar pax" className="me-2" aria-label="Search" name='query' style={{ width: '250px' }} />
  //           <Button variant="outline-primary" type='submit'><i class="fas fa-search"></i> </Button>
  //         </Form>
  //         <Button variant="outline-primary" onClick={goToReservation}>Nueva Reserva <i class="fas fa-plus-circle"></i></Button>
  //         <Nav.Item>
  //         </Nav.Item>
  //         <Nav.Item>
  //         </Nav.Item>
  //         <Nav.Item className='d-flex'>
  //           <Dropdown>
  //             <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
  //               {username}
  //             </Dropdown.Toggle>
  //             <Dropdown.Menu>
  //               <Dropdown.Item onClick={goToProfile}>Perfil</Dropdown.Item>
  //               <Dropdown.Item onClick={onSignOut}>Cerrar sesion</Dropdown.Item>
  //             </Dropdown.Menu>
  //           </Dropdown>

  //         </Nav.Item>
  //       </Nav>
  //     </Navbar >