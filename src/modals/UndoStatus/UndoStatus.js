import './UndoStatus.css';
import React from 'react';
import { Modal } from "react-bootstrap";
import RootContext from '../../context/RootContext/RootContext';
import { useState, useContext } from 'react';
import _ from 'lodash';

const UndoStatusModal = () => {
    const [refershModule, setRefershModule] = useState(false);
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal } = rootContext;
    const { show, handleConfirm, handleClose } = modalData;

    // const handleClose = () => {
    //     _.set(modalData, 'show', false);
    //     setGlobal('modalData', modalData);
    //     setRefershModule(!refershModule);
    // }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='undo-dialog' closeButton>
                <Modal.Title> <span className='undo-link' onClick={handleConfirm}>Undo</span> your last changes.</Modal.Title>
            </Modal.Header>
        </Modal>
    );
}

export default UndoStatusModal