import AppContext from './AppContext';
import { Button, Modal, Form } from 'react-bootstrap'
import { updateUserPassword} from './../logic'
import { useContext } from 'react';

function ChangePassword({ modalChangePassword, handleCloseModalChangePassword }) {
    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext)
    
    const handleSubmit = async event => {
        event.preventDefault()
        debugger
        const oldPassword = event.target.oldPassword.value
        const password = event.target.password.value


        const user = {
            oldPassword,
            password
        }

        try {
            showLoading()
            await updateUserPassword (sessionStorage.token, user)

            showModalFeedback('Modificar Datos Agencia', 'Datos Modificados', 'success' )

            handleCloseModalChangePassword ()

            hideLoading()

        } catch (error) {
            hideLoading()
            showModalFeedback('Modificar Datos Agencia', 'Asegurarse de que los datos sean correctos', 'danger')
        }

    }

    return <>
        <Modal
            show={modalChangePassword}
            onHide={handleCloseModalChangePassword}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title >Modificar Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        type='password'
                        className='mb-2'
                        name='oldPassword'
                        id='oldPassword'
                        placeholder='contraseña'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='mb-2'
                        type='password'
                        name='password'
                        id='password'
                        placeholder='nueva contraseña'
                    />

                    <Modal.Footer>
                        <Button style={{ width: '210px', margin: '20px auto' }} type='submit' variant="primary">Aceptar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

export default ChangePassword