import './Landing.sass'

function Landing({ onSignIn, onSignUp }) {
    return (
        <div className="landing">
            <h1 className="landing__title">My App</h1>
            <button type="button" className="btn btn--white landing__btn" onClick={() => onSignIn()}>Login</button>
            <button type="button" className="btn btn--white landing__btn" onClick={() => onSignUp()}>Register</button>
        </div>
    )
}

export default Landing