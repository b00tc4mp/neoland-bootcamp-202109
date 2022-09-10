import 'bootstrap/dist/css/bootstrap.css'
import { Button, Form } from 'react-bootstrap'

function Unregister({ onUnregister, onBack}) {
    return <>
        <div className='unregister container container--vertical container--gapped'>
            <Form className='container container--vertical' onSubmit={(event) => {
                event.preventDefault()

                const password = event.target.password.value
          

                onUnregister(password)

                event.target.reset()

            }}>
              <h1>Eleminar agencia</h1>
                <Form.Control style={{ width: '300px' }}   className='field' type='password' name='password' id='password' placeholder='password' />

                    <Button className='button' onClick={() => onBack()}><i class="far fa-arrow-alt-circle-left"></i></Button>
                    <Button className='button' variant='danger'>Eliminar usuario</Button>
               
            </Form>
        </div>
    </>
}

export default Unregister