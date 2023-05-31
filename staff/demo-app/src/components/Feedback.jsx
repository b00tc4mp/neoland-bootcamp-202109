import logger from '../utils/logger'
import './Feedback.sass'

function Feedback({ level, message, onAccept }) {
    logger.debug('Feedback -> render')

    if (level === 'success')
        logger.info(message)
    else if (level === 'warn')
        logger.warn(message)
    else if (level === 'error')
        logger.error(message)

    const className = `feedback__text ${level ? `feedback__text--${level}` : ''}`

    return <div className="feedback">
        <div className="panel">
            <p className={className}>{message}</p>
            <button className="btn" onClick={onAccept}>Accept</button>
        </div>
    </div>
}

export default Feedback