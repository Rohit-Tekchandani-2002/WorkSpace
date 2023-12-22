import { Component } from 'react';
import './MyTraningAsTrainee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChalkboardTeacher, faEdit, faRefresh, faSearch, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import RootContext from '../../../context/RootContext/RootContext';
import { getTraineeTraningResponce } from '../../../services/Traning/traning.service';
import { formatDate, formatTime } from '../../../config/utility';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';
import { Table } from 'react-bootstrap';
import { traningDefaultContect } from '../../../constants/traningDefaultContext';
import { useNavigate } from 'react-router-dom';

class MyTraningAsTrainee extends Component {
    static contextType = RootContext;
    state = { reload: false, refershModule: false }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let traningContext = _.get(this.context, 'traningContext', traningDefaultContect);
        if (!traningContext) {
            setGlobal('traningContext', traningContext);
        }
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                await this.getMyTrannigData();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
    }

    getMyTrannigData = async () => {
        let { handleError, setGlobal } = this.context;
        let traningContext = _.get(this.context, 'traningContext', traningDefaultContect);
        let request = _.cloneDeep(_.get(traningContext, 'filter'));
        if (_.get(request, 'category', '') === '') {
            _.set(request, 'category', null);
        }
        if (_.get(request, 'subCategory', '') === '') {
            _.set(request, 'subCategory', null);
        }
        if (_.get(request, 'type', '') === '') {
            _.set(request, 'type', null);
        }
        if (_.get(request, 'status', '') === '') {
            _.set(request, 'status', null);
        }
        if (_.get(request, 'fromDate', '') === '') {
            _.set(request, 'fromDate', null);
        }
        if (_.get(request, 'toDate', '') === '') {
            _.set(request, 'toDate', null);
        }
        console.log('request', request);
        const res = await getTraineeTraningResponce(request).catch(handleError);
        if (res) {
            console.log('myTraningList data', res);
            _.set(traningContext, 'traineeTranings', _.get(res, 'traineeTranings', []));
            _.set(traningContext, 'totalRecords', _.get(res, 'totalRowCount', 0));
        }
        setGlobal('traningContext', traningContext);
    }

    resetForm = () => {
        const { setGlobal } = this.context;
        let traningContext = _.get(this.context, 'leaveRequestContext', traningDefaultContect);
        _.set(traningContext, 'filter.category', '');
        _.set(traningContext, 'filter.subCategory', '');
        _.set(traningContext, 'filter.type', '');
        _.set(traningContext, 'filter.status', '');
        _.set(traningContext, 'filter.fromDate', '');
        _.set(traningContext, 'filter.toDate', '');
        setGlobal('traningContext', traningContext);
        this.setState({ reload: true });
    }

    getSortIcon = (field) => {
        const expression = _.get(this.context, 'traningContext.filter.expression', 'TraningId');
        const isSortByAsc = _.get(this.context, 'traningContext.filter.isSortByAsc', true);
        if (expression === field) {
            if (isSortByAsc) {
                return <FontAwesomeIcon icon={faSortUp} />
            } else {
                return <FontAwesomeIcon icon={faSortDown} />
            }
        } else {
            return <FontAwesomeIcon icon={faSort} />
        }
    }

    sortData = (field) => {
        let { setGlobal } = this.context;
        let traningContext = _.get(this.context, 'traningContext', traningDefaultContect);
        const isSortByAsc = _.get(traningContext, 'filter.isSortByAsc', true);
        console.log('expression', field, 'isSortByAsc', isSortByAsc);
        _.set(traningContext, 'filter.isSortByAsc', !isSortByAsc);
        _.set(traningContext, 'filter.expression', field);
        setGlobal('traningContext', traningContext);
        this.setState({ reload: true });
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value');
        let traningContext = _.get(this.context, 'leaveRequestContext', traningDefaultContect);
        const pageNumber = _.get(traningContext, 'filter.pageNumber', 1);
        const pageSize = _.get(traningContext, 'filter.pageSize', 5);
        const totalRecords = _.get(traningContext, 'totalRecords', '');
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const lastPage = pages[_.get(pages, 'length', 1) - 1];
        switch (feild) {
            case 'category':
                _.set(traningContext, 'filter.category', value);
                break;
            case 'subCategory':
                _.set(traningContext, 'filter.subCategory', value);
                break;
            case 'type':
                _.set(traningContext, 'filter.type', value);
                break;
            case 'status':
                _.set(traningContext, 'filter.status', value);
                break;
            case 'fromDate':
                _.set(traningContext, 'filter.fromDate', value);
                break;
            case 'toDate':
                _.set(traningContext, 'filter.toDate', value);
                break;
            case 'pageNumber':
                _.set(traningContext, 'filter.pageNumber', value);
                this.setState({ reload: true });
                break;
            case 'pageSize':
                _.set(traningContext, 'filter.pageSize', value);
                this.setState({ reload: true });
                break;
            case 'previous':
                _.set(traningContext, 'filter.pageNumber', (pageNumber > 1) ? (pageNumber - 1) : 1);
                this.setState({ reload: true });
                break;
            case 'next':
                _.set(traningContext, 'filter.pageNumber', (pageNumber < lastPage) ? (pageNumber + 1) : lastPage);
                this.setState({ reload: true });
                break;
            default:
                break;
        }
        setGlobal('traningContext', traningContext);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    traningFeedback = (id) => {
        this.props.history('/trainee-feedback/my', { state: {id: id}});
    }

    render() {
        const traningContext = _.get(this.context, 'traningContext', traningDefaultContect);
        const {
            filter,
            traineeTranings,
            totalRecords
        } = traningContext;
        const {
            category,
            subCategory,
            type,
            status,
            fromDate,
            toDate,
            pageNumber,
            pageSize,
            expression,
            isSortByAsc
        } = filter;
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const reload = _.get(this.state, 'reload');
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faChalkboardTeacher} /> Traning <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> My Traning As Trainee</span>
                <h4 className='blue_border px-0 pt-2'>My Traning As Trainee</h4>
                <div className='pt-2 border'>
                    <form className='form-group row m-2'>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Category</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' value={category} onChange={(e) => this.handleChange(e, 'category')}>
                                        <option value=''>All</option>
                                        <option value='Technical'>Technical</option>
                                        <option value='Soft Skill'>Soft Skill</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Sub Category</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' value={subCategory} onChange={(e) => this.handleChange(e, 'subCategory')}>
                                        <option value=''>All</option>
                                        {
                                            (category === 'Technical') &&
                                            <option value='Sql'>Sql</option>
                                        }
                                        {
                                            (category === 'Technical') &&
                                            <option value='Angular'>Angular</option>
                                        }
                                        {
                                            (category === 'Soft Skill') &&
                                            <option value='General'>General</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Type</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' value={type} onChange={(e) => this.handleChange(e, 'type')}>
                                        <option value=''>All</option>
                                        <option value='Open Nomination'>Open Nomination</option>
                                        <option value='Planned'>Planned</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Status</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100' value={status} onChange={(e) => this.handleChange(e, 'status')}>
                                        <option value=''>All</option>
                                        <option value='Ongoing'>Ongoing</option>
                                        <option value='Completed'>Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">From Date</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100' type='date' value={fromDate} onChange={(e) => this.handleChange(e, 'fromDate')} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Date To</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100' type='date' value={toDate} onChange={(e) => this.handleChange(e, 'toDate')} />
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
                    !reload && (_.get(traineeTranings, 'length', 0) !== 0) &&
                    <div className='mt-3'>
                        <Table bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={() => this.sortData('title')}>
                                        <span className='flex-between'>
                                            <span>Title</span>
                                            {this.getSortIcon('title')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('date')}>
                                        <span className='flex-between'>
                                            <span>Date</span>
                                            {this.getSortIcon('date')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('time')}>
                                        <span className='flex-between'>
                                            <span>Time</span>
                                            {this.getSortIcon('time')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('duration')}>
                                        <span className='flex-between'>
                                            <span>Duration</span>
                                            {this.getSortIcon('duration')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('faculties')}>
                                        <span className='flex-between'>
                                            <span>Faculties</span>
                                            {this.getSortIcon('faculties')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('category')}>
                                        <span className='flex-between'>
                                            <span>Category</span>
                                            {this.getSortIcon('category')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('type')}>
                                        <span className='flex-between'>
                                            <span>Type</span>
                                            {this.getSortIcon('type')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('participants')}>
                                        <span className='flex-between'>
                                            <span>Participants</span>
                                            {this.getSortIcon('participants')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('status')}>
                                        <span className='flex-between'>
                                            <span>Status</span>
                                            {this.getSortIcon('status')}
                                        </span>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(traineeTranings, (data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{_.get(data, 'rowNum', '')}</td>
                                                <td>{_.get(data, 'title', '')}</td>
                                                <td>{formatDate(_.get(data, 'date', ''))}</td>
                                                <td>{formatTime(_.get(data, 'time', 0))}</td>
                                                <td>{formatTime(_.get(data, 'duration', 0))}</td>
                                                <td>{_.get(data, 'faculties', '')}</td>
                                                <td>{_.get(data, 'category', '')}</td>
                                                <td>{_.get(data, 'type', '')}</td>
                                                <td>{_.get(data, 'status', '')}</td>
                                                <td>{_.get(data, 'participants', '')}</td>
                                                <td><FontAwesomeIcon icon={faEdit} onClick={() => this.traningFeedback(_.get(data, 'traningId'))}/></td>
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
                    !reload && (_.get(traineeTranings, 'length', 0) === 0) &&
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
    <MyTraningAsTrainee history={useNavigate()} />
);