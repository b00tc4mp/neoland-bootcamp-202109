import './index.css'

const Modal = ({ level, message, onAccept }) => {
    const className = `feedback__text ${level ? `feedback__text--${level}` : ''}`

    return <div className="feedback">
        <div className="panel">
            <p className={className}>{message}</p>
            <button type='button' className="btn btn--dark" onClick={onAccept}>Accept</button>
        </div>
    </div>
}

export default Modal