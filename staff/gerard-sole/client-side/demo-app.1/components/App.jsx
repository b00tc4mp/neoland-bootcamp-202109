class App extends React.Component {
    constructor() {
        super()
        this.state = {
            view: sessionStorage.token ? "home" : "landing",
            name: null
        }
    }

    componentDidMount() {
        if (sessionStorage.token) {
        try {
            retrieveUser(sessionStorage.token, (error, user) => {
                if (error) {
                    alert(error.message)
                }
                var name = user.name
                this.setState({
                    view: "home"
                    , name
                })

            })
        } catch (error) {
            alert(error.message)
        }
    }
    }

    resetTokenAndGoToLanding = () => {
        delete sessionStorage.token

        this.setState({
            view: 'landing'})
    }
    goToSignIn = () => this.setState({ view: "signin" })
    goToSignUp = () => this.setState({ view: "signup" })
    goToHome = () => this.setState({ view: "home" })

    signUp = (name, username, password) => {
        try {
            signupUser(name, username, password, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }

                this.setState({ view: "post-signup" })
            })
        } catch (error) {
            alert(error.message)

            this.goToSignUp()
        }
    }

    signIn = (username, password) => {

        try {
            signinUser(username, password, (error, token) => {

                if (error) {
                    alert(error.message)

                }
                sessionStorage.token = token
                try {
                    retrieveUser(sessionStorage.token, (error, user) => {
                        if (error) {
                            alert(error.message)
                        }
                        var name = user.name
                        this.setState({
                            view: "home"
                            , name
                        })

                    })
                } catch (error) {
                    alert(error.message)

                }


            })
        }
        catch (error) {
            alert(error.message)

        }
    }


    render() {
        return (
            <>
                {this.state.view === "landing" && (
                    <Landing
                        onSignIn={this.goToSignIn}
                        onSignUp={this.goToSignUp}
                    />
                )}

                {this.state.view === "signin" && (
                    <SignIn onSignUp={this.goToSignUp} signIn={this.signIn} />
                )}

                {this.state.view === "signup" && (
                    <SignUp
                        onSignIn={this.goToSignIn}
                        onSignUp={this.signUp}
                    />
                )}

                {this.state.view === "post-signup" && (
                    <PostSignUp onSignIn={this.goToSignIn} />
                )}

                {this.state.view === "home" && (
                    <Home name={this.state.name}
                    toLanding={this.resetTokenAndGoToLanding} />
                )}

            </>
        )
    }
}