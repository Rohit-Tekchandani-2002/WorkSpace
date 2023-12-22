import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ServiceRequest.css';
import { Component } from 'react';
import { faAngleRight, faEdit, faGears, faPlus, faRefresh, faSearch, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { serviceStatus } from '../../../constants/constants';
import _ from 'lodash';
import { serviceDetailsDefaultContext } from '../../../constants/workspaceConstants';
import RootContext from '../../../context/RootContext/RootContext';
import { getServiceDetails } from '../../../services/Workspace/workspace.service';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';
import { formatDate } from '../../../config/utility';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

class ServiceRequest extends Component {
    static contextType = RootContext;
    state = { refershModule: false, reload: false, alertMessage: '' }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let serviceDetailsContext = _.get(this.context, 'serviceDetailsContext');
        if (!serviceDetailsContext) {
            serviceDetailsContext = serviceDetailsDefaultContext;
            setGlobal('serviceDetailsContext', serviceDetailsContext);
        }
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                await this.getServiceRequestList();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
    }

    getServiceRequestList = async () => {
        const { setGlobal, handleError } = this.context;
        let serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        let request = _.cloneDeep(_.get(serviceDetailsContext, 'filter'));
        if (_.get(request, 'ticketNumber', '') === '') {
            _.set(request, 'ticketNumber', null);
        }
        if (_.get(request, 'requestStatus', '') === '') {
            _.set(request, 'requestStatus', null);
        }
        const serviceRequestDetails = await getServiceDetails(request).catch(handleError);
        if (serviceRequestDetails) {
            _.set(serviceDetailsContext, 'serviceRequestList', _.get(serviceRequestDetails, 'serviceRequestDetails', []));
            _.set(serviceDetailsContext, 'totalRecords', _.get(serviceRequestDetails, 'totalRecords', 0));
            setGlobal('serviceDetailsContext', serviceDetailsContext);
            console.log('serviceRequestDetails', serviceRequestDetails);
        }
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value');
        let serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        const pageNumber = _.get(serviceDetailsContext, 'filter.pageNumber', 1);
        const pageSize = _.get(serviceDetailsContext, 'filter.pageSize', 5);
        const totalRecords = _.get(serviceDetailsContext, 'totalRecords', '');
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const lastPage = pages[_.get(pages, 'length', 1) - 1];
        switch (feild) {
            case 'ticketNumber':
                _.set(serviceDetailsContext, 'filter.ticketNumber', value);
                break;
            case 'requestStatus':
                _.set(serviceDetailsContext, 'filter.requestStatus', value);
                break;
            case 'pageNumber':
                _.set(serviceDetailsContext, 'filter.pageNumber', value);
                this.setState({ reload: true });
                break;
            case 'pageSize':
                _.set(serviceDetailsContext, 'filter.pageSize', value);
                this.setState({ reload: true });
                break;
            case 'previous':
                _.set(serviceDetailsContext, 'filter.pageNumber', (pageNumber > 1) ? (pageNumber - 1) : 1);
                this.setState({ reload: true });
                break;
            case 'next':
                _.set(serviceDetailsContext, 'filter.pageNumber', (pageNumber < lastPage) ? (pageNumber + 1) : lastPage);
                this.setState({ reload: true });
                break;
            default:
                break;
        }
        setGlobal('serviceDetailsContext', serviceDetailsContext);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    getSortIcon = (field) => {
        const serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        const expression = _.get(serviceDetailsContext, 'filter.sortColumn', 'leaveStartDate');
        const isSortByAsc = _.get(serviceDetailsContext, 'filter.sortOrder', true);
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
        let serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        const isSortByAsc = _.get(serviceDetailsContext, 'filter.sortOrder', true);
        _.set(serviceDetailsContext, 'filter.sortColumn', field);
        _.set(serviceDetailsContext, 'filter.sortOrder', !isSortByAsc);
        setGlobal('serviceDetailsContext', serviceDetailsContext);
        this.setState({ reload: true });
    }

    resetForm = () => {
        const { setGlobal } = this.context;
        let serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        _.set(serviceDetailsContext, 'filter.ticketNumber', '');
        _.set(serviceDetailsContext, 'filter.requestStatus', '');
        setGlobal('serviceDetailsContext', serviceDetailsContext);
        this.setState({ reload: true });
    }

    addServiceRequest = () => {
        let { modalData, setGlobal } = this.context;
        modalData = {
            modalType: 'AddServiceRequest',
            show: true,
            handleConfirm: (message) => {
                if (message) {
                    this.setState({ alertMessage: message });
                }
            }
        };
        setGlobal('modalData', modalData);
        this.setState({ reload: true });
    }

    updateServiceRequest = (id) => {
        if (id) {
            this.props.history('/service-request-form', { state: {id: id}});
        }
    }

    render() {
        const reload = _.get(this.state, 'reload');
        const serviceDetailsContext = _.get(this.context, 'serviceDetailsContext', serviceDetailsDefaultContext);
        const ticketNumber = _.get(serviceDetailsContext, 'filter.ticketNumber', '');
        const requestStatus = _.get(serviceDetailsContext, 'filter.requestStatus', '');
        const serviceRequestList = _.get(serviceDetailsContext, 'serviceRequestList', []);
        const pageNumber = _.get(serviceDetailsContext, 'filter.pageNumber', 1);
        const pageSize = _.get(serviceDetailsContext, 'filter.pageSize', 5);
        const totalRecords = _.get(serviceDetailsContext, 'totalRecords', '');
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Service Request</span>
                <h4 className='blue_border flex-between px-0 pt-2'>
                    My Service Request
                    <span>
                        <button
                            className='btn btn-primary rounded-0'
                            onClick={this.addServiceRequest}>
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
                                <div className="col-md-4 col-xs-5 form-label">Request Status</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' value={requestStatus} onChange={(e) => { this.handleChange(e, 'requestStatus') }}>
                                        <option value=''>All</option>
                                        {
                                            _.map(_.entries(serviceStatus), ([key, value]) => {
                                                return (
                                                    <option key={key} value={key}>{value}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Ticket #</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100' value={ticketNumber} onChange={(e) => { this.handleChange(e, 'ticketNumber') }} />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                        <button
                            className='btn btn-primary rounded-0 me-2'
                            onClick={() => { this.setState({ reload: true }) }}
                        >
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                        <button
                            className='btn btn-default rounded-0'
                            onClick={this.resetForm}
                        >
                            <FontAwesomeIcon icon={faRefresh} /> Reset
                        </button>
                    </div>
                </div>
                {
                    !reload && (_.get(serviceRequestList, 'length', 0) !== 0) &&
                    <div className='service-request-container'>
                        <Table bordered responsive hover>
                            <thead>
                                <tr>
                                    <th onClick={() => this.sortData('ticket')}>
                                        <span className='flex-between'>
                                            <span>Ticket#</span>
                                            {this.getSortIcon('ticket')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('requestDate')}>
                                        <span className='flex-between'>
                                            <span>Request Date</span>
                                            {this.getSortIcon('requestDate')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('name')}>
                                        <span className='flex-between'>
                                            <span>Name</span>
                                            {this.getSortIcon('name')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('category')}>
                                        <span className='flex-between'>
                                            <span>Category</span>
                                            {this.getSortIcon('category')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('serviceGroup')}>
                                        <span className='flex-between'>
                                            <span>Service Group</span>
                                            {this.getSortIcon('serviceGroup')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('subCategory')}>
                                        <span className='flex-between'>
                                            <span>Sub Category</span>
                                            {this.getSortIcon('subCategory')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('priority')}>
                                        <span className='flex-between'>
                                            <span>Priority</span>
                                            {this.getSortIcon('priority')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('serviceDetails')}>
                                        <span className='flex-between'>
                                            <span>Service Details</span>
                                            {this.getSortIcon('serviceDetails')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('pendingAt')}>
                                        <span className='flex-between'>
                                            <span>Pending At</span>
                                            {this.getSortIcon('pendingAt')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('status')}>
                                        <span className='flex-between'>
                                            <span>Status</span>
                                            {this.getSortIcon('status')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('closedBy')}>
                                        <span className='flex-between'>
                                            <span>Closed By</span>
                                            {this.getSortIcon('closedBy')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('closedAt')}>
                                        <span className='flex-between'>
                                            <span>Closed Date</span>
                                            {this.getSortIcon('closedAt')}
                                        </span>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(serviceRequestList, (data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>#{_.get(data, 'ticket', '')}</td>
                                                <td>{formatDate(_.get(data, 'requestDate', ''))}</td>
                                                <td>{_.get(data, 'name', '--')}</td>
                                                <td>{_.get(data, 'category', '--')}</td>
                                                <td>{_.get(data, 'serviceGroup', '--')}</td>
                                                <td>{_.get(data, 'subCategory', '--')}</td>
                                                <td>{_.get(data, 'priority', '--')}</td>
                                                <td>{_.get(data, 'serviceDetails', '--')}</td>
                                                <td>{formatDate(_.get(data, 'pendingAt', ''))}</td>
                                                <td>{_.get(data, 'status') ? serviceStatus[_.get(data, 'status')] : '--'}</td>
                                                <td>{_.get(data, 'closedBy') ? _.get(data, 'closedBy') : '--'}</td>
                                                <td>{_.get(data, 'closedAt') ? _.get(data, 'closedAt') : '--'}</td>
                                                <td className='text-center'><FontAwesomeIcon icon={faEdit} onClick={() => this.updateServiceRequest(_.get(data, 'ticket', null))} /></td>
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
                    !reload && (_.get(serviceRequestList, 'length', 0) === 0) &&
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
    <ServiceRequest history={useNavigate()} />
);