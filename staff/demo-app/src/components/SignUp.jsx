import './SignUp.sass';

function SignUp({ onSignUp, onSignIn }) {
    return (
        <form className="register container container--vertical container--gapped" onSubmit={event => {
            event.preventDefault()

            const name = event.target.name.value
            const username = event.target.username.value
            const password = event.target.password.value

            onSignUp(name, username, password)
        }}>
            <h1 className="register__title">Register</h1>
            <input className="input register__input" type="text" name="name" id="name" placeholder="Name" />
            <input className="input register__input" type="text" name="username" id="username" placeholder="Username" />
            <input className="input register__input" type="password" name="password" id="password" placeholder="Password" />

            <button className="btn register__btn">Register</button>
            <button className="btn register__btn" onClick={() => onSignIn()} >I have an account</button>
        </form>
    )
}


export default SignUp