import { useQuery } from '../hooks'
import { useState, useEffect, useContext } from 'react'
import { searchReservations } from '../logic'
import AppContext from './AppContext'
import 'bootstrap/dist/css/bootstrap.css'
import { ListGroup, Container, Row, Col } from 'react-bootstrap'

function Results({goToItem}) {
    const { showModalFeedback, showLoading, hideLoading, onSignOut } = useContext(AppContext);

    const [reservations, setReservations] = useState({})
  
    const _query = useQuery()
  
    const query = _query.getParam ('q')
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      const { token } = sessionStorage
  
      if (token) {
        try {
          showLoading()
  
          const reservations = await searchReservations(token, query)
  
          hideLoading()
  
          setReservations(reservations)
  
        } catch ({ message }) {
          hideLoading()
  
          showModalFeedback('Buscar reserva' , 'No se encontraron reservas con ese nombre', 'danger')
        }
      }
    }, [query])
  
    return <Container>
    <Row xs={1} sm={1} md={3} lg={4}>
      {
        reservations && reservations.length ?
          reservations.map(({ id, pax, quantity, from, until, state }) => 
            <Col className='mx-4 my-4' >
              <ListGroup>
              <ListGroup.Item onClick={() => goToItem(id)}> 
              <ListGroup.Item variant="info">Pax: {pax} x {quantity} </ListGroup.Item>
                <ListGroup.Item variant="info">In: {from.slice(0, 9)}</ListGroup.Item>
                <ListGroup.Item variant="info">Out: {until.slice(0, 9)} </ListGroup.Item>
                <ListGroup.Item variant="info">Estado: {state}</ListGroup.Item>
              </ListGroup.Item>
              
              </ListGroup>
              </Col>
          ) 
          :
          <h3>Click nueva reserva</h3>
      }

    </Row>
  </Container>
}
  
  export default Results
