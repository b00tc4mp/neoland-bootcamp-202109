import { signUp } from '../logic'
import AppContext from './AppContext'
import { useContext } from 'react'

function SignUp( { onSignedUp, onSignIn } ) {

    const { onOpenModal } = useContext(AppContext)

    return <div className='screen'><form className="container signup container--vertical container--gapped" onSubmit={async event => {
        event.preventDefault()

        const { target: { name: { value: name }, username: { value: username }, password: { value: password } } } = event

        try {
            await signUp( name, username, password )

  
   
            onSignedUp()
        } catch ( { message } ) {
         onOpenModal(message)
        }
    }}>
        <h1 className='container--title'>Create account</h1>
        <input className="field" type="text" name="name" id="name" placeholder="name" />
        <input className="field" type="text" name="username" id="username" placeholder="username" />
        <input className="field" type="password" name="password" id="password" placeholder="password" />

        <div className="container">
            <button className="button button--medium" onClick={event => {
                event.preventDefault()

                onSignIn()
            }}>Sign in</button>
            <button className="button button--medium button--dark">Sign up</button>
        </div>
    </form>
    </div>
}

export default SignUp