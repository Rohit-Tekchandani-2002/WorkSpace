import { useState, useEffect } from "react";
import RootContext from '../../context/RootContext/RootContext';
import Modal from '../../modals/Modal/Modal';
import _ from "lodash";
import { modalDefaultContext } from "../../constants/modalConstants";

const RootContextWrapper = props => {
    const { children } = props;
    const [state, setState] = useState({});
    const [refershModule, setRefershModule] = useState(false);

    const setGlobal = (index, newData) => {
        const { [index]: oldData } = state;
        if (oldData !== newData) {
            setState({
                ...state,
                [index]: newData
            });
        }
    }

    const handleError = error => {
        console.log('handalerror', error, state);
        let { modalData = modalDefaultContext } = state;
        if (modalData) {
            _.set(modalData, 'modalType', 'ErrorModal');
            _.set(modalData, 'title', _.get(error, 'code', ''));
            _.set(modalData, 'body', _.get(error, 'message', ''));
            _.set(modalData, 'show', true);
            setGlobal('modalData', modalData);
            setRefershModule(!refershModule);
        }
    }

    const rootContextValue = {
        ...state,
        setGlobal: setGlobal,
        handleError: handleError
    };

    return (
        <RootContext.Provider value={rootContextValue}>
            <Modal />
            {children}
        </RootContext.Provider>
    );
}

export default RootContextWrapper