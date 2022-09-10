import { Button, Modal, Form } from 'react-bootstrap'
import { signupUser } from '../logic'
import AppContext from './AppContext';
import { useContext } from 'react';


function Register({ modalRegister, handleClose}) {
    
     const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);

    

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: { name: { value: name }, username: { value: username }, email: { value: email }, password: { value: password },
            address: { value: address }, phone: { value: phone }, province: { value: province },
            location: { value: location }, country: { value: country } } } = event
            


        const user = {
            name,
            username,
            password,
            email,
            address,
            phone,
            province,
            location,
            country,
        };
        try {
            showLoading()
            
             await signupUser(user)
            handleClose()

            showModalFeedback ('Registro', 'Agencia Registrada Exitosamente', 'outline-primary')
           // event.target.reset()
            hideLoading()
        } catch ({ message }) {
            showModalFeedback('Error', message, 'danger')
            // event.target.password.value.password.reset () TODO que se resetee el password
            hideLoading()

        }
    }
    return <>
        <Modal
            show={modalRegister}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title >Registrarse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        type='text'
                        className='mb-2'
                        name='name'
                        id='name'
                        placeholder='nombre agencia'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='usuario'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='password'
                        name='password'
                        id='password'
                        placeholder='contraseña'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='email'
                        id='email'
                        placeholder='correo electronico'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='address'
                        id='address'
                        placeholder='direccion'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='phone'
                        id='phone'
                        placeholder='telefono'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='province'
                        id='province'
                        placeholder='provincia'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='location'
                        id='location'
                        placeholder='ciudad'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-5'
                        type='country'
                        name='country'
                        id='country'
                        placeholder='pais'
                    />
                    <Modal.Footer>
                        <Button style={{ width: '210px', margin: '20px auto' }} type='submit' variant="primary">Registrar Agencia</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    </>
}

export default Register