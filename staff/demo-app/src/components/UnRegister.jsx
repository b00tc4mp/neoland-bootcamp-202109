import './UnRegister.sass'

function UnRegister({ onSubmitUnRegister, onGoBack }) {
    return <>
        <form className="delete-account" onSubmit={(event) => {
            event.preventDefault()

            const password = event.target.password.value

            onSubmitUnRegister(password)
        }}  >
            <h1 className="delete-account__title">Delete Account</h1>
            <p className="delete-account__paragraph">Are you sure?</p>
            <input className="input delete-account__input" type="password" name="password" id="password" placeholder="Password" />
            <button className="btn delete-account__btn">Unregister</button>
            <button className="btn delete-account__btn" onClick={() => onGoBack()}>Go back</button>
        </form>
    </>
}

export default UnRegister