function Password( props ) {
    return <>
        <form className="container container--vertical" onSubmit={event => {
            event.preventDefault()

            const oldPassword = event.target.oldPassword.value

            const password = event.target.password.value

            props.onChangePassword(oldPassword, password)
        }}>
            <div className="container container--vertical">
                <input className="field" type="password" name="oldPassword" id="oldPassword" placeholder="Actual password" />
                <input className="field" type="password" name="password" id="password" placeholder="New password" />
            </div>
            <div>
                <button className="button" type="button" onClick={() => props.backProfile()}>Back to Profile</button>
                <button className="button button--dark" type="submit">Change Password</button>
            </div>
        </form>
    </>
}
export default Password