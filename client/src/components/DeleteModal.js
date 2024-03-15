import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TrashModal({handleClose, handleConfirm, show}) {
    return (
        <Modal show={show} onHide={handleClose} className="Trashmodal">
            <Modal.Header closeButton>
                <Modal.Title>Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm delete?</Modal.Body>
            <Modal.Footer className="FooterTrash">
                <Button className="btn btn-sm" variant="secondary" onClick={handleClose} autoFocus={true}>Close</Button>
                <Button className="btn btn-sm btn-primary" onClick={handleConfirm} autoFocus={true}>
                    <i className="fa fa-check" aria-hidden="true"></i>Confirm</Button>
            </Modal.Footer>
        </Modal>
    ); 
}
