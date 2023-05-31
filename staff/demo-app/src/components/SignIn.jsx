import './SignIn.sass'

function SignIn({ onSignUp, onSubmitSignIn }) {
    return (
        <form className="login" onSubmit={event => {
            event.preventDefault()
            const username = event.target.username.value
            const password = event.target.password.value
            onSubmitSignIn(username, password)
        }}>
            <h1 className="login__title">Login</h1>
            <input className="input login__input" type="text" name="username" id="username" placeholder="Username" />
            <input className="input login__input" type="password" name="password" id="password" placeholder="Password" />

            <div className="container">
                <button type="submit" className="btn login__btn">Login</button>
                <button type="button" className="btn login__btn" onClick={() => onSignUp()}>Don't have account? Register</button>
            </div>
        </form>
    )
}

export default SignIn