import { useContext, useEffect, useState } from 'react';
import RootContext from '../../context/RootContext/RootContext';
import './AddWorkLog.css';
import { Modal, Button, ProgressBar } from "react-bootstrap";
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { adjustDateTime } from '../../config/utility';
import { addWorkLogDefaultContext } from '../../constants/modalConstants';
import { addWorkLog, updateProjectWorkItemTime } from '../../services/Project/project.service';

const AddWorkLogModal = () => {
    const [refershModule, setRefershModule] = useState(false);
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal, addWorkLogContext } = rootContext;
    const { show, data, handleConfirm } = modalData;
    let originalEst = _.toNumber(_.get(data, 'originalEstTime', 0));
    let remainingEst = _.toNumber(_.get(data, 'remainingEstTime', 0));
    let totalWorkDone = Math.abs(originalEst - remainingEst);
    const resetForm = () => {
        _.set(addWorkLogContext, 'workDoneOn', adjustDateTime(new Date()));
        _.set(addWorkLogContext, 'workTimeHours', 0);
        _.set(addWorkLogContext, 'workTimeMinutes', 0);
        _.set(addWorkLogContext, 'description', null);
        _.set(addWorkLogContext, 'updateRemaningEst', false);
        _.set(addWorkLogContext, 'remainingEstHours', 0);
        _.set(addWorkLogContext, 'remainingEstMinutes', 0);
        setGlobal('addWorkLogContext', addWorkLogContext);
        setRefershModule(!refershModule);
    }

    const handleClose = () => {
        _.set(modalData, 'show', false);
        setGlobal('modalData', modalData);
        resetForm();
        setRefershModule(!refershModule);
    }

    useEffect(() => {
        if (!addWorkLogContext) {
            addWorkLogContext = addWorkLogDefaultContext;
            setGlobal('addWorkLogContext', addWorkLogContext);
            setRefershModule(!refershModule);
        }
        console.log('addWorkLogContext', addWorkLogContext);
        _.set(addWorkLogContext, 'workDoneOn', _.get(data, 'workDoneOn'));
        _.set(addWorkLogContext, 'originalEst', originalEst);
        _.set(addWorkLogContext, 'remainingEst', remainingEst);
        _.set(addWorkLogContext, 'totalWorkDone', totalWorkDone);
        let tempProgressBarValue = _.floor((totalWorkDone / _.get(addWorkLogContext, 'originalEst', 1)) * 100, 2);
        _.set(addWorkLogContext, 'progressBarValue', tempProgressBarValue);
        if (tempProgressBarValue > 100) {
            _.set(addWorkLogContext, 'progressBarValue', 100);
        }
        if (tempProgressBarValue < 0) {
            _.set(addWorkLogContext, 'progressBarValue', 0);
        }
        setGlobal('addWorkLogContext', addWorkLogContext);
        setRefershModule(!refershModule);
    }, [data])

    const handleChange = (event, feild) => {
        let value = _.get(event, 'target.value');
        switch (feild) {
            case 'workDoneOn':
                _.set(addWorkLogContext, 'workDoneOn', value);
                break;
            case 'workTimeHours':
                value = _.toNumber(value);
                if (value >= 0 && value < 24) {
                    _.set(addWorkLogContext, 'workTimeHours', value);
                }
                break;
            case 'workTimeMinutes':
                value = _.toNumber(value);
                _.set(addWorkLogContext, 'workTimeMinutes', value);
                break;
            case 'description':
                _.set(addWorkLogContext, 'description', value);
                break;
            case 'updateRemaningEst':
                value = _.get(event, 'target.checked');
                _.set(addWorkLogContext, 'updateRemaningEst', value);
                if (!value) {
                    _.set(addWorkLogContext, 'updateRemaningEst', value);
                    _.set(addWorkLogContext, 'remainingEstHours', 0);
                    _.set(addWorkLogContext, 'remainingEstMinutes', 0);
                }
                break;
            case 'remainingEstHours':
                value = _.toNumber(value);
                if (value >= 0 && value < 24) {
                    _.set(addWorkLogContext, 'remainingEstHours', value);
                }
                break;
            case 'remainingEstMinutes':
                _.set(addWorkLogContext, 'remainingEstMinutes', value);
                break;
            default:
                break;
        }
        let workTime = _.get(addWorkLogContext, 'workTimeHours', 0) + (_.get(addWorkLogContext, 'workTimeMinutes', 0) / 60);
        let remainingTime = _.get(addWorkLogContext, 'remainingEstHours', 0) + (_.get(addWorkLogContext, 'remainingEstMinutes', 0) / 60);
        let tempProgressBarValue = _.floor(((totalWorkDone + workTime - remainingTime) / _.get(addWorkLogContext, 'originalEst', 1)) * 100, 2);
        _.set(addWorkLogContext, 'progressBarValue', tempProgressBarValue);
        if (tempProgressBarValue > 100) {
            _.set(addWorkLogContext, 'progressBarValue', 100);
        }
        if (tempProgressBarValue < 0) {
            _.set(addWorkLogContext, 'progressBarValue', 0);
        }
        if (_.get(addWorkLogContext, 'updateRemaningEst', false)) {
            _.set(addWorkLogContext, 'remainingEst', remainingTime);
        }
        else {
            let newRemainingEst = remainingEst - workTime;
            _.set(addWorkLogContext, 'remainingEst', (newRemainingEst) > 0 ? newRemainingEst : 0);
        }
        _.set(addWorkLogContext, 'totalWorkDone', _.sum([totalWorkDone, workTime]));
        setGlobal('addWorkLogContext', addWorkLogContext);
        setRefershModule(!refershModule);
    }

    const handleSave = async () => {
        const { handleError } = rootContext;
        let workTime = _.get(addWorkLogContext, 'workTimeHours', 0) + (_.get(addWorkLogContext, 'workTimeMinutes', 0) / 60);
        let addWorkLogRequest = {
            projectWorkId: _.get(data, 'projectWorkId'),
            workDoneOn: _.get(addWorkLogContext, 'workDoneOn'),
            workTime: workTime,
            description: _.get(addWorkLogContext, 'description', null)
        }
        await addWorkLog(addWorkLogRequest).catch(handleError);
        let updateProjectWorkItemRequest = {
            projectWorkId: _.get(data, 'projectWorkId'),
            totalTime: _.get(addWorkLogContext, 'totalWorkDone', 0),
            remaningTime: _.get(addWorkLogContext, 'remainingEst', 0)
        }
        let message = await updateProjectWorkItemTime(updateProjectWorkItemRequest).catch(handleError);
        if (message === '') {
            message = 'WorkLog Added successfully';
        }
        resetForm();
        handleConfirm(message);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Work Log </Modal.Title>
            </Modal.Header>
            <Modal.Body className='form-group m-0'>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Item Name</div>
                    <div className='col-sm-8'>
                        <a href=''>
                            TA{_.get(data, 'projectWorkId', '')} : {_.get(data, 'title', '')}
                        </a>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Done By</div>
                    <div className='col-sm-8'>{_.get(data, 'assignedTo', '')}</div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Done On</div>
                    <div className='col-sm-8'>
                        <input className='form-control w-100' type='date'
                            value={_.get(addWorkLogContext, 'workDoneOn', adjustDateTime(new Date()))}
                            onChange={(e) => handleChange(e, 'workDoneOn')} />
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Time</div>
                    <div className='col-sm-8 d-flex'>
                        <div className='pe-2 w-100'>
                            <input className='form-control w-100' type='number'
                                value={_.get(addWorkLogContext, 'workTimeHours', 0)} min={0} max={23}
                                onChange={(e) => handleChange(e, 'workTimeHours')} />
                        </div>
                        <div className='w-100'>
                            <select className="form-select"
                                value={_.get(addWorkLogContext, 'workTimeMinutes', 0)}
                                onChange={(e) => handleChange(e, 'workTimeMinutes')}>
                                <option value="0">0</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Description</div>
                    <div className='col-sm-8'>
                        <textarea className='form-control w-100 work-text-area'
                            value={_.get(addWorkLogContext, 'description') ? _.get(addWorkLogContext, 'description') : ''}
                            onChange={(e) => handleChange(e, 'description')} />
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'></div>
                    <div className='col-sm-8'>
                        <input type='checkbox' checked={_.get(addWorkLogContext, 'updateRemaningEst', false)}
                            onChange={(e) => handleChange(e, 'updateRemaningEst')} />
                        <span className='ps-2'>Update Remaining Est</span>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'></div>
                    <div className='col-sm-8 d-flex'>
                        <div className='pe-2 w-100'>
                            <input className='form-control w-100' type='number'
                                value={_.get(addWorkLogContext, 'remainingEstHours', 0)} min={0} max={23}
                                onChange={(e) => handleChange(e, 'remainingEstHours')}
                                disabled={!_.get(addWorkLogContext, 'updateRemaningEst', false)} />
                        </div>
                        <div className='w-100'>
                            <select className="form-select" value={_.get(addWorkLogContext, 'remainingEstMinutes', 0)}
                                onChange={(e) => handleChange(e, 'remainingEstMinutes')}
                                disabled={!_.get(addWorkLogContext, 'updateRemaningEst', false)}>
                                <option value="0">0</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row p-1'>
                    <div className='col-sm-4 p-2'>
                        <div className='bg-new text-white p-2'>
                            <div>Original Est</div>
                            <div>{_.get(addWorkLogContext, 'originalEst', 0)} hours</div>
                        </div>
                    </div>
                    <div className='col-sm-4 p-2'>
                        <div className='bg-new text-white p-2'>
                            <div>Remaining Hours</div>
                            <div>{_.get(addWorkLogContext, 'remainingEst', 0)} hours</div>
                        </div>
                    </div>
                    <div className='col-sm-4 p-2'>
                        <div className='bg-new text-white p-2'>
                            <div>Total Work Done</div>
                            <div>{_.get(addWorkLogContext, 'totalWorkDone', 0)} hours</div>
                        </div>
                    </div>
                </div>
                <ProgressBar now={_.get(addWorkLogContext, 'progressBarValue', 0)} label={`${_.get(addWorkLogContext, 'progressBarValue', 0)}% Complete`} className='rounded-0' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className='rounded-0' onClick={handleSave}>
                    <FontAwesomeIcon icon={faSave} /> Save
                </Button>
                <Button variant="secondary" className='rounded-0' onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} /> Colse
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddWorkLogModal