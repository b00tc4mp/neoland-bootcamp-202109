import { Button, Modal } from 'react-bootstrap'
import AppContext from './AppContext';
import { useContext } from 'react';
import deleteReservation from '../logic/delete-reservation';
import { useNavigate } from 'react-router-dom'


function DeleteReservationModal ({id, deleteReservationModal, handleCloseDeleteReservation}) {

    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);

    const navigate = useNavigate()


    const onDeleteReservation = async () => {

        try {
            showLoading()

            await deleteReservation(sessionStorage.token, id)

            // showModalFeedback ('Cancelar Reserva', 'Reserva Cancelada', 'danger')

            navigate('/reservations')

            hideLoading()
        } catch ({ message }) {
            hideLoading()

            showModalFeedback('Error', message, 'danger')
        }
    }

    return <>
    <Modal show={deleteReservationModal}
        onHide={handleCloseDeleteReservation}
        backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Cancelar Reserva</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Estas seguro ?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleCloseDeleteReservation} variant="primary">Volver</Button>
                <Button variant="danger" onClick={onDeleteReservation} >Borrar Reserva</Button>
            </Modal.Footer>
        </Modal>
    </>

}

export default DeleteReservationModal