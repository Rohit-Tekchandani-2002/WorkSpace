import { Component } from 'react';
import './ListView.css';
import RootContext from '../../../../context/RootContext/RootContext';
import { ProgressBar, Table } from 'react-bootstrap';
import _ from 'lodash';
import { workBacklogDefaultContext } from '../../../../constants/workBackLogConstants';
import { formatDate, formatTime } from '../../../../config/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faClock, faMinus, faPlus, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { priority, projectStatus, workFlowType } from '../../../../constants/constants';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import AuthContext from '../../../../context/AuthContext/AuthContext';

class ListView extends Component {
    static contextType = RootContext;
    state = {
        refreshModule: false,
        rowToggle: {
            rowToggle1: false,
            rowToggle2: false
        }
    }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
    }

    selectProjectStateClass = (statusId) => {
        let tempClassName = '';
        switch (statusId) {
            case 1:
                tempClassName = 'new';
                break;
            case 2:
                tempClassName = 'in-progress';
                break;
            case 3:
                tempClassName = 'dev-completed';
                break;
            case 4:
                tempClassName = 'ready-for-testing';
                break;
            case 5:
                tempClassName = 'closed';
                break;
            default:
                tempClassName = ''
        }
        return tempClassName;
    };

    getSortIcon = (field) => {
        let workBacklog = _.get(this.context, 'workBacklog');
        let expression = _.get(workBacklog, 'filter.expression', 'title');
        let isSortByAsc = _.get(workBacklog, 'filter.isSortByAsc', true);
        if (expression === field) {
            if (isSortByAsc) {
                return <FontAwesomeIcon icon={faSortUp} />
            } else {
                return <FontAwesomeIcon icon={faSortDown} />
            }
        } else {
            return <FontAwesomeIcon icon={faSort} />
        }
    };

    sortData = (field) => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        let isSortByAsc = _.get(workBacklog, 'filter.isSortByAsc', true);
        let filter = _.get(workBacklogDefaultContext, 'filter');
        _.set(workBacklog, 'filter', filter);
        _.set(workBacklog, 'filter.expression', field);
        _.set(workBacklog, 'filter.isSortByAsc', !isSortByAsc);
        setGlobal('workBacklog', workBacklog);
        this.props.reloadData();
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule', false) });
    }

    getAccodion = (title, list, addWorkLogtime) => {
        const itemCount = _.get(list, 'length', 0);
        const workedHours = _.reduce(list, (workedHours, list) => {
            return (workedHours + _.get(list, 'totalWorkDone', 0))
        }, 0);
        const remaningHours = _.reduce(list, (workedHours, list) => {
            return (workedHours + _.get(list, 'remainingEstTime', 0))
        }, 0);
        const orignalHours = _.reduce(list, (workedHours, list) => {
            return (workedHours + _.get(list, 'originalEstTime', 0))
        }, 0);
        return (
            <Accordion className='w-100' defaultExpanded={true}>
                <AccordionSummary className='border' expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                    <span className='ps-1 d-flex align-items-center'>
                        <span>{title} {itemCount} items, {formatTime(workedHours)} Hours worked, {formatTime(remaningHours)} Hours remanining</span>
                        <ProgressBar className='workbacklog-progress-bar' now={(workedHours / orignalHours) * 100} />
                    </span>
                </AccordionSummary>
                <AccordionDetails className='p-0'>
                    <Table bordered responsive hover>
                        <tbody>
                            {_.map(list, (data, index) => {
                                return (
                                    <tr key={index}>
                                        <td><div className={`${this.selectProjectStateClass(_.get(data, 'projectStatusId'))}  project-status-tag`} ></div></td>
                                        <td>{_.get(data, 'title')}</td>
                                        <td>{projectStatus[_.get(data, 'projectStatusId')]}</td>
                                        <td>{_.get(data, 'workPriority')}</td>
                                        <td>{(_.trim(_.get(data, 'assignedTo')) === '') ? 'Unassigned' : _.get(data, 'assignedTo')}</td>
                                        <td><span className='small-width'>{formatDate(_.get(data, 'endDate'))}</span></td>
                                        <td><span className='small-width'>{formatDate(_.get(data, 'startDate'))}</span></td>
                                        <td>{formatTime(_.get(data, 'originalEstTime'))} Hrs</td>
                                        <td>{formatTime(_.get(data, 'remainingEstTime'))} Hrs</td>
                                        <td>{formatTime(_.get(data, 'totalWorkDone'))} Hrs</td>
                                        <td className='text-center'><FontAwesomeIcon icon={faClock} onClick={() => addWorkLogtime(data)} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        );
    }

    showAccordion = (workLog, addWorkLogtime, groupBy) => {
        let content = null;
        switch (groupBy) {
            case 'assignedTo':
                const unAssignedToList = _.filter(workLog, data => _.trim(_.get(data, 'assignedTo', '')) === '');
                const assignedToList = _.filter(workLog, data => _.trim(_.get(data, 'assignedTo', '')) !== '');
                content = (
                    <>
                        {(_.get(unAssignedToList, 'length', 0) > 0) && this.getAccodion('Unassigned', unAssignedToList, addWorkLogtime)}
                        {
                            (_.get(assignedToList, 'length', 0) > 0) &&
                            <AuthContext.Consumer>
                                {
                                    authContext => {
                                        const userName = _.get(authContext, 'userData.firstName', 'User') + ' ' + _.get(authContext, 'userData.lastName', '');
                                        return this.getAccodion(userName, assignedToList, addWorkLogtime);
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
                                {this.getAccodion(value, list, addWorkLogtime)}
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
                                {this.getAccodion(value, list, addWorkLogtime)}
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
                                {this.getAccodion(value, list, addWorkLogtime)}
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

    toggleAccrodian = (accrodianName) => {
        let rowToggle = {
            rowToggle1: false,
            rowToggle2: false
        }
        // let rowToggle = _.get(this.state, 'rowToggle');
        switch (accrodianName) {
            case 'rowToggle1':
                _.set(rowToggle, 'rowToggle1', !_.get(this.state, 'rowToggle.rowToggle1'));
                break;
            case 'rowToggle2':
                _.set(rowToggle, 'rowToggle2', !_.get(this.state, 'rowToggle.rowToggle2'));
                break;
            default:
                break;
        }
        this.setState({ rowToggle: rowToggle });
    }

    render() {
        const workLog = _.get(this.context, 'workBacklog.workLog', []);
        const tableLength = _.get(workLog, 'length', 0);
        const { addWorkLogtime, groupBy } = this.props;
        return (
            <>
                <div className='mt-2'>
                    {
                        (tableLength === 0) ?
                            <div className='border p-2'>
                                No Data Found
                            </div> :
                            <>
                                <Table bordered responsive hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th onClick={() => this.sortData('title')}>
                                                <span className='flex-between'><span>Title</span> {this.getSortIcon('title')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('projectstatus')}>
                                                <span className='flex-between'><span>Status</span> {this.getSortIcon('projectstatus')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('workpriority')}>
                                                <span className='flex-between'><span>Priority</span> {this.getSortIcon('workpriority')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('assignedto')}>
                                                <span className='flex-between'><span>Assigned To</span> {this.getSortIcon('assignedto')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('startdate')}>
                                                <span className='flex-between'><span>Start Date</span> {this.getSortIcon('startdate')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('enddate')}>
                                                <span className='flex-between'><span>End Date</span> {this.getSortIcon('enddate')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('originalesttime')}>
                                                <span className='flex-between'><span>Orignal Est</span> {this.getSortIcon('originalesttime')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('remainingesttime')}>
                                                <span className='flex-between'><span>Remaning Est</span> {this.getSortIcon('remainingesttime')} </span>
                                            </th>
                                            <th onClick={() => this.sortData('totalworkdone')}>
                                                <span className='flex-between'><span>Time Spent</span> {this.getSortIcon('totalworkdone')} </span>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {(groupBy === 'none') &&
                                        <tbody>
                                            {_.map(workLog, (data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><div className={`${this.selectProjectStateClass(_.get(data, 'projectStatusId'))}  project-status-tag`} ></div></td>
                                                        <td>{_.get(data, 'title')}</td>
                                                        <td>{projectStatus[_.get(data, 'projectStatusId')]}</td>
                                                        <td>{_.get(data, 'workPriority')}</td>
                                                        <td>{(_.trim(_.get(data, 'assignedTo')) === '') ? 'Unassigned' : _.get(data, 'assignedTo')}</td>
                                                        <td><span className='small-width'>{formatDate(_.get(data, 'endDate'))}</span></td>
                                                        <td><span className='small-width'>{formatDate(_.get(data, 'startDate'))}</span></td>
                                                        <td>{formatTime(_.get(data, 'originalEstTime'))} Hrs</td>
                                                        <td>{formatTime(_.get(data, 'remainingEstTime'))} Hrs</td>
                                                        <td>{formatTime(_.get(data, 'totalWorkDone'))} Hrs</td>
                                                        <td className='text-center'><FontAwesomeIcon icon={faClock} onClick={() => addWorkLogtime(data)} /></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    }
                                </Table>
                                {this.showAccordion(workLog, addWorkLogtime, groupBy)}
                            </>
                    }
                    {
                        (tableLength !== 0) &&
                        <div className='t-footer'>
                            Showing 1 to {tableLength} of {tableLength} entries
                        </div>
                    }
                </div>
                <div className='mt-2'>
                    <div className="custom-table">
                        <div className="table-head">
                            <div className="table-cell medium">heading 1</div>
                            <div className="table-cell medium">heading 2</div>
                            <div className="table-cell medium">heading 3</div>
                            <div className="table-cell medium">heading 4</div>
                            <div className="table-cell short"></div>
                        </div>
                        <div className="table-body">
                            <div className="table-row">
                                <div className="table-cell medium">data 1</div>
                                <div className="table-cell medium">data 2</div>
                                <div className="table-cell medium">data 3</div>
                                <div className="table-cell medium">data 4</div>
                                <div className="table-cell short text-center">
                                    <FontAwesomeIcon icon={_.get(this.state, 'rowToggle.rowToggle1') ? faMinus : faPlus} onClick={() => this.toggleAccrodian('rowToggle1')} />
                                </div>
                            </div>
                            <div className={`accrodian ${_.get(this.state, 'rowToggle.rowToggle1') ? 'accrodian-open' : ''}`}>
                                <div className='accrodian-content'>
                                    <div className="custom-table">
                                        <div className="table-head">
                                            <div className="table-cell medium">heading 1</div>
                                            <div className="table-cell medium">heading 2</div>
                                        </div>
                                        <div className="table-body">
                                            <div className="table-row">
                                                <div className="table-cell medium">data 1</div>
                                                <div className="table-cell medium">data 2</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-row"> 
                                <div className="table-cell medium">data 1</div>
                                <div className="table-cell medium">data 2</div>
                                <div className="table-cell medium">data 3</div>
                                <div className="table-cell medium">data 4</div>
                                <div className="table-cell short text-center">
                                    <FontAwesomeIcon icon={_.get(this.state, 'rowToggle.rowToggle2') ? faMinus : faPlus} onClick={() => this.toggleAccrodian('rowToggle2')} />
                                </div>
                            </div>
                            <div className={`accrodian ${_.get(this.state, 'rowToggle.rowToggle2') ? 'accrodian-open' : ''}`}>
                                <div className='accrodian-content'>
                                    <div className="custom-table">
                                        <div className="table-head">
                                            <div className="table-cell medium">heading 1</div>
                                            <div className="table-cell medium">heading 2</div>
                                        </div>
                                        <div className="table-body">
                                            <div className="table-row">
                                                <div className="table-cell medium">data 1</div>
                                                <div className="table-cell medium">data 2</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

export default ListView;