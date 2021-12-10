import logger from '../logger'

function Landing({ onSignIn, onSignUp }) {
    logger.debug('Landing -> render')
    return <div className="container container--vertical container--gapped">
        <button className="button button--medium button--dark" onClick={() => {
            onSignIn()
        }}>Sign in</button>
        <button className="button button--medium" onClick={onSignUp}>Sign up</button>
    </div>
}

export default Landing