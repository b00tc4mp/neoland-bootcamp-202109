import { authorizeUser } from '../logic';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, Card } from 'react-bootstrap';
import AppContext from "./AppContext";
import { useContext } from "react";

function SignIn({ onSignUp, onSignedIn }) {
  const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext);
  return (
    <>
      <Card.Title className='container container--vertical'>Iniciar Sesion</Card.Title>
      <Form
        className='login container container--vertical'
        onSubmit={async (event) => {
          event.preventDefault();

          const {
            target: {
              username: { value: username },
              password: { value: password },
            },
          } = event;

          const user = {
            username,
            password,
          };

          try {
            onFlowStart()

            const token = await authorizeUser(user);

            sessionStorage.token = token;

            onFlowEnd()

            onSignedIn();
          } catch ({ message }) {
            onFlowEnd()
            onModal(message)
          }

          event.target.reset();
        }}
      >

        <Form.Group className='mb-3' name='username' controlId='username'>
          <Form.Label>Usuario</Form.Label>
          <Form.Control type='string' name='username'/>
        </Form.Group>

        <Form.Group className='mb-3' name='password' controlId='password'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            name='password'
          />
        </Form.Group>
        <div className='container--vertical container container--gapped'>
          <Button type='submit' className='button'>
            Iniciar Sesion
          </Button>
          <div className='container--gapped'></div>
          <Button type='button' className='button' onClick={() => onSignUp()}>
            Registrar Agencia
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SignIn;
