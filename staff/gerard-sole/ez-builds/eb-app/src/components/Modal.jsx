function Modal({message, onCloseModal}) {   
    return <>
    <div className='container container--vertical modal'>
        <div className='container container--vertical modal__panel'>
            <p className="modal__message">{message}</p>
            <button className='button modal__button button--dark' type='button' onClick={onCloseModal} >Accept</button>
        </div>
    </div>
</>
}
export default Modal