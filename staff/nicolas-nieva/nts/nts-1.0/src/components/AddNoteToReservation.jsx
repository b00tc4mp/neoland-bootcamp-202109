import { useParams } from "react-router-dom"
import { useContext } from "react"
import AppContext from "./AppContext"
import "bootstrap/dist/css/bootstrap.css"
import { Button, Form, FloatingLabel, Card } from "react-bootstrap"
import { addNoteToReservation } from "../logic"

function AddNoteToReservation({ goToHome }) {
    const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext)
    const { id } = useParams()
    return (
        <>
            <Card.Title className="container container--vertical">Añadir nota</Card.Title>
            <form
                className="signup container container--vertical container--gapped"
                onSubmit={async (event) => {
                    event.preventDefault()

                    const note = event.target.note.value

                    const text = {
                        text:note
                    }

                    try {
                        onFlowStart()

                        await addNoteToReservation(sessionStorage.token, text, id)

                        onModal("Nota añadida")

                        goToHome()

                        onFlowEnd()
                    } catch ({ message }) {
                        onFlowEnd()

                        onModal(message)
                    }

                    event.target.reset()
                }}
            >
                
                <FloatingLabel controlId="note"  label="Datos adicionales">
                    <Form.Control
                        as="textarea" name="note"
                        placeholder="Leave a comment here"
                        style={{ height: '100px', width: '400px' }}
                    />
                </FloatingLabel>

                <div className="">
                    <Button className="button" onClick={() => goToHome()}>
                    <i class="far fa-arrow-alt-circle-left"></i>
                    </Button>
                    <Button className="button" type="submit">Crear nota</Button>
                </div>
            </form>
        </>
    )
}

export default AddNoteToReservation