import './Modal.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap'

function Modal ({ message, onAccept}) {

   return <div className="modal">
       <div className="modal__pop-up">
           <p className="modal__text">{message}</p>
           <Button className="button" onClick={onAccept}>Accept</Button>
       </div>
   </div> 


}

export default Modal