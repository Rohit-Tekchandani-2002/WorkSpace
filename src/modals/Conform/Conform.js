import './Conform.css';
import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useContext } from 'react';
import _ from 'lodash';

const ConformModal = () => {
  const [refershModule, setRefershModule] = useState(false);
  const rootContext = useContext(RootContext);
  let { modalData, setGlobal } = rootContext;

  const { title, body, show, handleConfirm, handleCancle } = modalData;

  const handleClose = () => {
    _.set(modalData, 'show', false);
    setGlobal('modalData', modalData);
    setRefershModule(!refershModule);
  }
 
  const handleConfirmOption = () => {
    handleConfirm();
    handleClose();
  }
 
  const handleCancleOption = () => {
    handleCancle();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {title} </Modal.Title>
      </Modal.Header>
      <Modal.Body> {body} </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className='rounded-0' onClick={handleConfirmOption}> Yes </Button>
        <Button variant="secondary" className='rounded-0' onClick={handleCancleOption}> No </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConformModal;
