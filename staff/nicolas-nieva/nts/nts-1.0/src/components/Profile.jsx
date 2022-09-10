import { useState, useContext } from 'react'
import Unregister from './Unregister'
import { updateUserPassword, unregisterUser } from '../logic'
import AppContext from './AppContext'
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Form, Card } from 'react-bootstrap'

function Profile({ goToHome }) {
  const { onFlowStart, onFlowEnd, onModal, onSignOut } = useContext(AppContext)

  const [view, setView] = useState('update-password')

  const goToUnregister = () => setView('unregister')

  const goToUpdatePassword = () => setView('update-password')

  const updatePassword = async (oldPassword, password) => {
    onFlowStart()

    const user = { oldPassword, password }

    try {
      await updateUserPassword(sessionStorage.token, user)

      onFlowEnd()

      onModal('Password updated')
    } catch ({ message }) {
      onFlowEnd()

      onModal(message)
    }
  }

  const unregister = async (password) => {

    onFlowStart()

    try {
      unregisterUser(sessionStorage.token, password)

      onFlowEnd()

      onModal('User unregistered')

      onSignOut()
    } catch ({ message }) {
      onFlowEnd()

      onModal(message)
    }
  }
  return (
    <>
      {view === 'update-password' && (
        <div className='profile container container--vertical'>
          <Card.Title>Cambiar contraseña</Card.Title>
          <Form
            className='container container--vertical'
            onSubmit={(event) => {
              event.preventDefault()

              const {
                target: {
                  oldPassword: { value: oldPassword },
                  password: { value: password },
                },
              } = event

              updatePassword(oldPassword, password)
            }}
          >
            <Form.Control style={{ width: '200px' }}
              className='field'
              type='password'
              name='oldPassword'
              id='oldPassword'
              placeholder='contraseña actual'
            />
            <Form.Control style={{ width: '200px' }}
              className='field'
              type='password'
              name='password'
              id='password'
              placeholder='nueva contraseña'
            />
          </Form>
         
          <div className='container container--vertical container--gapped'>
            <Button className='button'>Actualizar</Button>
          </div>
           <Button className='button' onClick={() => goToHome()}>
            <i class="far fa-arrow-alt-circle-left"></i>
          </Button>
          <div className='container container--vertical container--gapped'>
            <Button variant='warning' onClick={goToUnregister} >
              Borrar agencia
            </Button>
          </div>

        </div>
      )}

      {view === 'unregister' && (
        <Unregister onBack={goToUpdatePassword} onUnregister={unregister} />
      )}
    </>
  )
}

export default Profile
