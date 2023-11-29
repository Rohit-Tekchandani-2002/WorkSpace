import './WorkBacklog.css';
import { faAngleRight, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import RootContext from '../../context/RootContext/RootContext';
import { workBacklogDefaultContext } from '../../constants/workBackLogConstants';
import { getProjectWorkgroup, getWorkGroupInfo, getWorkLog } from '../../services/Project/project.service'
import _ from 'lodash';
import { formatDate } from '../../config/utility';
import { workFlowTypeOptions, projectStatusOptions } from "../../constants/constants";
import AlertPopUp from '../../components/AlertPopUp/AlertPopUp';
import { alertPopUpDefaultContext } from '../../constants/alertPopupDefaultContext';
import AlertComponent from '../../components/AlertComponent/AlertComponent';
import ModualLoader from '../../components/ModualLoader/ModualLoader';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import DashBoard from './children/DashBoard/DashBoard';
import ToolBar from './children/ToolBar/ToolBar';
import ActivityStream from './children/ActivityStream/ActivityStream';
import BoxView from './children/BoxView/BoxView';
import ListView from './children/ListView/ListView';
import TeamRooster from './children/TeamRooster/TeamRooster';
import WorkLog from './children/WorkLog/WorkLog';

class WorkBacklog extends Component {
    static contextType = RootContext;
    state = {
        refershModule: false,
        workGroupId: localStorage.getItem('workGroupId'),
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
            let request = _.get(this.context, 'workBacklog.filter', {workGroupId: _.get(this.state, 'workGroupId')});
            let tempData = await getWorkLog(request).catch(handleError);
            if (tempData) {
                // console.log('workLog', tempData);
                _.set(this.context, 'workBacklog.workLog', tempData);
                setGlobal('workBacklog', _.get(this.context, 'workBacklog'));
                this.setState({ refershModule: !_.get(this.state, 'refershModule') });
            }
        }
    }

    addWorkLogtime = (workLog) => {
        let { modalData, setGlobal } = this.context;
        if (workLog) {
            modalData = {
                modalType: 'AddWorkLogModal',
                show: true,
                data: workLog,
                handleConfirm: (message) => {
                    this.getWorkLogData();
                    setGlobal('modalData', { show: false });
                    this.setState({ alertMessage: message })
                }
            };
            setGlobal('modalData', modalData);
            this.setState({ refershModule: !_.get(this.state, 'refershModule') });
        }
    }

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

    showActiveWindow = () => {
        const activeWindow = _.get(this.state, 'activeWindow');
        let content = null;
        switch (activeWindow) {
            case 'dashboard':
                let dashBoardProps = {
                    addWorkLogtime: this.addWorkLogtime,
                    setAlertMessage: (message) => { this.setState({ alertMessage: message }) }
                }
                content = <DashBoard {...dashBoardProps}/>
                break;
            case 'listView':
                let listViewProps = {
                    addWorkLogtime: this.addWorkLogtime,
                }
                content = <ListView {...listViewProps}/>
                break;
            case 'boxView':
                let boxViewProps = {
                    addWorkLogtime: this.addWorkLogtime,
                }
                content = <BoxView {...boxViewProps}/>
                break;
            case 'teamRooster':
                content = <TeamRooster />
                break;
            case 'activityStream':
                content = <ActivityStream />
                break;
            case 'workLog':
                content = <WorkLog />
                break;
            default:
                break;
        }

        return content;
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
                        type={'success'}
                    />
                    <ToolBar
                        setActiveWindow={(value) => this.setState({ activeWindow: value })}
                        toggleFilter={toggleFilter}
                        getActiveWindowClass={this.getActiveWindowClass}
                        reloadData={this.reloadData}
                    />
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
                    {
                        !_.get(this.state, 'reload', false) && this.showActiveWindow()
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