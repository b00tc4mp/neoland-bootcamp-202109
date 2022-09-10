import { Button, Navbar, Toast, Container, Nav, Col, Row, Card, Image, Form } from 'react-bootstrap'
import Register from '../components/Register'
import Login from '../components/Login'
import React, { useState, useEffect } from 'react'
import nts from './../assets/nts.png'
import './Landing.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.css'
import Hero from '../components/Hero'
import CardSubtitle from '../components/CardSubtitle'
import { Link, animateScroll as scroll } from "react-scroll";
import { useForm, ValidationError } from '@formspree/react';

function Landing({ goToHome }) {
  const [modalRegister, setModalRegister] = useState(false);
  const handleCloseRegister = () => setModalRegister(false);
  const handleShowRegister = () => setModalRegister(true);

  const [modalLogin, setModalLogin] = useState(false);
  const handleCloseLogin = () => setModalLogin(false);
  const handleShowLogin = () => setModalLogin(true);

  const [state, handleSubmit] = useForm("mzboadao");

  const [show, setShow] = useState(false)

  useEffect(() => {
    Aos.init({ duration: 1300 })
  }, [])

  return <>
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Image onClick={() => scroll.scrollToTop()}
            src={nts}
            width='84px'
            height='58px'

            className="d-inline-block align-top cursor"
            alt="Nts logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link}
              activeClass=""
              to="cardsubtitle"
              spy={true}
              smooth={true}
              offset={-100}
              duration={400}
              >Servicios
            </Nav.Link>
            <Nav.Link as={Link} onClose
              activeClass=""
              to="cardgroup"
              spy={true}
              smooth={true}
              offset={-200}
              duration={500}
            >Tarifarios
            </Nav.Link>
            <Nav.Link as={Link} onClose
              activeClass=""
              to="contact"
              spy={true}
              smooth={true}
              offset={-200}
              duration={500}
            >Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="" onClick={handleShowRegister}>Registrar Agencia</Nav.Link>
            <Nav.Link href="" onClick={handleShowLogin}>Iniciar Sesion </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Hero
      imageSrc="https://picsum.photos/id/450/1000/500"
      title="NIEVA TRAVEL SERVICES"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      text2="Optio, blanditiis."
      buttonText='Quienes somos'
      onClick={() => { }}

    />

    <CardSubtitle
      imageSrc='https://via.placeholder.com/950x270.png'
      title="Lorem ipsum dolor sit."
      text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius neque omnis necessitatibus esse culpa quaerat!"
    />

    <Container>
      <h4 className='my-5'>Quienes somos</h4>
      <Row xs={1} md={1} lg={3} className="g-2 pb-5">
        <Col>
          <Card id='cardgroup' data-aos="fade-up" className='border-dark rounded'>
            <Card.Img className='rounded' variant="top" src="https://picsum.photos/id/267/800/350/" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card >
        </Col>
        <Col>
          <Card data-aos="fade-up" className='border-dark rounded'>
            <Card.Img className='border  rounded' variant="top" src="https://picsum.photos/id/244/800/350/" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
                contentasdasdasdas.{''}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card >
        </Col>
        <Col>
          <Card data-aos="fade-up" className='border border-dark rounded'>
            <Card.Img className='border border-light rounded' variant="top" src="https://picsum.photos/id/255/800/350/" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. Th
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>

        </Col>
      </Row>
    </Container>
    <Container>
      <h4>Formulario de contacto</h4>
      <Row xs={1} md={2} xl={3}>
        <Col>
        <Form id='contact' onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" id="email" name="email" placeholder="Email" required />
          </Form.Group>
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          <Form.Group className="mb-3">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" id="message"
              name="message"
              placeholder="Message" rows={7} required />
          </Form.Group>
          <Button type="submit" onClick={() => setShow(true)} disabled={state.submitting}>Send</Button>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src={nts}
                width='30px'
                height='22px'
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Email enviado</strong>
            </Toast.Header>
            <Toast.Body>Gracias por contactarnos, nos pondremos en contacto a la brevedad</Toast.Body>
          </Toast>

        </Form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>

    <footer className='py-4 mt-5 bg-dark' data-aos="fade-zoom-in"
      data-aos-easing="ease-out-cubic"
      data-aos-delay="50"
      data-aos-offset="0"
      data-aos-duration="1800" >
      <Container className='d-flex  justify-content-center align-items-center'>
        <Button variant='outline-dark'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-envelope mx-1" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
        </svg>
        </Button>
        <Button variant='outline-dark'> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-facebook mx-1" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
        </svg>

        </Button>
        <Button variant='outline-dark'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-instagram mx-1" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
          </svg>
        </Button>

      </Container>
      <p className='text-white d-flex justify-content-center'>Derechos de autor 2022 ©</p>
    </footer>

    <Register handleClose={handleCloseRegister} modalRegister={modalRegister} />
    <Login handleClose={handleCloseLogin} modalLogin={modalLogin} goToHome={goToHome} />
  </>
}

export default Landing