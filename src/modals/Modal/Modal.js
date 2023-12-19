import './Modal.css'
import RootContext from "../../context/RootContext/RootContext";
import InformationModal from '../../modals/Information/Information';
import ConformModal from '../../modals/Conform/Conform';
import UndoStatusModal from '../../modals/UndoStatus/UndoStatus';
import AddWorkLogModal from '../../modals/AddWorkLog/AddWorkLog';
import ErrorModal from '../Error/Error';
import { modalDefaultContext } from '../../constants/modalConstants';
import { useEffect, useContext } from "react";
import _ from 'lodash';
import EditWorkLogModal from '../EditWorkLog/EditWorkLog';

const Modal = () => {
    let modal = null;
    const rootContext = useContext(RootContext);
    let { setGlobal, modalData } = rootContext;

    useEffect(() => {
        if (!modalData) {
            modalData = modalDefaultContext;
            setGlobal('modalData', modalData);
        }
    }, []);

    let { modalType } = modalData || modalDefaultContext;
    switch (modalType) {
        case 'InformationModal':
            modal = <InformationModal />
            break;
        case 'ConformModal':
            modal = <ConformModal />
            break;
        case 'ErrorModal':
            modal = <ErrorModal />
            break;
        case 'UndoStatusModal':
            modal = <UndoStatusModal />
            break;
        case 'AddWorkLogModal':
            modal = <AddWorkLogModal />
            break;
        case 'EditWorkLogModal':
            modal = <EditWorkLogModal />
            break;
        default:
            break;
    }

    return (
        <>
            {modal}
        </>
    );
}

export default Modal