import React from 'react';
class SignUp extends React.Component {
    render() {
        return <>
            <form className="signup container container--vertical container--gapped " onSubmit={event => {
                event.preventDefault()

                const name = event.target.name.value
                const username = event.target.username.value
                const password = event.target.username.value

                this.props.onSignUp(name,username,password)
            }} >
                <input className="field" type="text" name="name" id="name" placeholder="name" />
                <input className="field" type="text" name="username" id="username" placeholder="username" />
                <input className="field" type="password" name="password" id="password" placeholder="password" />

                <div className="container">
                    <button className="button button--medium" onClick={this.props.onSignIn} >Sign in</button>
                    <button className="button button--medium button--dark" type='submit' >Sign up</button>
                </div>
            </form>
        </>
    }
}

export default SignUp

