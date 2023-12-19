import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WorkItems.css';
import { Component } from 'react';
import { faAngleDown, faAngleRight, faClock, faGears, faRefresh, faSearch, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import RootContext from '../../../context/RootContext/RootContext';
import { getWorkItems } from '../../../services/Workspace/workspace.service';
import _ from 'lodash';
import { workItemsDefautContext } from '../../../constants/workspaceConstants';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';
import { Table } from 'react-bootstrap';
import { projectStatus } from '../../../constants/constants';
import { formatDate, formatTime } from '../../../config/utility';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

class WorkItems extends Component {
    static contextType = RootContext;
    state = { refershModule: false, reload: false, alertMessage: '' }

    componentDidMount = () => {
        let { workItemsContext, setGlobal } = this.context;
        if (!workItemsContext) {
            workItemsContext = workItemsDefautContext;
            setGlobal('workItemsContext', workItemsContext);
        }
        this.getWorkItemsData();
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
    }

    getWorkItemsData = async () => {
        const { setGlobal, handleError } = this.context;
        let workItemsContext = _.get(this.context, 'workItemsContext', workItemsDefautContext);
        let request = _.cloneDeep(_.get(workItemsContext, 'filter'));
        if (_.get(request, 'projectId') === '') {
            _.set(request, 'projectId', null);
        }
        let workItems = await getWorkItems(request).catch(handleError);
        if (workItems) {
            console.log('workItems', workItems, this.context);
            _.set(workItemsContext, 'workItems', workItems);
            setGlobal('workItemsContext', workItemsContext);
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

    resetData = () => {
        this.setState({ reload: true });
        setTimeout(() => {
            const { setGlobal } = this.context;
            let workItemsContext = _.get(this.context, 'workItemsContext', workItemsDefautContext);
            _.set(workItemsContext, 'filter.projectId', '');
            setGlobal('workItemsContext', workItemsContext);
            this.getWorkItemsData();
            this.setState({ reload: false });
        }, 500);
        clearTimeout();
    }

    handelChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value');
        let workItemsContext = _.get(this.context, 'workItemsContext', workItemsDefautContext);
        switch (feild) {
            case 'projectId':
                _.set(workItemsContext, 'filter.projectId', value);
                break;

            default:
                break;
        }
        setGlobal('workItemsContext', workItemsContext);
        this.setState({ refershModule: !_.get(this.state, 'refershModule') });
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

    addWorkLogtime = (workLog) => {
        let { modalData, setGlobal } = this.context;
        if (workLog) {
            modalData = {
                modalType: 'AddWorkLogModal',
                show: true,
                data: workLog,
                handleConfirm: (message) => {
                    this.getWorkItemsData();
                    setGlobal('modalData', { show: false });
                    this.setState({ alertMessage: message })
                }
            };
            setGlobal('modalData', modalData);
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

    getSortIcon = (field) => {
        const workItemsContext = _.get(this.context, 'workItemsContext', workItemsDefautContext);
        const expression = _.get(workItemsContext, 'filter.expression', 'title');
        const isSortByAsc = _.get(workItemsContext, 'filter.isSortByAsc', true);
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
        const workItemsContext = _.get(this.context, 'workItemsContext', workItemsDefautContext);
        const isSortByAsc = _.get(workItemsContext, 'filter.isSortByAsc', true);
        _.set(workItemsContext, 'filter.isSortByAsc', !isSortByAsc);
        _.set(workItemsContext, 'filter.expression', field);
        setGlobal('workItemsContext', workItemsContext);
        this.getWorkItemsData();
    }

    render() {
        const projectsList = _.get(this.context, 'projectsList', []);
        const projectId = _.get(this.context, 'workItemsContext.filter.projectId', '');
        const workItems = _.get(this.context, 'workItemsContext.workItems', []);
        const reload = _.get(this.state, 'reload');
        return (
            <div className='p-2 h-100 workitem-content'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Project Backlog</span>
                <h4 className='blue_border px-0 pt-2'>Project Backlog</h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                <div className='pt-2 border'>
                    <form className='form-group row m-2'>
                        {
                            (_.get(projectsList, 'length', 0) !== 0) &&
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Project</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className='form-select w-100' value={projectId} onChange={(e) => this.handelChange(e, 'projectId')}>
                                            <option value={''}>Select</option>
                                            {
                                                _.map(projectsList, (data, index) => {
                                                    return (
                                                        <option key={index} value={_.get(data, 'projectId')}>
                                                            {_.get(data, 'projectName')}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                    </form>
                    <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                        <button className='btn btn-primary rounded-0 me-2' onClick={() => this.getWorkItemsData()}>
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </button>
                        <button className='btn btn-default rounded-0' onClick={() => this.resetData()}>
                            <FontAwesomeIcon icon={faRefresh} /> Reset
                        </button>
                    </div>
                </div>
                {
                    !reload && (_.get(workItems, 'length', 0) !== 0) &&
                    <div className='my-3'>
                        <div className="table">
                            <div className="table-responsive">
                                <div className="table-head">
                                    <div className="table-cell short" onClick={() => this.sortData('projectStatus')}>
                                        {this.getSortIcon('projectStatus')}
                                    </div>
                                    <div className="table-cell long" onClick={() => this.sortData('title')}>
                                        <span className='flex-between'>
                                            <span>Title</span>
                                            {this.getSortIcon('title')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium-long' onClick={() => this.sortData('projectStatus')}>
                                        <span className='flex-between'>
                                            <span>Step</span>
                                            {this.getSortIcon('projectStatus')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('workPriority')}>
                                        <span className='flex-between'>
                                            <span>Priority</span>
                                            {this.getSortIcon('workPriority')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('originalEstTime')}>
                                        <span className='flex-between'>
                                            <span>Estimation</span>
                                            {this.getSortIcon('originalEstTime')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('remainingEstTime')}>
                                        <span className='flex-between'>
                                            <span>Remaning</span>
                                            {this.getSortIcon('remainingEstTime')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('totalWorkDone')}>
                                        <span className='flex-between'>
                                            <span>Work Time</span>
                                            {this.getSortIcon('totalWorkDone')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('startDate')}>
                                        <span className='flex-between'>
                                            <span>Start Date</span>
                                            {this.getSortIcon('startDate')}
                                        </span>
                                    </div>
                                    <div className='table-cell medium' onClick={() => this.sortData('endDate')}>
                                        <span className='flex-between'>
                                            <span>End Date</span>
                                            {this.getSortIcon('endDate')}
                                        </span>
                                    </div>
                                    <div className='table-cell short text-center'>Action</div>
                                </div>
                                <div className="table-body">
                                    {
                                        _.map(projectsList, (project) => {
                                            return (
                                                <>
                                                    {
                                                        _.find(workItems, { projectId: _.get(project, 'projectId') }) &&
                                                        <Accordion className='w-100 p-0' defaultExpanded={true} key={_.get(project, 'projectId')}>
                                                            <AccordionSummary className='border' expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                                                                {_.get(project, 'projectName')}
                                                            </AccordionSummary>
                                                            <AccordionDetails className='p-0'>
                                                                {
                                                                    _.map(workItems, (data, index) => {
                                                                        if (_.get(project, 'projectId') === _.get(data, 'projectId')) {
                                                                            return (
                                                                                <div className="table-row" key={index}>
                                                                                    <div className="table-cell short">
                                                                                        <div className={this.selectProjectStateClass(_.get(data, 'projectStatusId')) + ' project-status-tag'} >
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="table-cell long">{_.get(data, 'title')}</div>
                                                                                    <div className="table-cell medium-long">{projectStatus[_.get(data, 'projectStatusId')]}</div>
                                                                                    <div className="table-cell medium">{_.get(data, 'workPriority')}</div>
                                                                                    <div className="table-cell medium">{formatTime(_.get(data, 'originalEstTime'))} Hrs</div>
                                                                                    <div className="table-cell medium">{formatTime(_.get(data, 'remainingEstTime'))} Hrs</div>
                                                                                    <div className="table-cell medium">{formatTime(_.get(data, 'totalWorkDone'))} Hrs</div>
                                                                                    <div className="table-cell medium">{formatDate(_.get(data, 'startDate'))}</div>
                                                                                    <div className="table-cell medium">{formatDate(_.get(data, 'endDate'))}</div>
                                                                                    <div className="table-cell short text-center">
                                                                                        <FontAwesomeIcon icon={faClock} onClick={() => this.addWorkLogtime(data)} />
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='t-footer'>Records 1 to {_.get(workItems, 'length')} of ({_.get(workItems, 'length')})</div>
                    </div>
                }
                {
                    !reload && (_.get(workItems, 'length', 0) === 0) &&
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

export default WorkItems;