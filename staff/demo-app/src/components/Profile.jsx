import './Profile.sass'

function Profile({ onUpdatePassword, onDeleteAccount, onGoBack }) {
    return (
        <div className="profile">
            <h1 className="profile__title">My Profile</h1>
            <button className="btn profile__btn" onClick={() => onUpdatePassword()}>Update Password</button>
            <button className="btn profile__btn" onClick={() => onDeleteAccount()}>Delete Account</button>
            <button className="btn profile__btn" onClick={() => onGoBack()}>Back</button>
        </div>
    )
}

export default Profile