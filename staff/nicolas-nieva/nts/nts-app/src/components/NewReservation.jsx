import AppContext from './AppContext';
import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import {createReservation} from './../logic'


function NewReservation({newReservation, handleCloseNewReservation, setReservation}) {
    const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);

    const handleSubmit = async (event) => {
    event.preventDefault()
        
          const { token } = sessionStorage

          const pax = event.target.pax.value
          const quantity = event.target.quantity.value
          const product = event.target.product.value
          const from = event.target.from.value
          const until = event.target.until.value
          const agent = event.target.agent.value
          const note = event.target.note.value
          const state = 'required'

          const reservation = {
            pax,
            quantity,
            product,
            from,
            until,
            agent,
            note,
            state,
          }

          try {
            showLoading()
            
            await createReservation(token, reservation)

            showModalFeedback('Nueva Reserva','Reserva creada', 'primary' )

            setReservation(reservation)

            handleCloseNewReservation ()

            hideLoading()

          } catch ({ message }) {
            hideLoading()
            showModalFeedback ('Error', message, 'danger')
          }
        }

    return <>
        <Modal
            show={newReservation}
            onHide={handleCloseNewReservation}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Nueva Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='text'
                        name='pax'
                        id='pax'
                        placeholder='nombre del pasajero'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='number' //  TODO que no pase a negativo
                        name='quantity'
                        min='1'
                        id='username'
                        placeholder='nro de pasajeros'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='text'
                        name='product'
                        id='product'
                        placeholder='producto'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='date'
                        name='from'
                        id='from'
                        placeholder='In'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='date'
                        name='until'
                        id='until'
                        placeholder='Out'
                    />

                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='text'
                        name='province'
                        id='province'
                        placeholder='provincia'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='text'
                        name='agent'
                        id='agent'
                        placeholder='nombre de agente'
                    />
                    <Form.Control style={{ width: '210px', margin: '20px auto' }}
                        className='field'
                        type='text'
                        name='note'
                        id='note'
                        placeholder='nota adicional'
                    />
                    <Modal.Footer>
                        <Button style={{ width: '210px', margin: '20px auto' }} type='submit' variant="primary" >Nueva Reserva</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

export default NewReservation

