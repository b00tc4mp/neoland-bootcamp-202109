import './PostSignUp.sass'

function PostSignUp({ onSignIn, onLanding }) {
    return <>
        <div className="registered container--off">
            <h1 className="registered__title">You have successfully registered</h1>
            <button className="btn btn--white registered__btn" onClick={() => onSignIn()}>Login</button>
            <button className="btn btn--white registered__btn" onClick={() => onLanding()}>Landing Page</button>
        </div>
    </>
}

export default PostSignUp