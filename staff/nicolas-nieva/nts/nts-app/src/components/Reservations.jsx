import { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import { retrieveReservations } from '../logic'
import 'bootstrap/dist/css/bootstrap.css'
import { ListGroup, ListGroupItem, Container, Row, Col, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Reservations({ reservation }) {
  const { showModalFeedback, showLoading, hideLoading } = useContext(AppContext);
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { token } = sessionStorage;

    try {
      showLoading()
      const reservations = await retrieveReservations(token);
      hideLoading()
      setReservations(reservations);


    } catch ({ message }) {
      hideLoading()
      showModalFeedback('Error Carga', message, 'danger')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation]);

 

  return <Card><Container>
    <Row xs={1} sm={1} md={3} lg={4}>
      {
        reservations && reservations.length ?
          reservations.map(({ id, pax, quantity, from, until, state }) =>
            <Col className='mx-4 my-2' >
              <h3 className='text-center'>Reserva</h3>
              <ListGroup className='text-center'>
                <ListGroup.Item onClick={() => navigate(`/reservations/${id}`)}>
                  <ListGroup.Item variant="info">Pax: {pax} x {quantity} </ListGroup.Item>
                  <ListGroup.Item variant="info">In: {from.slice(0, 9)}</ListGroup.Item>
                  <ListGroup.Item variant="info">Out: {until.slice(0, 9)} </ListGroup.Item>
                  <ListGroup.Item variant="info">Estado: {state}</ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          )
          :
          <h3>Aun no hay reservas disponibles</h3>
      }

    </Row>
  </Container>
  </Card>
}

export default Reservations
