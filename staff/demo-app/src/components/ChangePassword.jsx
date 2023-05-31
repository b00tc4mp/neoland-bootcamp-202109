import './ChangePassword.sass'

function ChangePassword({ onSubmitUpdate, onGoBack }) {
    return (
        <form className="change-password" onSubmit={event => {
            event.preventDefault()

            const oldPassword = event.target.oldPassword.value
            const password = event.target.password.value

            onSubmitUpdate(oldPassword, password)
        }}>
            <h1 className="change-password__title">Change Your Password</h1>
            <input className="input change-password__input" type="password" name="oldPassword" id="oldPassword" placeholder="Old password" />
            <input className="input change-password__input" type="password" name="password" id="password" placeholder="New password" />

            <button className="btn change-password__btn">Change</button>
            <button className="btn change-password__btn" onClick={() => onGoBack()}>Go back</button>
        </form>
    )
}

export default ChangePassword