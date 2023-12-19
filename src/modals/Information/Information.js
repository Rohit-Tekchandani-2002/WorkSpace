import './Information.css';
import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useContext } from 'react';
import _ from 'lodash';

const InformationModal = () => {
    const [refershModule, setRefershModule] = useState(false);
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal } = rootContext;

    const { title, body, show } = modalData;

    const handleClose = () => {
        _.set(modalData, 'show', false);
        setGlobal('modalData', modalData);
        setRefershModule(!refershModule);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title} </Modal.Title>
            </Modal.Header>
            <Modal.Body> {body} </Modal.Body>
        </Modal>
    );
}

export default InformationModal