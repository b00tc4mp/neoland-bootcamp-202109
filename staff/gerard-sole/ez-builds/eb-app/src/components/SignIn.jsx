import { signIn } from '../logic'
import { useContext } from 'react'
import AppContext from './AppContext'

function SignIn({ onSignUp }) {

    const { onGoHome, onOpenModal } = useContext(AppContext)

    return <div className="screen">
        <form className="signin container container--vertical container--gapped" onSubmit={async (event) => {
            event.preventDefault()
            
            const { target: { username: { value: username },  password: { value: password },} } = event

            try {
                await signIn( username, password)
      
                onGoHome()
            } catch ( { message } ) {
                onOpenModal(message)
            }
        }} >
            <h1 className="container--title">EZ BUILDS</h1>

            <input className="field" type="text" name="username" id="username" placeholder="username" />
            <input className="field" type="password" name="password" id="password" placeholder="password" />

            <div className="container container--gapped">
                <button className="button button--medium" onClick={() => onSignUp()}>Sign up</button>
                <button className="button button--medium button--dark">Sign in</button>
            </div>
        </form>
    </div>
}
export default SignIn