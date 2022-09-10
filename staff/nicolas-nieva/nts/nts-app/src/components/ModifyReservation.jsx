import AppContext from './AppContext';
import { useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import {modifyReservation} from './../logic'


function ModifyReservation({ modifyReservationModal, handleCloseModifyReservation, id, setReservation}) {
    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext)

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: { pax: { value: pax }, quantity: { value: quantity }, product: { value: product }, from: { value: from },
            until: { value: until }, agent: { value: agent } } } = event

        const reservation = {
            pax,
            quantity,
            product,
            from,
            until,
            agent,
        }

        try {
            showLoading()

            await modifyReservation(sessionStorage.token, reservation, id)

            showModalFeedback('Modificar reserva', 'Reserva Modificada con exito', 'primary')

            setReservation (reservation)

            handleCloseModifyReservation ()

            hideLoading()
        } catch ({ message }) {
            hideLoading()

            showModalFeedback('Error', message, 'danger')
        }
    }


return <>
    <Modal
        show={modifyReservationModal}
        onHide={handleCloseModifyReservation}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Modificar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="text"
                    name="pax"
                    id="pax"
                    placeholder="nombre del pasajero"
                />
                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="number"
                    name="quantity"
                    id="username"
                    placeholder="nro de pasajeros"
                />
                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="text"
                    name="product"
                    id="product"
                    placeholder="producto"
                />
                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="date"
                    name="from"
                    id="from"
                    placeholder="In"
                />
                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="date"
                    name="until"
                    id="until"
                    placeholder="Out"
                />

                <Form.Control style={{ width: '210px', margin: '20px auto' }}
                    className="field"
                    type="text"
                    name="agent"
                    id="agent"
                    placeholder="nombre de agente"
                />
                <Modal.Footer>
                    <Button style={{ width: '210px', margin: '20px auto' }} type='submit' variant="primary">Modificar Reserva</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
</>
}

export default ModifyReservation