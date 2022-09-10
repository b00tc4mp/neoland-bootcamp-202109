import './SignUp.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button} from 'react-bootstrap';
import { useContext } from 'react';
import AppContext from './AppContext';

import { signupUser } from '../logic/index';

function SignUp({ goToPostSignUp, onSignIn }) {
  const { onFlowStart, onFlowEnd, onModal } = useContext(AppContext);

  return (
    <>
      <Form style={{ width: '230px', margin: '20px auto' }}
        className=''
        onSubmit={async (event) => {
          event.preventDefault();

          // const name = event.target.name.value
          // TODO recoger los valores del formulario

          const name = event.target.name.value;
          const username = event.target.username.value;
          const password = event.target.password.value;
          const email = event.target.email.value;
          const address = event.target.address.value;
          const phone = event.target.phone.value;
          const province = event.target.province.value;
          const location = event.target.location.value;
          const country = event.target.country.value;

          const user = {
            name,
            username,
            password,
            email,
            address,
            phone,
            province,
            location,
            country,
          };

          try {
            onFlowStart()

            await signupUser(user)

            goToPostSignUp()

            onModal('Agencia registrada')

            onFlowEnd()

          } catch ({ message }) {

            onModal(message)
            onFlowEnd()
          }

          event.target.reset();
        }}
      >
        <Form.Control 
          type='text'
          className=''
          name='name'
          id='name'
          placeholder='nombre agencia'
        />
        <Form.Control 
          className=''
          type='text'
          name='username'
          id='username'
          placeholder='usuario'
        />
        <Form.Control 
          className=''
          type='password'
          name='password'
          id='password'
          placeholder='contraseña'
        />
        <Form.Control 
          className=''
          type='text'
          name='email'
          id='email'
          placeholder='correo electronico'
        />
        <Form.Control 
          className=''
          type='text'
          name='address'
          id='address'
          placeholder='direccion'
        />
        <Form.Control 
          className=''
          type='text'
          name='phone'
          id='phone'
          placeholder='telefono'
        />
        <Form.Control 
          className=''
          type='text'
          name='province'
          id='province'
          placeholder='provincia'
        />
        <Form.Control 
          className=''
          type='text'
          name='location'
          id='location'
          placeholder='ciudad'
        />
        <Form.Control style={{ width: '230px' }}
          type='text'
          name='country'
          id='country'
          placeholder='pais'
        />

        <div className=''>
          <Button className='' type='submit'>Registrar Agencia</Button>
          <div className=''></div>
          <Button className='' onClick={() => onSignIn()}>Iniciar Sesion </Button>
        </div>
        
      </Form>
    </>
  );
}

export default SignUp;
