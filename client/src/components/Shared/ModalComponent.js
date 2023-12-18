import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent({title, action, children, setOpenModal, handleConfirm}) {
    return (
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true} 
            onHide={() => setOpenModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    {action === 'delete' ? 'Confirm Delete' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
