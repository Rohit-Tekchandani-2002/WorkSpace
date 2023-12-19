import { useContext, useEffect, useState } from 'react';
import { editWorkLogDefaultContext } from '../../constants/modalConstants';
import RootContext from '../../context/RootContext/RootContext';
import './EditWorkLog.css';
import { adjustDateTime } from '../../config/utility';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { updateProjectWorkLog } from '../../services/Project/project.service';

const EditWorkLogModal = () => {
    const [refershModule, setRefershModule] = useState(false);
    const rootContext = useContext(RootContext);
    let { modalData, setGlobal, editWorkLogContext } = rootContext;
    const { show, data, handleConfirm } = modalData;

    useEffect(() => {
        if (!editWorkLogContext) {
            editWorkLogContext = editWorkLogDefaultContext;
            setGlobal('editWorkLogContext', editWorkLogContext);
            setRefershModule(!refershModule);
        }
        resetForm();
    }, [data])

    const resetForm = () => {
        let workDoneOn = _.get(data, 'workDoneOn');
        let workedHours = _.get(data, 'workedHours');
        if (workDoneOn) {
            _.set(editWorkLogContext, 'workDoneOn', adjustDateTime(new Date(workDoneOn)));
        }
        if (workedHours) {
            if (workedHours !== Math.trunc(workedHours)) {
                let workTimeHours = Math.trunc(workedHours);
                let workTimeMinutes = (workedHours - Math.trunc(workedHours)) * 60;
                _.set(editWorkLogContext, 'workTimeHours', workTimeHours);
                _.set(editWorkLogContext, 'workTimeMinutes', workTimeMinutes);
            } else {
                _.set(editWorkLogContext, 'workTimeHours', workedHours);
                _.set(editWorkLogContext, 'workTimeMinutes', 0);
            }
        }
        _.set(editWorkLogContext, 'description', null);
        setGlobal('editWorkLogContext', editWorkLogContext);
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
            case 'workDoneOn':
                _.set(editWorkLogContext, 'workDoneOn', value);
                break;
            case 'workTimeHours':
                value = _.toNumber(value);
                if (value >= 0 && value < 24) {
                    _.set(editWorkLogContext, 'workTimeHours', value);
                }
                break;
            case 'workTimeMinutes':
                value = _.toNumber(value);
                _.set(editWorkLogContext, 'workTimeMinutes', value);
                break;
            case 'description':
                _.set(editWorkLogContext, 'description', value);
                break;
            default:
                break;
        }
        setGlobal('editWorkLogContext', editWorkLogContext);
        setRefershModule(!refershModule);
    }

    const handleSave = async () => {
        const { handleError } = rootContext;
        let workTime = _.get(editWorkLogContext, 'workTimeHours', 0) + (_.get(editWorkLogContext, 'workTimeMinutes', 0) / 60);
        let workedHours = _.get(data, 'workedHours');
        if (workTime > 0 && workedHours !== workTime) {
            let editWorkLogRequest = {
                workLogId: _.get(data, 'workLogId'),
                workDoneOn: _.get(editWorkLogContext, 'workDoneOn'),
                workTime: workTime,
                description: _.get(editWorkLogContext, 'description', null)
            }
            let message = await updateProjectWorkLog(editWorkLogRequest).catch(handleError);
            if (message) {
                handleConfirm(message);
            }
            handleClose();
        }else{
            if(workTime <= 0){
                handleError({ message: 'Work time is not valid'});
            }
            if(workedHours === workTime){
                handleError({ message: 'Work time value is equal to old value'});
            }
        }
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
                    <div className='col-sm-8'>{_.get(data, 'employee', '')}</div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Done On</div>
                    <div className='col-sm-8'>
                        <input className='form-control w-100' type='date'
                            value={_.get(editWorkLogContext, 'workDoneOn', adjustDateTime(new Date()))}
                            onChange={(e) => handleChange(e, 'workDoneOn')} />
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-sm-4 control-label'>Work Time</div>
                    <div className='col-sm-8 d-flex'>
                        <div className='pe-2 w-100'>
                            <input className='form-control w-100' type='number'
                                value={_.get(editWorkLogContext, 'workTimeHours', 0)} min={0} max={23}
                                onChange={(e) => handleChange(e, 'workTimeHours')} />
                        </div>
                        <div className='w-100'>
                            <select className="form-select"
                                value={_.get(editWorkLogContext, 'workTimeMinutes', 0)}
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
                            value={_.get(editWorkLogContext, 'description') ? _.get(editWorkLogContext, 'description') : ''}
                            onChange={(e) => handleChange(e, 'description')} />
                    </div>
                </div>
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

export default EditWorkLogModal