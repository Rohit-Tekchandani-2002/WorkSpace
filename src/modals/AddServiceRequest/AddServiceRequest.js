import { useContext, useEffect, useState } from 'react';
import RootContext from '../../context/RootContext/RootContext';
import _ from 'lodash';
import './AddServiceRequest.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import { serviceDefaultContext } from '../../constants/workspaceConstants';
import AuthContext from '../../context/AuthContext/AuthContext';
import moment from 'moment';
import { addServiceRequest, serviceRequestDropDown } from '../../services/Workspace/workspace.service';
import AlertComponent from '../../components/AlertComponent/AlertComponent';

const AddServiceRequest = () => {
    const [refershModule, setRefershModule] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal, serviceContext } = rootContext;
    const { show, handleConfirm } = modalData;
    const {
        serviceGroupList,
        categoriList,
        subCategoriList
    } = serviceContext || serviceDefaultContext;

    useEffect(() => {
        if (!serviceContext) {
            serviceContext = serviceDefaultContext;
            setGlobal('serviceContext', serviceContext);
            setRefershModule(!refershModule);
        }
        getServiceRequestDropDown();
        resetForm();
    }, [])

    useEffect(() => {
        if (errorMessage !== '') {
            setErrorMessage('');
        }
    }, [errorMessage])

    const getServiceRequestDropDown = async () => {
        const { handleError } = rootContext;
        const serviceGroupId = _.get(serviceContext, 'addServiceRequest.serviceGroupId');
        const categoryId = _.get(serviceContext, 'addServiceRequest.categoryId');
        const request = {
            inputServiceGroupId: serviceGroupId ? serviceGroupId : null,
            inputCategoryId: categoryId ? categoryId : null
        }
        const serviceRequestList = await serviceRequestDropDown(request).catch(handleError);
        if (serviceRequestList) {
            console.log('serviceRequestList', serviceRequestList);
            const serviceGroupList = _.get(serviceRequestList, 'serviceGroupList');
            const categoriList = _.get(serviceRequestList, 'categoriList');
            const subCategoriList = _.get(serviceRequestList, 'subCategoriList');
            _.set(serviceContext, 'serviceGroupList', serviceGroupList ? serviceGroupList : []);
            _.set(serviceContext, 'categoriList', categoriList ? categoriList : []);
            _.set(serviceContext, 'subCategoriList', subCategoriList ? subCategoriList : []);
            setGlobal('serviceContext', serviceContext);
        }
        setRefershModule(!refershModule);
    }

    const resetForm = () => {
        setGlobal('serviceContext', serviceContext);
        setRefershModule(!refershModule);
    }

    const handleClose = () => {
        _.set(modalData, 'show', false);
        setGlobal('modalData', modalData);
        resetForm();
        setRefershModule(!refershModule);
    }

    const handleChange = (event, feild) => {
        let value = _.get(event, 'target.value');
        switch (feild) {
            case 'serviceGroupId':
                _.set(serviceContext, 'addServiceRequest.serviceGroupId', value);
                break;
            case 'categoryId':
                _.set(serviceContext, 'addServiceRequest.categoryId', value);
                break;
            case 'subCategoryId':
                _.set(serviceContext, 'addServiceRequest.subCategoryId', value);
                break;
            case 'serviceRequestPriority':
                _.set(serviceContext, 'addServiceRequest.serviceRequestPriority', value);
                break;
            case 'serviceDetails':
                _.set(serviceContext, 'addServiceRequest.serviceDetails', value);
                break;
            default:
                break;
        }
        setGlobal('serviceContext', serviceContext);
        getServiceRequestDropDown();
    }

    const validateForm = () => {
        let isFormValid = true;
        const serviceGroupId = _.get(serviceContext, 'addServiceRequest.serviceGroupId', '');
        const categoryId = _.get(serviceContext, 'addServiceRequest.categoryId', '');
        const subCategoryId = _.get(serviceContext, 'addServiceRequest.subCategoryId', '');
        if (!subCategoryId || subCategoryId === '') {
            setErrorMessage('Sub Category feild cannot be empty');
            isFormValid = false;
        }
        if (!categoryId || categoryId === '') {
            setErrorMessage('Category feild cannot be empty');
            isFormValid = false;
        }
        if (!serviceGroupId || serviceGroupId === '') {
            setErrorMessage('Service Group feild cannot be empty');
            isFormValid = false;
        }
        return isFormValid;
    }

    const handleSave = async () => {
        const { handleError } = rootContext;
        let request = _.get(serviceContext, 'addServiceRequest');
        const isFormValid = validateForm();
        if (isFormValid) {
            const message = await addServiceRequest(request).catch(handleError);
            handleConfirm(message);
            handleClose();
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Service Request </Modal.Title>
            </Modal.Header>
            <Modal.Body className='form-group m-0'>
                <AlertComponent
                    show={errorMessage !== ''}
                    alertMessage={errorMessage}
                    type={'danger'}
                />
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Name</div>
                    <AuthContext.Consumer>
                        {
                            authContext => {
                                const userName = _.get(authContext, 'userData.firstName', 'Assigned') + ' ' + _.get(authContext, 'userData.lastName', '');
                                return (
                                    <div className='col-sm-8'>
                                        {userName}
                                    </div>
                                );
                            }
                        }
                    </AuthContext.Consumer>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Requested Date</div>
                    <div className='col-sm-8'>{moment().format('DD-MMM-YYYY HH:mm:ss')}</div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Service Group</div>
                    <div className='col-sm-8'>
                        <select className='form-select w-100'
                            value={_.get(serviceContext, 'addServiceRequest.serviceGroupId')}
                            onChange={(e) => { handleChange(e, 'serviceGroupId') }}>
                            <option value={''}>Select</option>
                            {
                                _.map(serviceGroupList, (data, index) => {
                                    return (
                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Category</div>
                    <div className='col-sm-8'>
                        <select className='form-select w-100'
                            value={_.get(serviceContext, 'addServiceRequest.categoryId')}
                            onChange={(e) => { handleChange(e, 'categoryId') }}>
                            <option value={''}>Select</option>
                            {
                                _.map(categoriList, (data, index) => {
                                    return (
                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Sub Category</div>
                    <div className='col-sm-8'>
                        <select className='form-select w-100'
                            value={_.get(serviceContext, 'addServiceRequest.subCategoryId')}
                            onChange={(e) => { handleChange(e, 'subCategoryId') }}>
                            <option value={''}>Select</option>
                            {
                                _.map(subCategoriList, (data, index) => {
                                    return (
                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Priority</div>
                    <div className='col-sm-8'>
                        <select className='form-select w-100'
                            value={_.get(serviceContext, 'addServiceRequest.serviceRequestPriority')}
                            onChange={(e) => { handleChange(e, 'serviceRequestPriority') }}>
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Service Details</div>
                    <div className='col-sm-8'>
                        <textarea
                            className='form-control w-100'
                            value={_.get(serviceContext, 'addServiceRequest.serviceDetails')}
                            onChange={(e) => { handleChange(e, 'serviceDetails') }} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className='rounded-0' onClick={handleSave}>
                    <FontAwesomeIcon icon={faSave} /> Save
                </Button>
                <Button variant="secondary" className='rounded-0' onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} /> Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddServiceRequest;