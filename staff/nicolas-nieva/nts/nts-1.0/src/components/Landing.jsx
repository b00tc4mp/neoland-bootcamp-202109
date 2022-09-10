import 'bootstrap/dist/css/bootstrap.css'
import React, { useState, useEffect } from 'react';
import { Button, Navbar, NavDropdown, Container, Nav, Carousel, Modal } from 'react-bootstrap'
import nts from '../../src/nts.png'

function Landing({ onSignIn, onSignUp }) {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    return (
        <>

            <Navbar collapseOnSelect expand="lg" bg="myBlue" variant="dark">
                <Container>
                    <Navbar.Brand href="#home"><img src={nts} width='84px' height='60px' alt='logo' />{' '}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => onSignUp()}>Registrar Agencia</Nav.Link>
                            <Nav.Link onClick={() => onSignIn()}>
                                Iniciar Sesion
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <div className='center_welcome'> */}
                {/* <h1 className="welcome">Welcome</h1> */}
            {/* </div> */}
            {/* <div className="landing container container--vertical container--gapped">
                <Button className="button" onClick={() => onSignUp()}>Registrar Agencia</Button>
                <div className='container--gapped'></div>
                <Button className="button" onClick={() => onSignIn()}>Iniciar Sesion</Button>
            </div> */}

            
            <div><br></br>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"  
                        src="https://picsum.photos/800/400?random=1" width='100px' height='400' alt='logo'
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src='https://picsum.photos/800/400?random=2' width='100px' height='400' alt='logo'
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src='https://picsum.photos/800/400?random=3' width='84px' height='400' alt='logo'
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
            

        </>
    )

}

export default Landing