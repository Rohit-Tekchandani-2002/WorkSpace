import './Conform.css';
import React from 'react';
import { Modal, Button } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useContext } from 'react';

const ConformModal = (props) => {

  const rootContext = useContext(RootContext);
  let { modalData } = rootContext;

  const { title, body, show, handleClose, handleConfirm, handalCancle } = modalData;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {title} </Modal.Title>
      </Modal.Header>
      <Modal.Body> {body} </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className='rounded-0' onClick={handleConfirm}> Yes </Button>
        <Button variant="secondary" className='rounded-0' onClick={handalCancle}> No </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConformModal;
