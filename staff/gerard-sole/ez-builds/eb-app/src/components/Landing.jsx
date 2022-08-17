function Landing( props ) {
    return <div className="screen">
        <div className="landing container container--vertical container--gapped">
            <h1 className="container--title">EZ BUILDS</h1>
            <button type="button" className="button button--medium button--dark" onClick={() => props.onSignIn()}>log in</button>
            <button type="button" className="button button--medium" onClick={() => props.onSignUp()}>create account</button>
        </div>
    </div>
}
export default Landing