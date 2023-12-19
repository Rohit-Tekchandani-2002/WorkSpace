import _, { assign } from 'lodash';
import './DashBoard.css';
import { Component } from 'react';
import { bgStatus, projectStatus } from '../../../../constants/constants';
import RootContext from '../../../../context/RootContext/RootContext';
import taskImg from "../../../../assets/img/task.png";
import { OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { formatDate, formatTime } from '../../../../config/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faClock } from '@fortawesome/free-solid-svg-icons';
import { updateWorkLog } from '../../../../services/Project/project.service';
import { workBacklogDefaultContext } from '../../../../constants/workBackLogConstants';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import AuthContext from '../../../../context/AuthContext/AuthContext';

class DashBoard extends Component {
    static contextType = RootContext;
    state = {
        refershModule: false,
        originalWorkLogState: null,
        alertMessage: '',
        undoState: false,
    }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'undoState') !== _.get(prevState, 'undoState'))) {
            const { setGlobal, handleError } = this.context;
            if (_.get(this.state, 'undoState')) {
                let workLog = _.map(_.get(this.context, 'workBacklog.workLog', {}),
                    (data) => {
                        if (_.get(data, 'projectWorkId') === _.get(this.state, 'originalWorkLogState.projectWorkId')) {
                            _.set(data, 'projectStatusId', _.get(this.state, 'originalWorkLogState.projectStatusId'));
                            updateWorkLog(data).catch(handleError);
                        }
                        return data;
                    }
                )
                _.set(this.context, 'workBacklog.workLog', workLog);
                setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
            }
            this.setState({ undoState: false });
        }
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

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, newStatus) => {
        const { setGlobal, handleError } = this.context;
        let { modalData } = this.context;
        let id = event.dataTransfer.getData("workLogId");
        //Change Data Accoding to dropLocation
        let workLog = _.map(_.get(this.context, 'workBacklog.workLog'), (workLog) => {
            if (workLog.projectWorkId === _.toNumber(id)) {
                this.setState({ originalWorkLogState: _.cloneDeep(workLog) });
                const statusId = _.find(_.keys(projectStatus), key => projectStatus[key] === newStatus);
                if (id && (_.get(workLog, 'projectStatusId') !== _.toNumber(statusId))) {
                    //Open UndoState modal
                    modalData = {
                        modalType: 'UndoStatusModal',
                        show: true,
                        handleConfirm: () => {
                            this.setState({ undoState: true });
                            setGlobal('modalData', { show: false });
                        },
                        handleClose: async () => {
                            const updateWorklogMessage = await updateWorkLog(workLog).catch(handleError);
                            this.setState({ alertMessage: updateWorklogMessage });
                            setGlobal('modalData', { show: false });
                        }
                    };
                    setGlobal('modalData', modalData);
                    //Auto close UndoState modal
                    setTimeout(async () => {
                        _.set(modalData, 'show', false);
                        setGlobal('modalData', modalData);
                        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
                        const updateWorklogMessage = await updateWorkLog(workLog).catch(handleError);
                        this.props.setAlertMessage(updateWorklogMessage);
                    }, 2000);
                    clearTimeout();
                }
                _.set(workLog, 'projectStatusId', _.toNumber(statusId));
            }
            return workLog;
        });
        _.set(this.context, 'workBacklog.workLog', workLog);
        setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    onDragStart = (event, workLogId) => {
        event.dataTransfer.setData("workLogId", workLogId);
    }

    workItemPopover = (workLog) => {
        return (
            <Popover title="Popover" className='worklog-popover'>
                <Popover.Header as="h3" className='ellipsis'>TA{workLog.projectWorkId}: {workLog.title}</Popover.Header>
                <Popover.Body>
                    <div className='row'>
                        <div className='col strong'>Start Date:</div>
                        <div className='col'>{formatDate(workLog.startDate)}</div>
                    </div>
                    <div className='row'>
                        <div className='col strong'>End Date:</div>
                        <div className='col'>{formatDate(workLog.endDate)}</div>
                    </div>
                    <div className='row'>
                        <div className='col strong'>Orignal Estimation:</div>
                        <div className='col'>{formatTime(workLog.originalEstTime)} Hours</div>
                    </div>
                    <div className='row'>
                        <div className='col strong'>Remaning Time:</div>
                        <div className='col'>{formatTime(workLog.remainingEstTime)} Hours</div>
                    </div>
                    <div className='row'>
                        <div className='col strong'>Spent Time:</div>
                        <div className='col'>{formatTime(workLog.totalWorkDone)} Hours</div>
                    </div>
                </Popover.Body>
            </Popover>
        );
    }

    showWorkBacklogList = (projectStatusId, title) => {
        const workBacklogList = _.filter(_.get(this.context, 'workBacklog.workLog', []),
            data => _.get(data, 'projectStatusId', '') === _.toNumber(projectStatusId));
        return (
            <>
                <div className={'drag-column-title' + ' ' + bgStatus[projectStatusId]}>
                    {title} {(_.get(workBacklogList, 'length', 0) !== 0) && <span>({_.get(workBacklogList, 'length')})</span>}
                </div>
                {
                    _.map(workBacklogList,
                        (item, index) => (
                            <div className={'work-backlog' + ' ' + 'border-' + bgStatus[projectStatusId]}
                                onDragStart={(event) => this.onDragStart(event, _.get(item, 'projectWorkId', ''))}
                                draggable
                                key={index}>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center ellipsis'>
                                        <img className='imgPadding' src={taskImg} />
                                        <OverlayTrigger trigger={['hover', 'focus']} overlay={this.workItemPopover(item)}>
                                            <a href=''>{_.get(item, 'title', '')}</a>
                                        </OverlayTrigger>
                                    </div>
                                    <FontAwesomeIcon className='p-1 color-blue' icon={faClock} onClick={() => this.props.addWorkLogtime(item)} />
                                </div>
                                <div>{_.trim(_.get(item, 'assignedTo', '')) === '' ? 'Unassigned' : _.get(item, 'assignedTo', '')}</div>
                                <div className='strong'>{_.get(item, 'workPriority', '')}</div>
                                <ProgressBar now={(_.toNumber(_.get(item, 'totalWorkDone', 0)) / _.toNumber(_.get(item, 'originalEstTime', 1))) * 100} />
                            </div>
                        )
                    )
                }
            </>
        )
    }

    showWorkLogForAssignedTo = (projectStatusId, Unassigned) => {
        const workBacklogList = _.filter(_.get(this.context, 'workBacklog.workLog', []),
            data => (_.get(data, 'projectStatusId', '') === _.toNumber(projectStatusId)) && ((_.trim(_.get(data, 'assignedTo', '')) === '') === Unassigned));
        return (
            <>
                {
                    _.map(workBacklogList,
                        (item, index) => (
                            <div className={'work-backlog' + ' ' + 'border-' + bgStatus[projectStatusId]}
                                onDragStart={(event) => this.onDragStart(event, _.get(item, 'projectWorkId', ''))}
                                draggable
                                key={index}>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center ellipsis'>
                                        <img className='imgPadding' src={taskImg} />
                                        <OverlayTrigger trigger={['hover', 'focus']} overlay={this.workItemPopover(item)}>
                                            <a href=''>{_.get(item, 'title', '')}</a>
                                        </OverlayTrigger>
                                    </div>
                                    <FontAwesomeIcon className='p-1 color-blue' icon={faClock} onClick={() => this.props.addWorkLogtime(item)} />
                                </div>
                                <div>{_.trim(_.get(item, 'assignedTo', '')) === '' ? 'Unassigned' : _.get(item, 'assignedTo', '')}</div>
                                <div className='strong'>{_.get(item, 'workPriority', '')}</div>
                                <ProgressBar now={(_.toNumber(_.get(item, 'totalWorkDone', 0)) / _.toNumber(_.get(item, 'originalEstTime', 1))) * 100} />
                            </div>
                        )
                    )
                }
            </>
        )
    }

    getDashBoardContent = () => {
        let isAssignedTo = _.get(this.props, 'groupBy', 'none') === 'assignedTo';
        if (isAssignedTo) {
            return (
                <div>
                    <div className='worklog-title-container'>
                        {_.map(_.entries(projectStatus), ([key, value]) => (
                            <div key={key} className='drag-column'
                                onDragOver={(event) => this.onDragOver(event)}
                                onDrop={(event) => { this.onDrop(event, projectStatus[key]) }}
                            >
                                <div className={'drag-column-title' + ' ' + bgStatus[key]}> {value} </div>
                            </div>
                        ))}
                    </div>
                    <Accordion className='w-100' defaultExpanded={true}>
                        <AccordionSummary className='border' expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                            <Typography>Unassigned</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='p-0'>
                            <div className='work-group-container border-0'>
                                {_.map(_.entries(projectStatus), ([key, _value]) => (
                                    <div key={key} className='drag-column'
                                        onDragOver={(event) => this.onDragOver(event)}
                                        onDrop={(event) => { this.onDrop(event, projectStatus[key]) }}
                                    >
                                        {this.showWorkLogForAssignedTo(key, true)}
                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='w-100' defaultExpanded={true}>
                        <AccordionSummary className='border' expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                            <AuthContext.Consumer>
                                {
                                    authContext => {
                                        const userName = _.get(authContext, 'userData.firstName', 'Assigned') + ' ' + _.get(authContext, 'userData.lastName', '');
                                        return (<Typography>{userName}</Typography>);
                                    }
                                }
                            </AuthContext.Consumer>
                        </AccordionSummary>
                        <AccordionDetails className='p-0'>
                            <div className='work-group-container border-0'>
                                {_.map(_.entries(projectStatus), ([key, _value]) => (
                                    <div key={key} className='drag-column'
                                        onDragOver={(event) => this.onDragOver(event)}
                                        onDrop={(event) => { this.onDrop(event, projectStatus[key]) }}
                                    >
                                        {this.showWorkLogForAssignedTo(key, false)}
                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            );
        } 
        else {
            return (
                <div className='work-group-container'>
                    {_.map(_.entries(projectStatus), ([key, value]) => (
                        <div key={key} className='drag-column'
                            onDragOver={(event) => this.onDragOver(event)}
                            onDrop={(event) => { this.onDrop(event, projectStatus[key]) }}
                        >
                            {this.showWorkBacklogList(key, value)}
                        </div>
                    ))}
                </div>
            );
        }
    }

    render() {
        const isFilterActive = _.get(this.props, 'isFilterActive', false);
        return (
            <div className={isFilterActive ? 'work-container-scroll' : 'mt-2'}>
                {
                    this.getDashBoardContent()
                }
            </div>
        );
    }
}

export default DashBoard;