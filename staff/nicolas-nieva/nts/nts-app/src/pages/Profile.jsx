// import AppContext from './AppContext';
import { useContext, useState } from 'react';
import { Button, Form, Container, Col, Row, Card } from 'react-bootstrap'
import { updateUserPassword } from './../logic'
import AppContext from './../components/AppContext';
import { useNavigate } from 'react-router-dom'
import ChangePassword from '../components/ChangePassword';
// import './Profile.css' 

function Profile({ user, setUser }) {
  const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext)

  const [modalChangePassword, setChangePassword] = useState(false)
  const handleShowModalChangePassword = () => setChangePassword(true)
  const handleCloseModalChangePassword = () => setChangePassword(false)

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()

    const { target: { name: { value: name }, email: { value: email },
      address: { value: address }, phone: { value: phone }, province: { value: province },
      location: { value: location }, country: { value: country } } } = event

    const user = {
      name,
      email,
      address,
      phone,
      province,
      location,
      country,
    }
    try {
      showLoading()

      await updateUserPassword(sessionStorage.token, user)

      event.target.reset()

      setUser(user)

      showModalFeedback('Modificar Perfil', 'Datos Modificados', 'primary')

      hideLoading()

    } catch ({ message }) {
      hideLoading()

      showModalFeedback('Error', message, 'danger')
    }
  }

  return <>
    <Card>
    <Container >
      <p className='h2'>Perfil</p>
      <Form  onSubmit={handleSubmit}>
        <Row className="test mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nombre Agencia</Form.Label>
            <Form.Control name='name' type="text" defaultValue={user.name} />
          </Form.Group>

          <Form.Group minlength='1' as={Col} controlId="formGridPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' type="email" defaultValue={user.email} />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Direccion</Form.Label>
            <Form.Control name='address' type='text' defaultValue={user.address} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Telefono</Form.Label>
            <Form.Control name='phone' defaultValue={user.phone} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Provincia</Form.Label>
            <Form.Control name='province' defaultValue={user.province} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control name='location' defaultValue={user.location} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Pais</Form.Label>
            <Form.Control name='country' defaultValue={user.country} />
          </Form.Group>
        </Row>

        <Button className='mb-4' variant="outline-primary" type="submit"> Modificar datos agencia</Button>
      </Form>
      <Button variant="primary" className='me-4 my-1' onClick={() => navigate(`/reservations`)}>Volver a home</Button>
      <Button variant="primary" onClick={handleShowModalChangePassword}>Cambiar contraseña</Button>
    </Container>
    <ChangePassword handleCloseModalChangePassword={handleCloseModalChangePassword} modalChangePassword={modalChangePassword} />
    </Card>

  </>
}


export default Profile