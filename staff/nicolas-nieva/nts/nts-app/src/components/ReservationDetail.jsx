import { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext'
import { retrieveReservation } from './../logic'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Container, ListGroup, Card } from 'react-bootstrap'
import ModifyReservation from './ModifyReservation'
import DeleteReservationModal from './DeleteReservationModal'
import AddNoteToReservation from './AddNoteToReservation'
import './ReservationDetail.css'


function ReservationDetail() {

    const [reservation, setReservation] = useState({})
    const [note, setNote] = useState([])

    const [modifyReservationModal, setModifyReservation] = useState(false);
    const handleCloseModifyReservation = () => setModifyReservation(false);
    const handleShowModifyReservation = () => setModifyReservation(true);

    const [deleteReservationModal, setDeleteReservation] = useState(false);
    const handleCloseDeleteReservation = () => setDeleteReservation(false);
    const handleShowDeleteReservation = () => setDeleteReservation(true);

    const [addNoteToReservationModal, setAddNoteToReservation] = useState(false);
    const handleCloseAddNoteToReservation = () => setAddNoteToReservation(false);
    const handleShowAddNoteToReservation = () => setAddNoteToReservation(true);

    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);

    const { id } = useParams()
    const navigate = useNavigate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const { token } = sessionStorage

        try {
            showLoading()

            const reservation = await retrieveReservation(token, id)

            setReservation(reservation)

            hideLoading()
        } catch ({ message }) {
            hideLoading()

            showModalFeedback('Error', message, 'danger')
        }
    }, [note])


    const { agent, from, until, notes, pax, product, quantity, state } = reservation
    return <>
    
        <ListGroup className='d-flex text-center'>
            <ListGroup.Item variant='dark'>
                Pax: {pax} x {quantity}
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>Producto: {product}</ListGroup.Item>
            <ListGroup.Item variant='dark'>In: {from ? from.slice(0, 9) : null}</ListGroup.Item>
            <ListGroup.Item variant='dark'>Out: {until ? until.slice(0, 9): null}</ListGroup.Item>
            <ListGroup.Item variant='dark'>Estado: {'required'}</ListGroup.Item>
            <ListGroup.Item variant='dark'>Agente: {agent}</ListGroup.Item>
            <ListGroup.Item variant='dark'>
                <ListGroup className=''>
                    {notes ?
                        notes.map(({ id, text, date }) =>
                            <ListGroup.Item variant='light'
                                key={id} >
                                Notas: {text}
                                <span> {
                                    date ? date.slice(0, 10) : null
                                    }</span>
                            </ListGroup.Item>
                        )
                        :
                        null
                    }
                </ListGroup>
            </ListGroup.Item>
            

        </ListGroup>
        
            <Container className='d-flex flex-column my-4 align-items-center'>
            <Button style={{width: '160px'}}  className="mb-1" onClick={() => navigate(`/reservations`)} >Volver</Button>
            <Button style={{width: '160px'}} onClick={handleShowModifyReservation} className='mb-1 button' >Modificar Reserva</Button>
            <Button style={{width: '160px'}} variant='danger' className='mb-1' onClick={handleShowDeleteReservation}>Borrar Reserva</Button>
            <Button style={{width: '160px'}} onClick={handleShowAddNoteToReservation} className='test button'>Añadir Nota</Button>
            </Container>
        

        <ModifyReservation id={id} modifyReservationModal={modifyReservationModal} handleCloseModifyReservation={handleCloseModifyReservation} setReservation={setReservation} />
        <DeleteReservationModal id={id} deleteReservationModal={deleteReservationModal} handleCloseDeleteReservation={handleCloseDeleteReservation} />
        <AddNoteToReservation id={id} addNoteToReservationModal={addNoteToReservationModal}  handleCloseAddNoteToReservation={handleCloseAddNoteToReservation} setNote={setNote} />

    </>
}

export default ReservationDetail