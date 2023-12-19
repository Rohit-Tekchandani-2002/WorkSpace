import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Projects.css';
import { Component } from 'react';
import { faAngleRight, faBriefcase, faRefresh, faSearch, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { getProjectTech, getProjects } from '../../../services/Workspace/workspace.service';
import { projectsDefaultContext } from '../../../constants/workspaceConstants';
import RootContext from '../../../context/RootContext/RootContext';
import _ from 'lodash';
import { projectStatus, projectType } from '../../../constants/constants';
import { Table } from "react-bootstrap";
import { formatDate } from '../../../config/utility';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';

class Projects extends Component {
    static contextType = RootContext;
    state = { refershModule: false, reload: false }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let projects = _.get(this.context, 'projects');
        if (!projects) {
            projects = projectsDefaultContext;
            setGlobal('projects', projects);
        }
        this.getProjectData();
        console.log('projects', projects);
    }

    getProjectData = async () => {
        const { setGlobal, handleError } = this.context;
        let projects = _.get(this.context, 'projects', projectsDefaultContext);
        const projectTech = await getProjectTech().catch(handleError);
        if (projectTech) {
            _.set(projects, 'projectTech', projectTech);
        }
        let request = _.cloneDeep(_.get(projects, 'projectRequest'));
        if (_.get(request, 'projectStatus') === '') {
            _.set(request, 'projectStatus', null);
        }
        if (_.get(request, 'projectName') === '') {
            _.set(request, 'projectName', null);
        }
        if (_.get(request, 'projectType') === '') {
            _.set(request, 'projectType', null);
        }
        if (_.get(request, 'projectTechId') === '') {
            _.set(request, 'projectTechId', null);
        }
        const projectList = await getProjects(request).catch(handleError);
        if (projectList) {
            _.set(projects, 'projectList', projectList);
        }
        setGlobal('projects', projects);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        console.log('projects', projects);
    }

    resetData = () => {
        this.setState({ reload: true });
        setTimeout(() => {
            const { setGlobal } = this.context;
            let projects = _.get(this.context, 'projects');
            _.set(projects, 'projectRequest.projectStatus', '');
            _.set(projects, 'projectRequest.projectName', '');
            _.set(projects, 'projectRequest.projectType', '');
            _.set(projects, 'projectRequest.projectTechId', '');
            setGlobal('projects', projects);
            this.getProjectData();
            this.setState({ reload: false });
        }, 500);
        clearTimeout();
    }

    getSortIcon = (field) => {
        const projects = _.get(this.context, 'projects', projectsDefaultContext);
        const expression = _.get(projects, 'projectRequest.expression', 'projectCode');
        const isSortByAsc = _.get(projects, 'projectRequest.isSortByAsc', true);
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
        let projects = _.get(this.context, 'projects', {});
        const isSortByAsc = _.get(projects, 'projectRequest.isSortByAsc', true);
        _.set(projects, 'projectRequest.isSortByAsc', !isSortByAsc);
        _.set(projects, 'projectRequest.expression', field);
        setGlobal('projects', projects);
        this.getProjectData();
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value');
        let projects = _.get(this.context, 'projects', projectsDefaultContext);
        const totalRecords = _.get(projects, 'projectList.totalProjects', 0);
        const projectRequest = _.get(projects, 'projectRequest', _.get(projectsDefaultContext, 'projectRequest'));
        const { pageNumber, pageSize } = projectRequest;
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const lastPage = pages[_.get(pages, 'length', 1) - 1];
        switch (feild) {
            case 'projectStatus':
                _.set(projects, 'projectRequest.projectStatus', value);
                break;
            case 'projectName':
                _.set(projects, 'projectRequest.projectName', value);
                break;
            case 'projectType':
                _.set(projects, 'projectRequest.projectType', value);
                break;
            case 'projectTechId':
                _.set(projects, 'projectRequest.projectTechId', value);
                break;
            case 'pageNumber':
                _.set(projects, 'projectRequest.pageNumber', value);
                this.getProjectData();
                break;
            case 'pageSize':
                _.set(projects, 'projectRequest.pageSize', value);
                this.getProjectData();
                break;
            case 'previous':
                _.set(projects, 'projectRequest.pageNumber', (pageNumber > 1) ? (pageNumber - 1) : 1);
                this.getProjectData();
                break;
            case 'next':
                _.set(projects, 'projectRequest.pageNumber', (pageNumber < lastPage) ? (pageNumber + 1) : lastPage);
                this.getProjectData();
                break;
            default:
                break;
        }
        setGlobal('projects', projects);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
    }

    render() {
        const projects = _.get(this.context, 'projects', projectsDefaultContext);
        const projectTech = _.get(projects, 'projectTech', []);
        const projectList = _.get(projects, 'projectList', []);
        const totalRecords = _.get(projects, 'projectList.totalProjects', 0);
        const projectRequest = _.get(projects, 'projectRequest', _.get(projectsDefaultContext, 'projectRequest'));
        const { pageNumber, pageSize } = projectRequest;
        const pages = (totalRecords > pageSize) ? _.range(1, (_.floor(totalRecords / pageSize)) + 1) : [1];
        const reload = _.get(this.state, 'reload');
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faBriefcase} /> My Workspace <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Projects</span>
                <h4 className='blue_border px-0 pt-2'>My Projects</h4>
                <div className='pt-2 border'>
                    <form className='form-group row m-2'>
                        <div className="col-lg-3 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Project Status</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100'
                                        value={_.get(projectRequest, 'projectStatus', '')}
                                        onChange={(e) => this.handleChange(e, 'projectStatus')}>
                                        <option value={''}>Select</option>
                                        {
                                            _.map(_.entries(projectStatus), ([key, value]) => {
                                                return (
                                                    <option key={key} value={key}>
                                                        {value}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Project Name</div>
                                <div className="col-md-8 col-xs-7">
                                    <input className='form-control w-100'
                                        value={_.get(projects, 'projectRequest.projectName', '')}
                                        onChange={(e) => this.handleChange(e, 'projectName')} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Project Type</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className='form-select w-100'
                                        value={_.get(projects, 'projectRequest.projectType', '')}
                                        onChange={(e) => this.handleChange(e, 'projectType')}>
                                        <option value={''}>Select</option>
                                        <option value={0}>Fixed Cost</option>
                                        <option value={1}>Hourly</option>
                                        <option value={2}>Monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Project Tech</div>
                                <div className="col-md-8 col-xs-7">
                                    <select
                                        className='form-select w-100'
                                        value={_.get(projects, 'projectRequest.projectTechId', '')}
                                        onChange={(e) => this.handleChange(e, 'projectTechId')}>
                                        <option value={''}>Select</option>
                                        {
                                            _.map(projectTech, (data) => {
                                                return (
                                                    <option
                                                        key={_.get(data, 'keyId')}
                                                        value={_.get(data, 'keyId')}>
                                                        {_.get(data, 'dataValue')}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                        <button className='btn btn-primary rounded-0 me-2' onClick={() => this.getProjectData()}><FontAwesomeIcon icon={faSearch} /> Search</button>
                        <button className='btn btn-default rounded-0' onClick={() => this.resetData()}><FontAwesomeIcon icon={faRefresh} /> Reset</button>
                    </div>
                </div>
                {
                    !reload && (_.get(projectList, 'projects.length', 0) !== 0) &&
                    <div>
                        <div className='mt-3 mb-1'>
                            <span className="bg-danger ColorBox me-1"></span>
                            <span>[Actual Utilize Time is greater than (Estimated Hrs + CR) for Fixed Cost projects]</span>
                        </div>
                        <Table bordered responsive hover>
                            <thead>
                                <tr>
                                    <th onClick={() => this.sortData('projectCode')}>
                                        <span className='flex-between'>
                                            <span>Code</span>
                                            {this.getSortIcon('projectCode')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('projectName')}>
                                        <span className='flex-between'>
                                            <span>Name</span>
                                            {this.getSortIcon('projectName')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('projectType')}>
                                        <span className='flex-between'>
                                            <span>Type</span>
                                            {this.getSortIcon('projectType')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('projectStatus')}>
                                        <span className='flex-between'>
                                            <span>Status</span>
                                            {this.getSortIcon('projectStatus')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('projectType')}>
                                        <span className='flex-between'>
                                            <span>Due Date</span>
                                            {this.getSortIcon('projectType')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('endDate')}>
                                        <span className='flex-between'>
                                            <span>My End Date</span>
                                            {this.getSortIcon('endDate')}
                                        </span>
                                    </th>
                                    <th>
                                        <span className='flex-between'>
                                            <span>Billable Users</span>
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('totalHours')}>
                                        <span className='flex-between'>
                                            <span>Total Hrs</span>
                                            {this.getSortIcon('totalHours')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('assignedHours')}>
                                        <span className='flex-between'>
                                            <span>Assi. Hrs</span>
                                            {this.getSortIcon('assignedHours')}
                                        </span>
                                    </th>
                                    <th onClick={() => this.sortData('workHours')}>
                                        <span className='flex-between'>
                                            <span>Work Hrs</span>
                                            {this.getSortIcon('workHours')}
                                        </span>
                                    </th>
                                    <th>
                                        <span className='flex-between'>
                                            <span>Hrs Utilized</span>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(_.get(projectList, 'projects'), (data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{_.get(data, 'projectCode', '')}</td>
                                                <td>
                                                    <a href='#'>{_.get(data, 'projectName', '')}</a>
                                                </td>
                                                <td>{projectType[_.get(data, 'projectType', '')]}</td>
                                                <td>{projectStatus[_.get(data, 'projectStatus', '')]}</td>
                                                <td>{formatDate(_.get(data, 'dueDate', ''))}</td>
                                                <td>{formatDate(_.get(data, 'endDate', ''))}</td>
                                                <td>{_.get(data, 'userCount', '')}</td>
                                                <td>{_.get(data, 'totalHours', '')}</td>
                                                <td>{_.get(data, 'assignedHours', '')}</td>
                                                <td>{_.get(data, 'workHours', '')}</td>
                                                <td>{_.get(data, 'hrsUtilized', '')}</td>
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
                    !reload && (_.get(projectList, 'projects.length', 0) === 0) &&
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

export default Projects;