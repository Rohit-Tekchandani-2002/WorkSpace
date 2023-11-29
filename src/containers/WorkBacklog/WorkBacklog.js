import './WorkBacklog.css';
import { faAngleRight, faClock, faDashboard, faFilter, faHistory, faList, faListAlt, faPlus, faRefresh, faSearch, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import RootContext from '../../context/RootContext/RootContext';
import { workBacklogDefaultContext } from '../../constants/workBackLogConstants';
import { getProjectWorkgroup, getWorkGroupInfo, getWorkLog, updateWorkLog } from '../../services/Project/project.service'
import _ from 'lodash';
import { formatDate, formatTime } from '../../config/utility';
import { projectStatus, bgStatus, workFlowTypeOptions, projectStatusOptions } from "../../constants/constants";
import taskImg from "../../assets/img/task.png";
import { OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import AlertPopUp from '../../components/AlertPopUp/AlertPopUp';
import { alertPopUpDefaultContext } from '../../constants/alertPopupDefaultContext';
import AlertComponent from '../../components/AlertComponent/AlertComponent';
import Tooltip from '@mui/material/Tooltip';
import ModualLoader from '../../components/ModualLoader/ModualLoader';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import DashBoard from './children/DashBoard/DashBoard';
import ToolBar from './children/ToolBar/ToolBar';

class WorkBacklog extends Component {
    static contextType = RootContext;
    state = {
        refershModule: false,
        workGroupId: localStorage.getItem('workGroupId'),
        // undoState: false,
        originalWorkLogState: null,
        alertMessage: '',
        activeWindow: 'dashboard',
        reload: false,
        filterWindowActive: false
    };

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
        let alertPopUpContext = _.get(this.context, 'alertPopUpContext');
        if (!alertPopUpContext) {
            alertPopUpContext = alertPopUpDefaultContext;
            setGlobal('alertPopUpContext', alertPopUpContext);
        }
        this.getProjectWorkgroupData();
        this.getWorkGroupInfoData();
        this.getWorkLogData();
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'workGroupId') !== _.get(prevState, 'workGroupId'))) {
            this.getWorkGroupInfoData();
            this.getWorkLogData();
        }
        // if ((_.get(this.state, 'undoState') !== _.get(prevState, 'undoState'))) {
        //     const { setGlobal, handleError } = this.context;
        //     if (_.get(this.state, 'undoState')) {
        //         let workLog = _.map(_.get(this.context, 'workBacklog.workLog', {}),
        //             (data) => {
        //                 if (_.get(data, 'projectWorkId') === _.get(this.state, 'originalWorkLogState.projectWorkId')) {
        //                     _.set(data, 'projectStatusId', _.get(this.state, 'originalWorkLogState.projectStatusId'));
        //                     updateWorkLog(data).catch(handleError);
        //                 }
        //                 return data;
        //             }
        //         )
        //         _.set(this.context, 'workBacklog.workLog', workLog);
        //         setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
        //         this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        //     }
        //     this.setState({ undoState: false });
        // }
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            // alert(_.get(this.state, 'alertMessage'));
            const { setGlobal } = this.context;
            let alertPopUpContext = _.get(this.context, 'alertPopUpContext');
            if (!_.get(alertPopUpContext, 'show', false)) {
                _.set(alertPopUpContext, 'alertString', _.get(this.state, 'alertMessage'));
                _.set(alertPopUpContext, 'show', true);
                setGlobal('alertPopUpContext', alertPopUpContext);
                this.setState({ alertMessage: '' });
            }
        }
    }

    getProjectWorkgroupData = async () => {
        const { handleError, setGlobal } = this.context;
        const projectId = localStorage.getItem('projectId');
        let tempData = await getProjectWorkgroup(projectId).catch(handleError);
        if (tempData) {
            _.set(this.context, 'workBacklog.workGroups', tempData);
            if (_.get(this.state, 'workGroupId') === null) {
                this.setState({ workGroupId: _.get(this.context, 'workBacklog.workGroups[0].keyId', null) });
            }
            setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

    getWorkGroupInfoData = async () => {
        const { setGlobal, handleError } = this.context;
        if (_.get(this.state, 'workGroupId')) {
            let tempData = await getWorkGroupInfo(_.get(this.state, 'workGroupId')).catch(handleError);
            if (tempData) {
                _.set(this.context, 'workBacklog.workGroupInfo', tempData);
                setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
            }
        }
    }

    getWorkLogData = async () => {
        const { setGlobal, handleError } = this.context;
        if (_.get(this.state, 'workGroupId')) {
            let request = {
                workGroupId: _.get(this.context, 'workBacklog.filter.workGroupId', _.get(this.state, 'workGroupId')),
                projectType: _.get(this.context, 'workBacklog.filter.projectType', null),
                projectStatus: _.get(this.context, 'workBacklog.filter.projectStatus', null),
                searchText: _.get(this.context, 'workBacklog.filter.searchText', null)
            }
            let tempData = await getWorkLog(request).catch(handleError);
            if (tempData) {
                // console.log('workLog', tempData);
                _.set(this.context, 'workBacklog.workLog', tempData);
                setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
            }
        }
    }

    // onDragStart = (event, workLogId) => {
    //     event.dataTransfer.setData("workLogId", workLogId);
    // }

    // onDragOver = (event) => {
    //     event.preventDefault();
    // }

    // onDrop = (event, newStatus) => {
    //     const { setGlobal, handleError } = this.context;
    //     let { modalData } = this.context;
    //     let id = event.dataTransfer.getData("workLogId");
    //     //Change Data Accoding to dropLocation
    //     let workLog = _.map(_.get(this.context, 'workBacklog.workLog'), (workLog) => {
    //         if (workLog.projectWorkId === _.toNumber(id)) {
    //             this.setState({ originalWorkLogState: _.cloneDeep(workLog) });
    //             const statusId = _.find(_.keys(projectStatus), key => projectStatus[key] === newStatus);
    //             if (id && (_.get(workLog, 'projectStatusId') !== _.toNumber(statusId))) {
    //                 //Open UndoState modal
    //                 modalData = {
    //                     modalType: 'UndoStatusModal',
    //                     show: true,
    //                     handleConfirm: () => {
    //                         this.setState({ undoState: true });
    //                         setGlobal('modalData', { show: false });
    //                     },
    //                     handleClose: async () => {
    //                         const updateWorklogMessage = await updateWorkLog(workLog).catch(handleError);
    //                         this.setState({ alertMessage: updateWorklogMessage });
    //                         setGlobal('modalData', { show: false });
    //                     }
    //                 };
    //                 setGlobal('modalData', modalData);
    //                 //Auto close UndoState modal
    //                 setTimeout(async () => {
    //                     _.set(modalData, 'show', false);
    //                     setGlobal('modalData', modalData);
    //                     this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    //                     const updateWorklogMessage = await updateWorkLog(workLog).catch(handleError);
    //                     this.setState({ alertMessage: updateWorklogMessage });
    //                 }, 2000);
    //                 clearTimeout();
    //             }
    //             _.set(workLog, 'projectStatusId', _.toNumber(statusId));
    //         }
    //         return workLog;
    //     });
    //     _.set(this.context, 'workBacklog.workLog', workLog);
    //     setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
    //     this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    // }

    // addWorkLogtime = (workLog) => {
    //     let { modalData, setGlobal } = this.context;
    //     if (workLog) {
    //         modalData = {
    //             modalType: 'AddWorkLogModal',
    //             show: true,
    //             data: workLog,
    //             handleConfirm: (message) => {
    //                 this.getWorkLogData();
    //                 setGlobal('modalData', { show: false });
    //                 this.setState({ alertMessage: message });
    //             }
    //         };
    //         setGlobal('modalData', modalData);
    //         this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    //     }
    // }

    // workItemPopover = (workLog) => {
    //     return (
    //         <Popover title="Popover" className='worklog-popover'>
    //             <Popover.Header as="h3" className='ellipsis'>TA{workLog.projectWorkId}: {workLog.title}</Popover.Header>
    //             <Popover.Body>
    //                 <div className='row'>
    //                     <div className='col strong'>Start Date:</div>
    //                     <div className='col'>{formatDate(workLog.startDate)}</div>
    //                 </div>
    //                 <div className='row'>
    //                     <div className='col strong'>End Date:</div>
    //                     <div className='col'>{formatDate(workLog.endDate)}</div>
    //                 </div>
    //                 <div className='row'>
    //                     <div className='col strong'>Orignal Estimation:</div>
    //                     <div className='col'>{formatTime(workLog.originalEstTime)} Hours</div>
    //                 </div>
    //                 <div className='row'>
    //                     <div className='col strong'>Remaning Time:</div>
    //                     <div className='col'>{formatTime(workLog.remainingEstTime)} Hours</div>
    //                 </div>
    //                 <div className='row'>
    //                     <div className='col strong'>Spent Time:</div>
    //                     <div className='col'>{formatTime(workLog.totalWorkDone)} Hours</div>
    //                 </div>
    //             </Popover.Body>
    //         </Popover>
    //     );
    // }

    // showWorkBacklogList = (projectStatusId, title) => {
    //     let workBacklogList = _.filter(_.get(this.context, 'workBacklog.workLog', []),
    //         data => _.get(data, 'projectStatusId', '') === _.toNumber(projectStatusId));
    //     return (
    //         <>
    //             <div className={'drag-column-title' + ' ' + bgStatus[projectStatusId]}>
    //                 {title} {(_.get(workBacklogList, 'length', 0) !== 0) && <span>({_.get(workBacklogList, 'length')})</span>}
    //             </div>
    //             {
    //                 _.map(workBacklogList,
    //                     (item, index) => (
    //                         <div className={'work-backlog' + ' ' + 'border-' + bgStatus[projectStatusId]}
    //                             onDragStart={(event) => this.onDragStart(event, _.get(item, 'projectWorkId', ''))}
    //                             draggable
    //                             key={index}>
    //                             <div className='d-flex justify-content-between'>
    //                                 <div className='d-flex align-items-center ellipsis'>
    //                                     <img className='imgPadding' src={taskImg} />
    //                                     <OverlayTrigger trigger={['hover', 'focus']} overlay={this.workItemPopover(item)}>
    //                                         <a href=''>{_.get(item, 'title', '')}</a>
    //                                     </OverlayTrigger>
    //                                 </div>
    //                                 <FontAwesomeIcon className='p-1 color-blue' icon={faClock} onClick={() => this.addWorkLogtime(item)} />
    //                             </div>
    //                             <div>{_.trim(_.get(item, 'assignedTo', '')) === '' ? 'Unassigned' : _.get(item, 'assignedTo', '')}</div>
    //                             <div className='strong'>{_.get(item, 'workPriority', '')}</div>
    //                             <ProgressBar now={(_.toNumber(_.get(item, 'totalWorkDone', 0)) / _.toNumber(_.get(item, 'originalEstTime', 1))) * 100} />
    //                         </div>
    //                     )
    //                 )
    //             }
    //         </>
    //     )
    // }

    getActiveWindowClass = (windowName) => {
        if (_.get(this.state, 'activeWindow', '') === windowName) {
            return 'active';
        }
        if (windowName === 'filterWindowActive') {
            if (_.get(this.state, 'filterWindowActive', false)) {
                return 'active';
            }
        }
        return '';
    }

    reloadData = () => {
        this.setState({ reload: true });
        setTimeout(() => {
            this.setState({ workGroupId: _.get(this.context, 'workBacklog.filter.workGroupId', localStorage.getItem('workGroupId')) });
            this.getWorkLogData();
            this.setState({ reload: false });
        }, 1500);
        clearTimeout();
    }

    handelFilterValueChange = (event, field) => {
        const { setGlobal } = this.context;
        let value = _.get(event, 'target.value', _.toString(event));
        switch (field) {
            case 'workGroup':
                _.set(this.context, 'workBacklog.filter.workGroupId', value);
                break;
            case 'type':
                _.set(this.context, 'workBacklog.filter.projectType', value);
                break;
            case 'status':
                _.set(this.context, 'workBacklog.filter.projectStatus', value);
                break;
            case 'search':
                _.set(this.context, 'workBacklog.filter.searchText', value);
                break;
            default:
                break;
        }
        setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    handleClear = () => {
        const { setGlobal } = this.context;
        _.set(this.context, 'workBacklog.filter.workGroupId', localStorage.getItem('workGroupId'));
        _.set(this.context, 'workBacklog.filter.searchText', null);
        _.set(this.context, 'workBacklog.filter.projectType', null);
        _.set(this.context, 'workBacklog.filter.projectStatus', null);
        setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
        this.reloadData();
    }

    render() {
        const projectName = localStorage.getItem('projectName');
        const title = _.get(this.context, 'workBacklog.workGroupInfo.title', '');
        const startDate = formatDate(_.get(this.context, 'workBacklog.workGroupInfo.startDate', ''));
        const endDate = formatDate(_.get(this.context, 'workBacklog.workGroupInfo.endDate', ''));
        const toggleFilter = () => { this.setState({ filterWindowActive: !_.get(this.state, 'filterWindowActive') }) };
        const activeWindow = _.get(this.state, 'activeWindow');
        return (
            <div className='project-container py-1 px-3 text-select-none'>
                <div className='pb-2'>
                    {projectName ? projectName : 'Project'} <FontAwesomeIcon icon={faAngleRight} />
                    <span className='font-weight-normal'> Work Backlog</span>
                    <h4 className='blue_border px-0 pt-2'>Work Backlog {(_.get(this.context, 'workBacklog.workGroupInfo', '') !== '') &&
                        <span className='work-group-lbl'>
                            <span className='strong'>WorkGroup: </span>
                            {`${title} (${startDate} - ${endDate})`}
                        </span>
                    }
                    </h4>
                    {/* <AlertPopUp /> */}
                    <AlertComponent
                        show={_.get(this.state, 'alertMessage') !== ''}
                        alertMessage={_.get(this.state, 'alertMessage')}
                        type={'success'} />
                    <ToolBar
                        setActiveWindow={(value) => this.setState({ activeWindow: value })}
                        toggleFilter={toggleFilter}
                        getActiveWindowClass={this.getActiveWindowClass}
                        reloadData={this.reloadData} />
                    {/* <div className='workbacklog-nav'>
                        <button className='btn btn-default'><FontAwesomeIcon icon={faPlus} /> New</button>
                        <div className='tool-bar'>
                            <Tooltip title="Dashboard">
                                <button className={`btn btn-default ${this.getActiveWindowClass('dashboard')}`}
                                    onClick={() => { this.setState({ activeWindow: 'dashboard' }) }}>
                                    <FontAwesomeIcon icon={faDashboard} />
                                </button>
                            </Tooltip>
                            <Tooltip title="List View">
                                <button className={`btn btn-default ${this.getActiveWindowClass('listView')}`}
                                    onClick={() => { this.setState({ activeWindow: 'listView' }) }}>
                                    <FontAwesomeIcon icon={faList} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Box View">
                                <button className={`btn btn-default ${this.getActiveWindowClass('boxView')}`}
                                    onClick={() => { this.setState({ activeWindow: 'boxView' }) }} >
                                    <FontAwesomeIcon icon={faTh} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Team Rooster Details">
                                <button className={`btn btn-default ${this.getActiveWindowClass('teamRooster')}`}
                                    onClick={() => { this.setState({ activeWindow: 'teamRooster' }) }} >
                                    <FontAwesomeIcon icon={faListAlt} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Activity Stream">
                                <button className={`btn btn-default ${this.getActiveWindowClass('activityStream')}`}
                                    onClick={() => { this.setState({ activeWindow: 'activityStream' }) }} >
                                    <FontAwesomeIcon icon={faHistory} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Work Log">
                                <button className={`btn btn-default ${this.getActiveWindowClass('workLog')}`}
                                    onClick={() => { this.setState({ activeWindow: 'workLog' }) }}>
                                    <FontAwesomeIcon icon={faClock} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Refresh">
                                <button className='btn btn-default' onClick={this.reloadData}>
                                    <FontAwesomeIcon icon={faRefresh} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Filter">
                                <button className={`btn btn-default ${this.getActiveWindowClass('filterWindowActive')}`} onClick={toggleFilter}>
                                    <FontAwesomeIcon icon={faFilter} />
                                </button>
                            </Tooltip>
                        </div>
                    </div> */}
                    {
                        _.get(this.state, 'filterWindowActive', false) &&
                        <div>
                            <div className='filter-body p-2'>
                                {(activeWindow !== 'activityStream') &&
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-6'>
                                            <div className="form-group mb-0 p-2">
                                                <label>Work Group</label>
                                                <select
                                                    className="form-select"
                                                    value={_.get(this.context, 'workBacklog.filter.workGroupId', localStorage.getItem('workGroupId'))}
                                                    onChange={(e) => this.handelFilterValueChange(e, 'workGroup')}>
                                                    {
                                                        _.map(_.get(this.context, 'workBacklog.workGroups', {}), (data, index) => {
                                                            return (
                                                                <option key={index} value={_.get(data, 'keyId')}>{_.get(data, 'dataValue')}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            !_.includes(['teamRooster', 'workLog'], activeWindow) &&
                                            <div className='col-lg-3 col-md-6'>
                                                <div className="form-group mb-0 p-2">
                                                    <label>Type</label>
                                                    <MultipleSelect Options={workFlowTypeOptions}
                                                        onChange={(val) => this.handelFilterValueChange(val, 'type')}
                                                        value={_.get(this.context, 'workBacklog.filter.projectType', null)} />
                                                </div>
                                            </div>
                                        }
                                        {
                                            !_.includes(['teamRooster', 'workLog'], activeWindow) &&
                                            <div className='col-lg-3 col-md-6'>
                                                <div className="form-group mb-0 p-2">
                                                    <label>Status</label>
                                                    <MultipleSelect Options={projectStatusOptions}
                                                        onChange={(val) => this.handelFilterValueChange(val, 'status')}
                                                        value={_.get(this.context, 'workBacklog.filter.projectStatus', null)} />
                                                </div>
                                            </div>
                                        }
                                        {
                                            !_.includes(['teamRooster', 'workLog'], activeWindow) &&
                                            <div className='col-lg-3 col-md-6'>
                                                <div className="form-group mb-0 p-2">
                                                    <label>Search</label>
                                                    <input className="form-control"
                                                        value={_.get(this.context, 'workBacklog.filter.searchText') ? _.get(this.context, 'workBacklog.filter.searchText') : ''}
                                                        onChange={(e) => this.handelFilterValueChange(e, 'search')} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className='filter-footer p-2'>
                                <button
                                    className='btn btn-primary rounded-0 me-2'
                                    onClick={this.reloadData}>
                                    <FontAwesomeIcon icon={faSearch} /> Search
                                </button>
                                <button
                                    className='btn btn-default rounded-0'
                                    onClick={this.handleClear}> <FontAwesomeIcon icon={faRefresh} /> Clear</button>
                            </div>
                        </div>
                    }
                    {/* {
                        !_.get(this.state, 'reload', false) && <div className='work-group-container mt-2'>
                            {_.map(_.entries(projectStatus), ([key, value]) => (
                                <div key={key} className='drag-column'
                                    onDragOver={(event) => this.onDragOver(event)}
                                    onDrop={(event) => { this.onDrop(event, projectStatus[key]) }}
                                >
                                    {this.showWorkBacklogList(key, value)}
                                </div>
                            ))}
                        </div>
                    } */}
                    { 
                    !_.get(this.state, 'reload', false) && 
                    <DashBoard getWorkLogData={this.getWorkLogData}
                    setAlertMessage = {(message) => {this.setState({ alertMessage: message })}}/> 
                    }
                    {
                        _.get(this.state, 'reload', false) &&
                        <div className='worklog-loader'>
                            <ModualLoader />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default WorkBacklog;