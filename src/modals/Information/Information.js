import './Information.css';
import React, { useEffect } from 'react';
import { Modal } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useContext } from 'react';

const InformationModal = props => {

    const rootContext = useContext(RootContext);
    let { modalData } = rootContext;

    const { title, body, show, handleClose } = modalData;

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