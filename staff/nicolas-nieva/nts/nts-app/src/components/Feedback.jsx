
import { Button, Modal } from 'react-bootstrap'


function Feedback({modalFeedback, handleClose, modalFeedbackTitle, modalFeedbackMessage, levelFeedback}) {

  const className = `${levelFeedback ? `text-${levelFeedback}` : ''}`

    return <>
        <Modal show={modalFeedback} onHide={handleClose}>
          <Modal.Header className={className}closeButton>{modalFeedbackTitle}</Modal.Header>
        <Modal.Body>{modalFeedbackMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant={levelFeedback} onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default Feedback

