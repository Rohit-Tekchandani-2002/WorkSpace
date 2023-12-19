import _ from 'lodash';
import './BoxView.css';
import { Component } from "react";
import { workBacklogDefaultContext } from '../../../../constants/workBackLogConstants';
import taskImg from "../../../../assets/img/task.png";
import RootContext from '../../../../context/RootContext/RootContext';
import { bgStatus, priority, projectStatus, workFlowType } from '../../../../constants/constants';
import { faAngleDown, faClock } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, formatTime } from '../../../../config/utility';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import AuthContext from '../../../../context/AuthContext/AuthContext';

class BoxView extends Component {
    static contextType = RootContext;
    state = {}

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
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

    getAccodion = (title, list) => {
        return (
            <Accordion className='w-100' defaultExpanded={true}>
                <AccordionSummary className='border' expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                    {title}
                </AccordionSummary>
                <AccordionDetails className='p-0'>
                    <div className='row'>
                        {
                            _.map(list,
                                (item, index) => (
                                    <div className={'col-lg-3 col-md-4 mb-3'} key={index}>
                                        <div className={'work-backlog' + ' ' + 'border-' + bgStatus[_.get(item, 'projectStatusId')]}>
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
                                    </div>
                                )
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        );
    }

    showAccordion = (workLog, groupBy) => {
        let content = null;
        switch (groupBy) {
            case 'assignedTo':
                const unAssignedToList = _.filter(workLog, data => _.trim(_.get(data, 'assignedTo', '')) === '');
                const assignedToList = _.filter(workLog, data => _.trim(_.get(data, 'assignedTo', '')) !== '');
                content = (
                    <>
                        {(_.get(unAssignedToList, 'length', 0) > 0) && this.getAccodion('Unassigned', unAssignedToList)}
                        {
                            (_.get(assignedToList, 'length', 0) > 0) &&
                            <AuthContext.Consumer>
                                {
                                    authContext => {
                                        const userName = _.get(authContext, 'userData.firstName', 'User') + ' ' + _.get(authContext, 'userData.lastName', '');
                                        return this.getAccodion(userName, assignedToList);
                                    }
                                }
                            </AuthContext.Consumer>
                        }
                    </>
                )
                break;
            case 'type':
                content = _.map(_.entries(workFlowType), ([key, value]) => {
                    const list = _.filter(workLog, data => _.get(data, 'workFlow', 0) === _.toNumber(key));
                    if (_.get(list, 'length', 0) > 0) {
                        return (
                            <div key={key}>
                                {this.getAccodion(value, list)}
                            </div>
                        );
                    }
                })
                break;
            case 'status':
                content = _.map(_.entries(projectStatus), ([key, value]) => {
                    const list = _.filter(workLog, data => _.get(data, 'projectStatusId', 0) === _.toNumber(key));
                    if (_.get(list, 'length', 0) > 0) {
                        return (
                            <div key={key}>
                                {this.getAccodion(value, list)}
                            </div>
                        );
                    }
                })
                break;
            case 'priority':
                content = _.map(_.entries(priority), ([key, value]) => {
                    const list = _.filter(workLog, data => _.get(data, 'workPriority', '') === key);
                    if (_.get(list, 'length', 0) > 0) {
                        return (
                            <div key={key}>
                                {this.getAccodion(value, list)}
                            </div>
                        );
                    }
                })
                break;
            default:
                break;
        }
        return content;
    }

    render() {
        const workLog = _.get(this.context, 'workBacklog.workLog', []);
        const groupBy = _.get(this.props, 'groupBy', 'none');
        return (
            <>
                {
                    (groupBy === 'none') &&
                    <div className=' border mt-2 p-2'>
                        <div className='row'>
                            {
                                _.map(workLog,
                                    (item, index) => (
                                        <div className={'col-lg-3 col-md-4 mb-3'} key={index}>
                                            <div className={'work-backlog' + ' ' + 'border-' + bgStatus[_.get(item, 'projectStatusId')]}>
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
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                }
                {
                    (groupBy !== 'none') &&
                    <div className='mt-2 p-0'>
                        {this.showAccordion(workLog, groupBy)}
                    </div>
                }
            </>
        );
    }
}

export default BoxView;