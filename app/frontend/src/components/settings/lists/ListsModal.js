import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

function ListsModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Listentitel ändern
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='justify-content-center text-center'>
                <FloatingLabel controlId="floatingTitle" label="Titel">
                    <Form.Control placeholder="Titel"/>
                </FloatingLabel>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Abbrechen</Button>
            <Button onClick={props.onHide}>Speichern</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default ListsModal;