import './SignUp.css';

function SignUp({ params }) {
    return (
        <div className="halfSignUp">
            <form action="" className="signUp">
                <p className="signUp__title" >Sign Up</p>
                <p className="signUp__dontHave">Don't have an account?</p>
                <div className="labelAndInput">
                    <label className="label" htmlFor="fullName">Full Name</label>
                    <input className="input" type="text" name="fullName" id="fullName" placeholder="Ivan Pavlov" />
                </div>
                <div className="labelAndInput">
                    <label className="label" htmlFor="email">Your Email</label>
                    <input className="input" type="email" name="email" id="email" placeholder="helloworld@mail.com" />
                </div>
                <div className="labelAndInput">
                    <label className="label" htmlFor="password">Password</label>
                    <input className="input" type="password" name="password" id="password" placeholder="Enter your password" />
                </div>
                <div className="labelAndInput">
                    <label className="label" htmlFor="repeatPassword">Repeat Password</label>
                    <input className="input" type="password" name="repeatPassword" id="repeatPassword" placeholder="Enter your password" />
                </div>
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp