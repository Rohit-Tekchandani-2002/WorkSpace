import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LeaveRequest.css';
import { Component } from 'react';
import { faAngleRight, faBan, faEdit, faGears, faPlus, faRefresh, faSearch, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { leaveStatus } from '../../../constants/constants';
import { leaveRequestDefaultContext } from '../../../constants/workspaceConstants';
import RootContext from '../../../context/RootContext/RootContext';
import { deleteLeaveRequest, getLeaveRequestDetails } from '../../../services/Workspace/workspace.service';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../config/utility';
import { useNavigate } from 'react-router-dom';

class LeaveRequest extends Component {
    static contextType = RootContext;
    state = { refershModule: false, reload: false, alertMessage: '' }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let leaveRequestContext = _.get(this.context, 'leaveRequestContext');
        if (!leaveRequestContext) {
            leaveRequestContext = leaveRequestDefaultContext;
            setGlobal('leaveRequestContext', leaveRequestContext);
        }
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                await this.getLeaveRequestList();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
    }

    getLeaveRequestList = async () => {
        const { setGlobal, handleError } = this.context;
        let leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        let request = _.cloneDeep(_.get(leaveRequestContext, 'filter'));
        if (_.get(request, 'leaveStartDate', '') === '') {
            _.set(request, 'leaveStartDate', null);
        }
        if (_.get(request, 'leaveEndDate', '') === '') {
            _.set(request, 'leaveEndDate', null);
        }
        if (_.get(request, 'leaveRequestStatus', '') === '') {
            _.set(request, 'leaveRequestStatus', null);
        }
        const leaveRequestDetails = await getLeaveRequestDetails(request).catch(handleError);
        if (leaveRequestDetails) {
            _.set(leaveRequestContext, 'leaveRequestList', _.get(leaveRequestDetails, 'leaveRequestDetails', []));
            _.set(leaveRequestContext, 'totalRecords', _.get(leaveRequestDetails, 'totalRecords', 0));
            setGlobal('leaveRequestContext', leaveRequestContext);
            console.log('leaveRequestList', leaveRequestDetails);
        }
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value');
        let leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        const pageNumber = _.get(leaveRequestContext, 'filter.pageNumber', 1);
        const pageSize = _.get(leaveRequestContext, 'filter.pageSize', 5);
        const totalRecords = _.get(leaveRequestContext, 'totalRecords', '');
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const lastPage = pages[_.get(pages, 'length', 1) - 1];
        switch (feild) {
            case 'dateForm':
                _.set(leaveRequestContext, 'filter.leaveStartDate', value);
                break;
            case 'dateTo':
                _.set(leaveRequestContext, 'filter.leaveEndDate', value);
                break;
            case 'status':
                _.set(leaveRequestContext, 'filter.leaveRequestStatus', value);
                break;
            case 'pageNumber':
                _.set(leaveRequestContext, 'filter.pageNumber', value);
                this.setState({ reload: true });
                break;
            case 'pageSize':
                _.set(leaveRequestContext, 'filter.pageSize', value);
                this.setState({ reload: true });
                break;
            case 'previous':
                _.set(leaveRequestContext, 'filter.pageNumber', (pageNumber > 1) ? (pageNumber - 1) : 1);
                this.setState({ reload: true });
                break;
            case 'next':
                _.set(leaveRequestContext, 'filter.pageNumber', (pageNumber < lastPage) ? (pageNumber + 1) : lastPage);
                this.setState({ reload: true });
                break;
            default:
                break;
        }
        setGlobal('leaveRequestContext', leaveRequestContext);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    getSortIcon = (field) => {
        const leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        const expression = _.get(leaveRequestContext, 'filter.sortColumn', 'leaveStartDate');
        const isSortByAsc = _.get(leaveRequestContext, 'filter.sortOrder', true);
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
        let leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        const isSortByAsc = _.get(leaveRequestContext, 'filter.sortOrder', true);
        _.set(leaveRequestContext, 'filter.sortColumn', field);
        _.set(leaveRequestContext, 'filter.sortOrder', !isSortByAsc);
        setGlobal('leaveRequestContext', leaveRequestContext);
        this.setState({ reload: true });
    }

    resetForm = () => {
        const { setGlobal } = this.context;
        let leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        _.set(leaveRequestContext, 'filter.leaveStartDate', '');
        _.set(leaveRequestContext, 'filter.leaveEndDate', '');
        _.set(leaveRequestContext, 'filter.leaveRequestStatus', '');
        setGlobal('leaveRequestContext', leaveRequestContext);
        this.setState({ reload: true });
    }

    deleteLeaveRequest = async(id) => {
        const { handleError } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        const message = await deleteLeaveRequest(employeeId, id).catch(handleError);
        this.setState({alertMessage: message});
    }

    cancelLeaveRequest = (id) => {
        let { modalData, setGlobal } = this.context;
        if (id) {
            modalData = {
                modalType: 'ConformModal',
                title: 'Confirmation',
                body: 'Are You sure to cancle leave request?',
                show: true,
                handleConfirm: () => {
                    //Function on conformation
                    this.deleteLeaveRequest(id);
                    setGlobal('modalData', { show: false });
                    this.setState({ reload: true });
                },
                handleCancle: () => {
                    setGlobal('modalData', { show: false });
                    this.setState({ refershModule: !_.get(this.state, 'refershModule') });
                }
            };
            setGlobal('modalData', modalData);
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

    addNewLeaveRequest = () => {
        this.props.history('/leave-request-form', { state: {type: 'add', id: null}});
    }

    updateLeaveRequest = (id) => {
        this.props.history('/leave-request-form', { state: {type: 'update', id: id}});
    }

    render() {
        const reload = _.get(this.state, 'reload');
        const leaveRequestContext = _.get(this.context, 'leaveRequestContext', leaveRequestDefaultContext);
        const leaveStartDate = _.get(leaveRequestContext, 'filter.leaveStartDate', '');
        const leaveEndDate = _.get(leaveRequestContext, 'filter.leaveEndDate', '');
        const leaveRequestStatus = _.get(leaveRequestContext, 'filter.leaveRequestStatus', '');
        const leaveRequestList = _.get(leaveRequestContext, 'leaveRequestList', []);
        const pageNumber = _.get(leaveRequestContext, 'filter.pageNumber', 1);
        const pageSize = _.get(leaveRequestContext, 'filter.pageSize', 5);
        const totalRecords = _.get(leaveRequestContext, 'totalRecords', '');
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Leave Request</span>
                <h4 className='blue_border flex-between px-0 pt-2'>
                    My Leave Request
                    <span>
                        <button className='btn btn-primary rounded-0' onClick={this.addNewLeaveRequest}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>
                </h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                <div className='pt-2 border'>
                    <form className='form-group row m-2'>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Date From</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100' onChange={(e) => this.handleChange(e, 'dateForm')} value={leaveStartDate} type='date' />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Date To</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100' onChange={(e) => this.handleChange(e, 'dateTo')} value={leaveEndDate} type='date' />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Status</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' onChange={(e) => this.handleChange(e, 'status')} value={leaveRequestStatus} >
                                        <option value=''>All</option>
                                        {
                                            _.map(leaveStatus, (item) => {
                                                return (
                                                    <option key={item} value={item}>{item}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                        <button className='btn btn-primary rounded-0 me-2' onClick={() => { this.setState({ reload: true }) }}><FontAwesomeIcon icon={faSearch} /> Search</button>
                        <button className='btn btn-default rounded-0' onClick={this.resetForm}><FontAwesomeIcon icon={faRefresh} /> Reset</button>
                    </div>
                </div>
                {
                    !reload && (_.get(leaveRequestList, 'length', 0) !== 0) &&
                    <div className='leave-request-container'>
                        <Table bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={() => this.sortData('leaveStartDate')}>
                                        <span className='flex-between'>
                                            <span>Start Date</span>
                                            {this.getSortIcon('leaveStartDate')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('leaveEndDate')}>
                                        <span className='flex-between'>
                                            <span>End Date</span>
                                            {this.getSortIcon('leaveEndDate')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('duration')}>
                                        <span className='flex-between'>
                                            <span>Duration</span>
                                            {this.getSortIcon('duration')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('returnDate')}>
                                        <span className='flex-between'>
                                            <span>Return Date</span>
                                            {this.getSortIcon('returnDate')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('availibiltyOnPhone')}>
                                        <span className='flex-between'>
                                            <span>Availibility On Phone</span>
                                            {this.getSortIcon('availibiltyOnPhone')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('availibiltyInCity')}>
                                        <span className='flex-between'>
                                            <span>Availibility In City</span>
                                            {this.getSortIcon('availibiltyInCity')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('leaveRequestStatus')}>
                                        <span className='flex-between'>
                                            <span>Leave Status</span>
                                            {this.getSortIcon('leaveRequestStatus')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('approvedDate')}>
                                        <span className='flex-between'>
                                            <span>Approved Date</span>
                                            {this.getSortIcon('approvedDate')}
                                        </span>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(leaveRequestList, (data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{_.get(data, 'rowNo', '')}</td>
                                                <td>{formatDate(_.get(data, 'leaveStartDate', ''))}</td>
                                                <td>{formatDate(_.get(data, 'leaveEndDate', ''))}</td>
                                                <td>{_.get(data, 'duration', '--')} Day(s)</td>
                                                <td>{formatDate(_.get(data, 'returnDate', ''))}</td>
                                                <td>{_.get(data, 'availibiltyOnPhone', false) ? 'Yes' : 'No'}</td>
                                                <td>{_.get(data, 'availibiltyInCity', false) ? 'Yes' : 'No'}</td>
                                                <td>{_.get(data, 'leaveRequestStatus', '')}</td>
                                                <td>{_.get(data, 'approvedDate', '') ? formatDate(_.get(data, 'approvedDate', '')) : '--'}</td>
                                                {
                                                    (_.get(data, 'leaveRequestStatus', '') === 'Pending') &&
                                                    <td>
                                                        <FontAwesomeIcon icon={faEdit} className='me-2' onClick={() => this.updateLeaveRequest(_.get(data, 'leaveRequestId'))} />
                                                        <FontAwesomeIcon icon={faBan} onClick={() => this.cancelLeaveRequest(_.get(data, 'leaveRequestId'))} />
                                                    </td>
                                                }
                                                {
                                                    (_.get(data, 'leaveRequestStatus', '') !== 'Pending') &&
                                                    <td></td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <div className="table-footer text-select-none">
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
                                        <select className="form-select" value={pageSize} onChange={(e) => this.handleChange(e, 'pageSize')}>
                                            <option value="1">1</option>
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
                }
                {
                    !reload && (_.get(leaveRequestList, 'length', 0) === 0) &&
                    <div className="alert alert-danger mt-3">No Data Available</div>
                }
                {
                    reload &&
                    <ModualLoader customClass={'h-50'} />
                }
            </div>
        );
    }
}

export default () => (
    <LeaveRequest history={useNavigate()} />
);