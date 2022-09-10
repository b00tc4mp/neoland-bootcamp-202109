import { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext'
import { retrieveReservation } from '../logic'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Button, ListGroup } from 'react-bootstrap'

function ReservationDetail({ goToHome, goToModify, goToDelete, goToAddNotes }) {
  const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext)

  const [reservation, setReservation] = useState([])
  const { id } = useParams()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { token } = sessionStorage

    try {
      onFlowStart()

      const reservation = await retrieveReservation(token, id)

      setReservation([reservation])

      onFlowEnd()
    } catch ({ message }) {
      onFlowEnd()

      onModal(message)
    }
  }, [])
  console.log(reservation)

  // let from = reservation.from
  // from = from.toString ()
  // from = from.slice(0,9)
  // let until = reservation.until
  // until = until.toString ()
  // until = until.slice(0,9)

  return (
    <div className='home__detail container container--vertical'>
      <ListGroup>
        <ListGroup.Item variant='primary'>
          Pax: {reservation[0]?.pax} x {reservation[0]?.quantity}
        </ListGroup.Item>
        <ListGroup.Item variant='primary'>Producto: {reservation[0]?.product}</ListGroup.Item>
        <ListGroup.Item variant='primary'>In: {reservation[0]?.from}</ListGroup.Item>
        <ListGroup.Item variant='primary'>Out: {reservation[0]?.until}</ListGroup.Item>
        <ListGroup.Item variant='primary'>Estado: {reservation[0]?.state}</ListGroup.Item>
        <ListGroup.Item variant='primary'>Agente: {reservation[0]?.agent}</ListGroup.Item>
        <ListGroup.Item variant='primary'>
          <ul className=''>
            {reservation[0]?.notes.map(({ text, date }) => (
              <ListGroup.Item variant='secondary'
                key={Math.random() * Math.random()} >
               Notas: {text} 
                {/* <span>{date.slice(0, 9)}</span> */}
              </ListGroup.Item>
            ))}
          </ul>
        </ListGroup.Item>
        <div className='container container--vertical container--gapped'>
        <Button onClick={() => goToHome()}><i class="far fa-arrow-alt-circle-left"></i></Button>
        </div>
        <Button className='button' onClick={() => goToModify(id)}>Modificar Reserva</Button>
        <div className='container container--vertical container--gapped'>
        <Button onClick={() => goToDelete(id)}>Cancelar Reserva</Button>
        </div>
        <div className='container container--vertical container--gapped'>
        <Button className='button' onClick={() => goToAddNotes(id)} >Añadir Nota</Button>
        </div>
      </ListGroup>
    </div>
  )
}

export default ReservationDetail
