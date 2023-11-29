import './ManageProjectbackLog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowLeft, faSave, faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { projectStatus, workFlowType, priority } from "../../constants/constants";
import { addProjectBackLog, getProjectBacklogInfo, updateProjectBackLog } from "../../services/Project/project.service";
import { AddProjectBackLogRequest, EditProjectBackLogRequest } from "../../services/Project/projectConstants";
import { AddProjectbackLogErrorMessages } from "../../constants/errorMessages";
import { adjustDateTime } from "../../config/utility";
import _ from 'lodash';
import RootContext from '../../context/RootContext/RootContext';
import { modalDefaultContext } from '../../constants/modalConstants';


const ManageProjectbackLog = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = _.get(params, 'id', null);
    const [projectWorkLogRequst, setWorkLogRequst] = useState({
        title: '',
        workgroup: '1',
        workFlowType: 5,
        priority: 'Medium',
        status: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        originalEst: 0,
        reportedBy: '1',
        subProject: '',
        relesedToProduction: false,
        description: '',
    });
    const [isFromSubitted, setIsFromSubitted] = useState(false);
    const [isFormNotValid, setIsFormNotValid] = useState({
        isTitle: false,
        isStartDate: false,
        isEndDate: false,
        isOriginalEst: false,
        isDescription: false
    });
    // const { title, workgroup, workFlowType, priority, status, startDate, endDate, originalEst, reportedBy, subProject, relesedToProduction, description } = projectWorkLogRequst;


    const handelGoBack = () => {
        navigate('/project-backlog');
    }
    const checkAddFormValidation = () => {
        setIsFromSubitted(true);
        let formValidObject = isFormNotValid;
        let isTitleValid = _.trim(_.get(projectWorkLogRequst, 'title')) === '';
        let isStartDateValid = _.toString(new Date(_.get(projectWorkLogRequst, 'startDate'))) === 'Invalid Date';
        let isEndDateValid = _.toString(new Date(_.get(projectWorkLogRequst, 'endDate'))) === 'Invalid Date' || (new Date(_.get(projectWorkLogRequst, 'startDate')) > new Date(_.get(projectWorkLogRequst, 'endDate')));
        let isOrignalEstValid = !((_.get(projectWorkLogRequst, 'originalEst') > 0) && (_.get(projectWorkLogRequst, 'originalEst') < 12));
        formValidObject = {
            ...formValidObject,
            isTitle: isTitleValid,
            isStartDate: isStartDateValid,
            isEndDate: isEndDateValid,
            isOriginalEst: isOrignalEstValid,
        };
        setIsFormNotValid(formValidObject);
        // let formValidFlag = Object.keys(formValidObject).every(item => !formValidObject[item]);
        let formValidFlag = _.every(Object.keys(formValidObject), item => !formValidObject[item]);
        return formValidFlag;
    }

    const handelTitleChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, title: tempVal });
    }
    const handelWorkGroupChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, workgroup: tempVal });
    }
    const handelpriorityChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, priority: tempVal });
    }
    const handelworkFlowTypeChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, workFlowType: tempVal });
    }
    const handelStatusChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, status: tempVal });
    }
    const handelStartDateChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, startDate: tempVal });
    }
    const handelEndDateChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, endDate: tempVal });
    }
    const handelOriginalEstChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, originalEst: tempVal });
    }
    const handelSubProjectChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, subProject: tempVal });
    }
    const handelReportedByChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, reportedBy: tempVal });
    }
    const handelRelesedToProductionChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        console.log(tempVal);
        setWorkLogRequst({ ...projectWorkLogRequst, relesedToProduction: !_.get(projectWorkLogRequst, 'relesedToProduction') });
    }
    const handelDescriptionChange = (e) => {
        var tempVal = _.get(e, 'target.value');
        setWorkLogRequst({ ...projectWorkLogRequst, description: tempVal });
    }

    useEffect(() => {
        if (isFromSubitted) {
            checkAddFormValidation();
        }
    }, [projectWorkLogRequst]);

    const rootContext = useContext(RootContext);
    let {handleError} = rootContext;

    const handelSaveBtn = async () => {
        let isFormValidFlag = checkAddFormValidation();
        if (isFormValidFlag) {
            let addFormRequest = AddProjectBackLogRequest;
            addFormRequest = {
                ...addFormRequest,
                title: (_.trim(_.get(projectWorkLogRequst, 'title')) === '') ? null : _.get(projectWorkLogRequst, 'title'),
                workGroupId: (_.trim(_.get(projectWorkLogRequst, 'workgroup')) === '') ? null : _.get(projectWorkLogRequst, 'workgroup'),
                workFlow: _.get(projectWorkLogRequst, 'workFlowType'),
                priority: (_.trim(_.get(projectWorkLogRequst, 'priority')) === '') ? null : _.get(projectWorkLogRequst, 'priority'),
                subProjectId: (_.trim(_.get(projectWorkLogRequst, 'subProject')) === '') ? null : _.get(projectWorkLogRequst, 'subProject'),
                projectStatusId: _.get(projectWorkLogRequst, 'status'),
                startDate: _.get(projectWorkLogRequst, 'startDate'),
                endDate: _.get(projectWorkLogRequst, 'endDate'),
                originalEstTime: _.get(projectWorkLogRequst, 'originalEst'),
                remainingEstTime: _.get(projectWorkLogRequst, 'originalEst'),
                reportedEmployeeId: (_.trim(_.get(projectWorkLogRequst, 'reportedBy')) === '') ? null : _.get(projectWorkLogRequst, 'reportedBy'),
                releasedToProduction: _.get(projectWorkLogRequst, 'relesedToProduction'),
                description: (_.trim(_.get(projectWorkLogRequst, 'description')) === '') ? null : _.get(projectWorkLogRequst, 'description')
            }
            console.log('request: ', addFormRequest);
            var tempData = await addProjectBackLog(addFormRequest).catch(handleError);
            console.log(tempData);
            if (tempData) {
                alert('Project work item created successfully');
                navigate('/project-backlog');
            }
        }
    }

    useEffect(() => {
        if (id !== null) {
            getProjectBacklogInfoData(id);
        }
    }, [id]);

    const getProjectBacklogInfoData = async (id) => {
        var tempData = await getProjectBacklogInfo(id).catch(handleError);
        console.log(tempData);
        if (tempData) {
            let request = projectWorkLogRequst;
            request = {
                ...request,
                title: _.get(tempData, 'title'),
                priority: _.get(tempData, 'priority'),
                originalEst: _.get(tempData, 'originalEstTime'),
                endDate: adjustDateTime(_.get(tempData, 'endDate')),
                startDate: adjustDateTime(_.get(tempData, 'startDate')),
                status: _.get(tempData, 'projectStatusId'),
                relesedToProduction: _.get(tempData, 'releasedToProduction'),
                reportedBy: _.toString(_.get(tempData, 'reportedEmployeeId')),
                subProject: _.toString(_.get(tempData, 'subProjectId', '')),
                workFlowType: _.get(tempData, 'workFlow'),
                workgroup: _.toString(_.get(tempData, 'workGroupId')),
                description: _.get(tempData, 'description', ''),
            }
            setWorkLogRequst(request);
        }
    }

    const handelUpdateBtn = async () => {
        let isFormValidFlag = checkAddFormValidation();
        if (isFormValidFlag && id) {
            let editRequest = EditProjectBackLogRequest;
            editRequest = {
                ...editRequest,
                projectWorkId: id,
                title: (_.trim(_.get(projectWorkLogRequst, 'title')) === '') ? null : _.get(projectWorkLogRequst, 'title'),
                workGroupId: (_.trim(_.get(projectWorkLogRequst, 'workgroup')) === '') ? null : _.get(projectWorkLogRequst, 'workgroup'),
                workFlow: _.get(projectWorkLogRequst, 'workFlowType'),
                priority: (_.trim(_.get(projectWorkLogRequst, 'priority')) === '') ? null : _.get(projectWorkLogRequst, 'priority'),
                subProjectId: (_.trim(_.get(projectWorkLogRequst, 'subProject')) === '') ? null : _.get(projectWorkLogRequst, 'subProject'),
                projectStatusId: _.get(projectWorkLogRequst, 'status'),
                startDate: _.get(projectWorkLogRequst, 'startDate'),
                endDate: _.get(projectWorkLogRequst, 'endDate'),
                originalEstTime: _.get(projectWorkLogRequst, 'originalEst'),
                remainingEstTime: _.get(projectWorkLogRequst, 'originalEst'),
                reportedEmployeeId: (_.trim(_.get(projectWorkLogRequst, 'reportedBy')) === '') ? null : _.get(projectWorkLogRequst, 'reportedBy'),
                releasedToProduction: _.get(projectWorkLogRequst, 'relesedToProduction'),
                description: (_.trim(_.get(projectWorkLogRequst, 'description')) === '') ? null : _.get(projectWorkLogRequst, 'description')
            }
            console.log('Edit request: ', editRequest);
            var tempData = await updateProjectBackLog(editRequest).catch(handleError);
            if (tempData) {
                alert(tempData);
                navigate('/project-backlog');   
            }
        }
    }

    return (
        <>
            <div className='w-100 p-3'>
                <button className="btn btn-secondary logout-btn rounded-0" onClick={handelGoBack}> <FontAwesomeIcon icon={faArrowLeft} /> Back </button>
            </div>
            <div className='project-container p-3 text-select-none manageproject-backlog'>
                <div className='pb-2'>
                    Projects <FontAwesomeIcon icon={faAngleRight} />
                    <span className='font-weight-normal'> {(id) ? 'Edit' : 'Add'} Project Work Item </span>
                    <h2 className="blue_border p-0 my-2">{(id) ? 'Edit' : 'Add'} Project Work Item</h2>
                    <form className='p-3'>
                        <div className="form-group row">
                            <div className='col-lg-1'>
                                <label className="form-label">Title</label>
                            </div>
                            <div className='col-lg-11 p-0'>
                                <div className="input-group">
                                    <input className={'form-control' + (_.get(isFormNotValid, 'isTitle') ? ' is-invalid' : '')} onChange={handelTitleChange} value={_.get(projectWorkLogRequst, 'title')} type="text" />
                                </div>
                                {/* {isFormNotValid.isTitle && <span className='text-red'>{AddProjectbackLogErrorMessages.titleValid}</span>} */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Work Group</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" disabled={(id) ? true : false} onChange={handelWorkGroupChange} value={_.get(projectWorkLogRequst, 'workgroup')}>
                                                <option value={'1'}>July - 2023</option>
                                                <option value={'2'}>Oct - 2023</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Work Flow Type</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" onChange={handelworkFlowTypeChange} value={_.get(projectWorkLogRequst, 'workFlowType')}>
                                                {_.map(Object.entries(workFlowType), ([key, value]) => (
                                                    <option key={key} value={key}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">priority</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" onChange={handelpriorityChange} value={_.get(projectWorkLogRequst, 'priority')}>
                                                {_.map(Object.entries(priority), ([key, value]) => (
                                                    <option key={key} value={key}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Status</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" onChange={handelStatusChange} value={_.get(projectWorkLogRequst, 'status')}>
                                                {_.map(Object.entries(projectStatus), ([key, value]) => (
                                                    <option key={key} value={key}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Start Date</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <input className={'form-control' + (_.get(isFormNotValid, 'isStartDate') ? ' is-invalid' : '')} type='date' onChange={handelStartDateChange} value={_.get(projectWorkLogRequst, 'startDate')} />
                                        {/* {isFormNotValid.isStartDate && <span className='text-red'>{AddProjectbackLogErrorMessages.startDateValid}</span>} */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">End Date</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <input className={'form-control' + (_.get(isFormNotValid, 'isEndDate') ? ' is-invalid' : '')} type='date' onChange={handelEndDateChange} value={_.get(projectWorkLogRequst, 'endDate')} />
                                        {/* {isFormNotValid.isEndDate && <span className='text-red'>{AddProjectbackLogErrorMessages.endDateValid}</span>} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Original Est</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <input className={'form-control' + (_.get(isFormNotValid, 'isOriginalEst') ? ' is-invalid' : '')} type='number' onChange={handelOriginalEstChange} min={0} value={_.get(projectWorkLogRequst, 'originalEst')} />
                                        {/* {isFormNotValid.isOriginalEst && <span className='text-red'>{AddProjectbackLogErrorMessages.orignalEstValid}</span>} */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">Reported By</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" onChange={handelReportedByChange} value={_.get(projectWorkLogRequst, 'reportedBy')}>
                                                <option value={'2'}>Dipak Patel</option>
                                                <option value={'3'}>Mohit Panjabi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-2'>
                                        <label className="form-label">SubProject</label>
                                    </div>
                                    <div className='col-lg-10 p-0'>
                                        <div className="input-group">
                                            <select className="form-select w-100" onChange={handelSubProjectChange} value={_.get(projectWorkLogRequst, 'subProject')}>
                                                <option value={''}>Select Sub Project</option>
                                                <option value={'1'}>SB1</option>
                                                <option value={'2'}>SB2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6'>
                                <div className="form-group row">
                                    <div className='col-lg-3'>
                                        <label className="form-label">Released to Production</label>
                                    </div>
                                    <div className='col-lg-9 p-2'>
                                        <input className="form-check-input" type='checkbox' onChange={handelRelesedToProductionChange} checked={_.get(projectWorkLogRequst, 'relesedToProduction')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className='col-lg-1'>
                                <label className="form-label">Description</label>
                            </div>
                            <div className='col-lg-11 p-0'>
                                <div className="input-group">
                                    <textarea className="form-control" onChange={handelDescriptionChange} value={_.get(projectWorkLogRequst, 'description')} type="text" />
                                </div>
                            </div>
                        </div>
                        <div className='w-100 footer-end'>
                            {
                                (id) ?
                                    <button className="btn btn-primary rounded-0 me-2" type='button' onClick={handelUpdateBtn}> <FontAwesomeIcon icon={faSave} /> Update </button> :
                                    <button className="btn btn-primary rounded-0 me-2" type='button' onClick={handelSaveBtn}> <FontAwesomeIcon icon={faSave} /> Save </button>
                            }
                            <button className="btn btn-secondary rounded-0" onClick={handelGoBack}> <FontAwesomeIcon icon={faClose} /> Cancel </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ManageProjectbackLog