import { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import { retrieveReservations } from '../logic'
import 'bootstrap/dist/css/bootstrap.css'
import { ListGroup } from 'react-bootstrap'

function Reservations({goToItem}) {
  const { onFlowStart, onFlowEnd, onModal} = useContext(AppContext);
  const [reservations, setReservations] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { token } = sessionStorage;

    try {
        onFlowStart()
      const reservations = await retrieveReservations(token);

      setReservations(reservations);

      onFlowEnd();
    } catch ({ message }) {
      onFlowEnd();

      onModal();

    }
  },['No tienes reservas creadas']);

  
  function formatDate (){
  let date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  
  }

  return (
    <>
    {/* <Button onClick={() => goToReservation()}>Nueva Reserva</Button> */}
      <div className='list-reservations'>
        <ListGroup horizontal>
          {reservations.map(({ id, pax, quantity, from, until, state }) => (
            <ListGroup.Item className='' key={id} onClick={() => goToItem(id)}>
              <ListGroup.Item variant="info">Pasajero: {pax} x {quantity} </ListGroup.Item>
              <ListGroup.Item variant="info">In: {from.slice(0,9)}</ListGroup.Item>
              <ListGroup.Item variant="info">Out: {until.slice(0,9)} </ListGroup.Item>
              <ListGroup.Item variant="info">Estado: {state}</ListGroup.Item>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Reservations
