import { Component } from "react";
import './WorkLog.css';
import { deleteWorkLog, getWorkBackLogWithPagination } from "../../../../services/Project/project.service";
import RootContext from "../../../../context/RootContext/RootContext";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { workBacklogDefaultContext } from "../../../../constants/workBackLogConstants";
import { formatDate, formatTime } from "../../../../config/utility";
import taskImg from '../../../../assets/img/task.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSort, faSortDown, faSortUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { modalDefaultContext } from "../../../../constants/modalConstants";

class WorkLog extends Component {
    static contextType = RootContext;
    state = {
        workBackLog: null,
        filter: {
            pageNumber: 1,
            pageSize: 3,
            expression: 'title',
            isSortByAsc: true
        }
    }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
        this.getWorkBackLog();
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'filter') !== _.get(prevState, 'filter'))) {
            this.getWorkBackLog();
        }
    }

    getWorkBackLog = async () => {
        const { handleError } = this.context;
        let workGroupId = _.get(this.context, 'workBacklog.filter.workGroupId', localStorage.getItem('workGroupId'));
        let request = {
            workGroupId: workGroupId,
            ..._.get(this.state, 'filter', {
                pageNumber: 1,
                pageSize: 3,
                expression: 'title',
                isSortByAsc: true
            })
        }
        let tempData = await getWorkBackLogWithPagination(request).catch(handleError);
        if (tempData) {
            console.log('tempData', tempData);
            this.setState({ workBackLog: tempData });
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

    sortData = (field) => {
        let isSortByAsc = _.get(this.state, 'filter.isSortByAsc', true);
        let filter = _.get(this.state, 'filter', {
            pageNumber: 1,
            pageSize: 3,
            expression: 'title',
            isSortByAsc: true
        });
        this.setState({ filter: { ...filter, expression: field, isSortByAsc: !isSortByAsc } });
    }

    getSortIcon = (field) => {
        let expression = _.get(this.state, 'filter.expression', 'title');
        let isSortByAsc = _.get(this.state, 'filter.isSortByAsc', true);
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

    handleChange = (event, field) => {
        const value = _.get(event, 'target.value', null);
        let filter = _.get(this.state, 'filter', {
            pageNumber: 1,
            pageSize: 3,
            expression: 'title',
            isSortByAsc: true
        });
        const pageNumber = _.get(this.state, 'filter.pageNumber', 1);
        const totalRecords = _.get(this.state, 'workBackLog.totalProjectBacklogs', 0);
        const pageSize = _.get(this.state, 'filter.pageSize', 3);
        const lastPageNumber = _.floor(totalRecords / pageSize);
        switch (field) {
            case 'pageNumber':
                this.setState({ filter: { ...filter, pageNumber: value } });
                break;
            case 'pageSize':
                this.setState({ filter: { ...filter, pageSize: value } });
                break;
            case 'previous':
                if (pageNumber > 1) {
                    this.setState({ filter: { ...filter, pageNumber: pageNumber - 1 } });
                }
                break;
            case 'next':
                if (lastPageNumber > pageNumber) {
                    this.setState({ filter: { ...filter, pageNumber: pageNumber + 1 } });
                }
                break;
            default:
                break;
        }
    }

    editWorkLog = (workLog) => {
        let { modalData, setGlobal } = this.context;
        if (workLog) {
            modalData = {
                modalType: 'EditWorkLogModal',
                show: true,
                data: workLog,
                handleConfirm: (message) => {
                    if(message){
                        this.props.setAlertMessage(message);
                        this.getWorkBackLog();
                        this.setState({ refershModule: !_.get(this.state, 'refershModule') });   
                    }
                }
            };
            setGlobal('modalData', modalData);
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

    deleteProjectWorkLog = async(id) => {
        let message = await deleteWorkLog(id);
        if(message){
            this.props.setAlertMessage(message);
            this.getWorkBackLog();
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });   
        }
    }

    handelDeleteProjectWorkLog = (id) => {
        let { modalData, setGlobal } = this.context;
        if (!modalData) {
            modalData = modalDefaultContext;
            setGlobal('modalData', modalData);
        }
        modalData = {
            modalType: 'ConformModal',
            title: 'Conform Delete',
            body: 'Are you sure want to delete?',
            show: true,
            handleConfirm: () => {
                _.set(modalData, 'show', false);
                setGlobal('modalData', modalData);
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
                this.deleteProjectWorkLog(id);
            },
            handalCancle: () => {
                _.set(modalData, 'show', false);
                setGlobal('modalData', modalData);
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
            }
        };
        setGlobal('modalData', modalData);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    render() {
        const projectWorkLogs = _.get(_.get(this.state, 'workBackLog', null), 'projectWorkLogs', []);
        const totalRecords = _.get(this.state, 'workBackLog.totalProjectBacklogs', 0);
        const pageNumber = _.get(this.state, 'filter.pageNumber', 1);
        const pageSize = _.get(this.state, 'filter.pageSize', 3);
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        return (
            <div className="mt-3">
                <Table bordered responsive hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => this.sortData('title')}>
                                <span className='flex-between'><span>Title</span> {this.getSortIcon('title')} </span>
                            </th>
                            <th onClick={() => this.sortData('employee')}>
                                <span className='flex-between'><span>Employee</span> {this.getSortIcon('employee')} </span>
                            </th>
                            <th onClick={() => this.sortData('workdoneon')}>
                                <span className='flex-between'><span>Work Done On</span> {this.getSortIcon('workdoneon')} </span>
                            </th>
                            <th onClick={() => this.sortData('workedhours')}>
                                <span className='flex-between'><span>Worked Hours</span> {this.getSortIcon('workedhours')} </span>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(projectWorkLogs, (data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{<div className={this.selectProjectStateClass(_.get(data, 'projectStatusId')) + ' project-status-tag'} ></div>}</td>
                                        <td><a href="/"><img className='imgPadding px-1' src={taskImg} />TA{_.get(data, 'projectWorkId', '')} : {_.get(data, 'title')}</a></td>
                                        <td>{_.get(data, 'employee')}</td>
                                        <td>{formatDate(_.get(data, 'workDoneOn'))}</td>
                                        <td>{formatTime(_.get(data, 'workedHours'))} Hrs</td>
                                        <td>
                                            <FontAwesomeIcon className="px-2" icon={faEdit} onClick={() => this.editWorkLog(data)} />
                                            <FontAwesomeIcon className="ps-2" icon={faTrash} onClick={() => this.handelDeleteProjectWorkLog(_.get(data, 'workLogId', null))} />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <div className="table-footer">
                    <span>
                        <div className="d-flex">
                            <div className="d-flex me-2">
                                <span className="input-group-text">Page No</span>
                                <select className="form-select" value={pageNumber} onChange={(e) => this.handleChange(e, 'pageNumber')}>
                                    {
                                        _.map(pages, (data, index) => <option key={index} value={data}>{data}</option>)
                                    }
                                </select>
                            </div>
                            <div className="d-flex">
                                <span className="input-group-text">Page Size</span>
                                <select className="form-select" onChange={(e) => this.handleChange(e, 'pageSize')}>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                    </span>
                    <span>Records {1 + ((pageNumber - 1) * pageSize)} to {(totalRecords > pageSize) ? pageNumber * pageSize : totalRecords} of ({totalRecords})</span>
                    <span>
                        <nav className="d-flex align-items-center">
                            <ul className="pagination m-0">
                                <li className="page-item">
                                    <span className="page-link no-border-radius normal" onClick={() => this.handleChange(null, 'previous')}>Previous</span>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <span className="page-link normal">{pageNumber} of {_.slice(pages, -1)}</span>
                                </li>
                                <li className="page-item">
                                    <span className="page-link no-border-radius normal" onClick={() => this.handleChange(null, 'next')}>Next</span>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>
            </div>
        );
    }
}

export default WorkLog;