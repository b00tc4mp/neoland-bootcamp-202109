import { createReservation } from '../logic/index'
import { useContext } from 'react'
import AppContext from './AppContext'
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Form, Card } from 'react-bootstrap'

function NewReservation({ goToHome }) {
  const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext)

  return (
    <>
      <Card.Title className='container container--vertical'>Nueva reserva</Card.Title>
      <form
        className='signup container container--vertical container--gapped'
        onSubmit={async (event) => {
          event.preventDefault()
          event.stopPropagation()

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
            onFlowStart()

            await createReservation(token, reservation)

            onModal('Reserva creada')

            onFlowEnd()
          } catch ({ message }) {
            onFlowEnd()
            onModal(message)
          }

        }}
      >
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='text'
          name='pax'
          id='pax'
          placeholder='nombre del pasajero'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='number'
          name='quantity'
          id='username'
          placeholder='nro de pasajeros'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='text'
          name='product'
          id='product'
          placeholder='producto'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='date'
          name='from'
          id='from'
          placeholder='In'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='date'
          name='until'
          id='until'
          placeholder='Out'
        />

        <Form.Control style={{ width: '300px' }}
          className='field'
          type='text'
          name='province'
          id='province'
          placeholder='provincia'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='text'
          name='agent'
          id='agent'
          placeholder='nombre de agente'
        />
        <Form.Control style={{ width: '300px' }}
          className='field'
          type='text'
          name='note'
          id='note'
          placeholder='nota adicional'
        />

        <div className='container container--vertical container--gapped'>
         <Button type='submit' className='button'>
            Solicitar Reserva
          </Button>
          </div>
          <div className='container container--vertical container--gapped'>
           <Button className='button' onClick={() => goToHome()}>
           <i class="far fa-arrow-alt-circle-left"></i>
          </Button>
        </div>
      </form>
    </>
  )
}

export default NewReservation
