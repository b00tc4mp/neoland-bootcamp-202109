import { useState, useContext } from 'react'
import Unregister from './Unregister'
import { updateUserPassword, unregisterUser } from '../logic'
import AppContext from './AppContext'

function Profile({ onBack, onSignOut }) {

    const { onOpenModal } = useContext(AppContext)

    const [view, setView] = useState('update-password')

    const goToUnregister = () => setView('unregister')

    const goToUpdatePassword = () => setView('update-password')

    const updatePassword = (oldPassword, password) => {

        try {
            updateUserPassword(sessionStorage.token, oldPassword, password, error => {
                if (error) {

                    onOpenModal(error.message)

                    return
                }


                onOpenModal('Password updated')
            })
        } catch ({ message }) {

        }
    }

    const unregister = password => {

        try {
            unregisterUser(sessionStorage.token, password, error => {
                if (error) {

                    onOpenModal(error.message)

                    return
                }



                onOpenModal('User unregistered')

                onSignOut()
            })
        } catch ({ message }) {

            onOpenModal(message, 'warn')
        }
    }

    return <>
        {view === 'update-password' && <div className="profile container container--vertical">
            <button className="button" onClick={onBack}>Go back</button>

            <form className="container container--vertical" onSubmit={event => {
                event.preventDefault()

                const { target: { oldPassword: { value: oldPassword }, password: { value: password } } } = event

                updatePassword(oldPassword, password)
            }}>
                <input className="field" type="password" name="oldPassword" id="oldPassword" placeholder="old password" />
                <input className="field" type="password" name="password" id="password" placeholder="new password" />

                <div className="container">
                    <button className="button button--medium button--dark">Update</button>
                </div>
            </form>

            <button className="button button--medium" onClick={goToUnregister}>Unregister</button>
        </div>}

        {view === 'unregister' && <Unregister onBack={goToUpdatePassword} onUnregister={unregister} />}
    </>
}

export default Profile