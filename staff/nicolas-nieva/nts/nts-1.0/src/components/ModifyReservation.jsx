import { useParams } from "react-router-dom"
import { useContext } from "react"
import AppContext from "./AppContext"
import "bootstrap/dist/css/bootstrap.css"
import { Button, Form, Card } from "react-bootstrap"

import { modifyReservation } from "../logic/index"

function ModifyReservation({ goToHome }) {
  const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext)
  const { id } = useParams()
  return (
    <>
      <Card.Title className="container container--vertical">Modificar Reserva</Card.Title>
      <form
        className="signup container container--vertical container--gapped"
        onSubmit={async (event) => {
          event.preventDefault()

          const pax = event.target.pax.value
          const quantity = event.target.quantity.value
          const product = event.target.product.value
          const from = event.target.from.value
          const until = event.target.until.value
          const agent = event.target.agent.value

          //   const {target: { pax: { value: pax}, quantity: { value: quantity}, product { value: }} }= event to do

          const reservation = {
            pax,
            quantity,
            product,
            from,
            until,
            agent,
          }

          try {
            onFlowStart()

            await modifyReservation(sessionStorage.token, reservation, id)

            onModal("Reserva modificada")

            goToHome()

            onFlowEnd()
          } catch ({ message }) {
            onFlowEnd()

            onModal(message)
          }

          event.target.reset()
        }}
      >
        <Form.Control style={{ width: '230px' }}
          className="field"
          type="text"
          name="pax"
          id="pax"
          placeholder="nombre del pasajero"
        />
        <Form.Control style={{ width: '230px' }}
          className="field"
          type="number"
          name="quantity"
          id="username"
          placeholder="nro de pasajeros"
        />
        <Form.Control style={{ width: '230px' }}
          className="field"
          type="text"
          name="product"
          id="product"
          placeholder="producto"
        />
        <Form.Control style={{ width: '230px' }}
          className="field"
          type="date"
          name="from"
          id="from"
          placeholder="In"
        />
        <Form.Control style={{ width: '230px' }}
          className="field"
          type="date"
          name="until"
          id="until"
          placeholder="Out"
        />

        <Form.Control style={{ width: '230px' }}
          className="field"
          type="text"
          name="agent"
          id="agent"
          placeholder="nombre de agente"
        />

        <div className='container container--vertical container--gapped'>
          <Button type= 'submit'>Modificar Reserva</Button>
          </div>
          <div className='container container--vertical container--gapped'>
          <Button onClick={() => goToHome()}><i class="far fa-arrow-alt-circle-left"></i></Button>
        </div>
      </form>
    </>
  )
}

export default ModifyReservation
