import logger from '../utils/logger'

function Update({ onUpdate, onBack }) {
    logger.debug('SignIn -> render')

    return <form className="update container container--vertical container--gapped" onSubmit={event => {
        event.preventDefault()

        const { target: { newName: { value: newName }, newUsername: { value: newUsername }, newEmail: { value: newEmail }, password: { value: password }, newPassword: { value: newPassword } } } = event

        const data = { password, newName, newUsername, newEmail, newPassword }

        for (const key in data) {
            if (data[key] === '') {
                delete data[key]         
            }
        }

        onUpdate(data)
    }}>
        <input className="field" type="text" name="newName" id="update-newName" placeholder="New Name" />
        <input className="field" type="text" name="newUsername" id="update-newUsername" placeholder="New Username" />
        <input className="field" type="email" name="newEmail" id="updated-newEmail" placeholder="New Email" />
        <input className="field" type="password" name="newPassword" id="update-newPassword" placeholder="New Password" />
        <input className="field" type="password" name="password" id="register-password" placeholder="Password" required />

        <div className="container">
            <button type="button" className="button button--medium" onClick={(event) => {
                event.preventDefault()
                
                onBack()
            }}>Go Back</button>
            <button type="submit" className="button button--medium button--dark">Update</button>
        </div>
    </form>
}

export default Update