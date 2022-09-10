import 'bootstrap/dist/css/bootstrap.css'
import { Button, Card } from 'react-bootstrap'

function PostSignUp({ onSignIn }) {
    return <>
        <Card.Title className='container container--vertical container--gapped'>Te has registrado satisfactoriamente</Card.Title>
        <div className='container container--vertical container--gapped'>
        <Button onClick={() => onSignIn()}>Iniciar Sesion</Button>
        </div>
    </>
}

export default PostSignUp