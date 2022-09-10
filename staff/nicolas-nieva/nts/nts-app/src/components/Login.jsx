import { Button, Modal, Form } from 'react-bootstrap'
import { authorizeUser } from '../logic'
import AppContext from './AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'


function Login({ modalLogin, handleClose, goToHome }) {
    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);
    
    const navigate = useNavigate()
    

    const handleSubmit = async event => {
        event.preventDefault()
       
        const {target: {username: {value: username}, password: {value:password}}} = event

        const user = {
                
                username,
                password
            };
        try {
            showLoading ()
            const token = await authorizeUser(user)
            
            sessionStorage.token = token;

            handleClose()
            
            navigate('/reservations')
           
            goToHome()

            hideLoading ()

        } catch ({ message }) {
            
            showModalFeedback('Error', message, 'danger')

            hideLoading()
        }
    }
    return <>
        <Modal
            show={modalLogin}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                 <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='usuario agencia'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-4'
                        type='password'
                        name='password'
                        id='password'
                        placeholder='contraseña'
                    /> 
                
                    <Modal.Footer>
                        <Button style={{ width: '210px', margin: '20px auto' }}   type='submit' variant="primary">Iniciar Sesion</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>


    </>
}

export default Login