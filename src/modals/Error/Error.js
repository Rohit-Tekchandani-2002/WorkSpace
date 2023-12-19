import './Error.css';
import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useContext } from 'react';
import _ from 'lodash';

const ErrorModal = () => {
    const [refershModule, setRefershModule] = useState(false);
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal } = rootContext;

    let { title, body, show } = modalData;

    const handleClose = () => {
        _.set(modalData, 'show', false);
        setGlobal('modalData', modalData);
        setRefershModule(!refershModule);
    }

    // const [showModal, setShowModal] = useState(show);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title ? ('Error: ' + title) : 'Error'} </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-danger rounded-0 text-white'> {body} </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="primary" className='rounded-0' onClick={() => setShowModal(false)}> Close </Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default ErrorModal;
