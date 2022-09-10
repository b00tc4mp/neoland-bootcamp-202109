import { Spinner } from 'react-bootstrap'
import './Loading.css'

function Loading() {
    
    
    return<>
    <div className="loading d-flex justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
    </div>
    </>
}

export default Loading