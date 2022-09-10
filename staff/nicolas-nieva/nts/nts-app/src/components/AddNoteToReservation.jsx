import AppContext from './AppContext';
import { useContext } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import  {addNoteToReservation} from './../logic'

function AddNoteToReservation({addNoteToReservationModal, handleCloseAddNoteToReservation, id, setNote}) {
    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);

    const handleSubmit = async event => {
        event.preventDefault()

        const note = event.target.note.value

        const text = {
            text:note
        }

        try {
            showLoading()

            await addNoteToReservation(sessionStorage.token, text, id)

            showModalFeedback('Añadir Nota', 'Nota añadida', 'primary')

            setNote (note)

            handleCloseAddNoteToReservation()


           hideLoading()
        } catch ({ message }) {
           hideLoading()

            showLoading('Error', message, 'danger')
        }
    
    }


    return <>
    <Modal
        show={addNoteToReservationModal}
        onHide={handleCloseAddNoteToReservation}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Añadir Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <FloatingLabel label="Comentarios" className="mb-2">
                <Form.Control 
                    className="field"
                    type="text"
                    name="note"
                    id="note"
                    as="textarea"
                    placeholder="nombre del pasajero"
                />
                </FloatingLabel>
                <Modal.Footer>
                    <Button style={{margin: '20px auto' }} type='submit' variant="primary">Añadir Nota</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
    
    </>
}

export default AddNoteToReservation