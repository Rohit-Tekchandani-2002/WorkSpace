import './ProjectFilters.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd, faRefresh, faShare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getEmployeeList } from "../../../../services/Project/project.service";
import { useContext, useEffect, useState } from 'react';
import { projectStatus, workFlowType, priority } from "../../../../constants/constants";
import MultipleSelect from '../../../../components/MultipleSelect/MultipleSelect';
import RootContext from "../../../../context/RootContext/RootContext";
import { projectBackLogTableDefaultContext, exportProjectBacklogContext } from '../../../../constants/projectBackLogConstants';
import _ from 'lodash';

const ProjectFilters = props => {

    const {getListData} = props;
    const navigate = useNavigate();
    const rootContext = useContext(RootContext);
    let { setGlobal, projectBackLogListData, handleError } = rootContext;

    const handelAddProjectBackLog = () => {
        navigate('/add-project-worklog');
    }

    const [employeeList, setEmployeeList] = useState(null);

    useEffect(() => {
        getEmployeeListData();
        if (!projectBackLogListData) {
            projectBackLogListData = projectBackLogTableDefaultContext;
            setGlobal('projectBackLogListData', projectBackLogListData);
        }
    }, []);

    const getEmployeeListData = async() => {
        var tempData = await getEmployeeList().catch(handleError);
        if(tempData){
            setEmployeeList(tempData);
        }
    }

    const multiSelectOptions = [
        {value: 1 ,label: 'Item 1'},
        {value: 2 ,label: 'Item 2'},
        {value: 3 ,label: 'Item 3'},
        {value: 4 ,label: 'Item 4'},
        {value: 5 ,label: 'Item 5'},
    ]

    const handelSearchFilter = (event) => {
        handelFilter(event, 'searchFilter');
    }
    const handelWorkGroupSelect = (event) => {
        handelFilter(event, 'workGroupVal');
    }
    const handelAssignedToChange = (event) => {
        handelFilter(event, 'assignedPerson');
    }
    const handelworkFlowTypeChange = (event) => {
        handelFilter(event, 'projectType');
    }
    const handelprojectStatusChange = (event) => {
        handelFilter(event, 'projectStatus');
    }
    const handelStartChangeDate = (event) => {
        handelFilter(event, 'startDate');
    }
    const handelEndChangeDate = (event) => {
        handelFilter(event, 'endDate');
    }
    const handelpriorityChange = (event) => {
        handelFilter(event, 'projectpriority');
    }
    const handelReportedByChange = (event) => {
        handelFilter(event, 'reportedPerson');
    }

    const handelFilter = (event, filterFeild) => {
        let filterVal = event.target.value;
        if (filterVal && (filterVal.length > 0) && (filterVal !== '')) {
            switch (filterFeild) {
                case 'searchFilter':
                    _.set(projectBackLogListData, 'projectFilter.searchText', filterVal);
                    break;
                case 'workGroupVal':
                    _.set(projectBackLogListData, 'projectFilter.workGroupId', filterVal);
                    break;
                case 'assignedPerson':
                    _.set(projectBackLogListData, 'projectFilter.assignedPersonId', filterVal);
                    break;
                case 'projectType':
                    _.set(projectBackLogListData, 'projectFilter.projectType', filterVal);
                    break;
                case 'projectStatus':
                    _.set(projectBackLogListData, 'projectFilter.projectStatus', filterVal);
                    break;
                case 'startDate':
                    _.set(projectBackLogListData, 'projectFilter.startDate', filterVal);
                    break;
                case 'endDate':
                    _.set(projectBackLogListData, 'projectFilter.endDate', filterVal);
                    break;
                case 'projectpriority':
                    _.set(projectBackLogListData, 'projectFilter.priority', filterVal);
                    break;
                case 'reportedPerson':
                    _.set(projectBackLogListData, 'projectFilter.reportedPersonId', filterVal);
                    break;
                default:
                    break;
            }
        } else {
            switch (filterFeild) {
                case 'searchFilter':
                    _.set(projectBackLogListData, 'projectFilter.searchText', null);
                    break;
                case 'workGroupVal':
                    _.set(projectBackLogListData, 'projectFilter.workGroupId', null);
                    break;
                case 'assignedPerson':
                    _.set(projectBackLogListData, 'projectFilter.assignedPersonId', '');
                    break;
                case 'projectType':
                    _.set(projectBackLogListData, 'projectFilter.projectType', '');
                    break;
                case 'projectStatus':
                    _.set(projectBackLogListData, 'projectFilter.projectStatus', '');
                    break;
                case 'startDate':
                    _.set(projectBackLogListData, 'projectFilter.startDate', null);
                    break;
                case 'endDate':
                    _.set(projectBackLogListData, 'projectFilter.endDate', null);
                    break;
                case 'projectpriority':
                    _.set(projectBackLogListData, 'projectFilter.priority', null);
                    break;
                case 'reportedPerson':
                    _.set(projectBackLogListData, 'projectFilter.reportedPersonId', null);
                    break;
                default:
                    break;
            }
        }
        setGlobal('projectBackLogListData', projectBackLogListData);
    }

    const handelSearch = () => {
        getListData();
    }

    const hadelReset = () => {
        _.set(projectBackLogListData, 'projectFilter.searchText', null);
        _.set(projectBackLogListData, 'projectFilter.workGroupId', null);
        _.set(projectBackLogListData, 'projectFilter.assignedPersonId', '');
        _.set(projectBackLogListData, 'projectFilter.reportedPersonId', null);
        _.set(projectBackLogListData, 'projectFilter.projectType', '');
        _.set(projectBackLogListData, 'projectFilter.projectStatus', '');
        _.set(projectBackLogListData, 'projectFilter.startDate', null);
        _.set(projectBackLogListData, 'projectFilter.endDate', null);
        _.set(projectBackLogListData, 'projectFilter.priority', null);
        _.set(projectBackLogListData, 'projectFilter.pageNumber', 1);
        _.set(projectBackLogListData, 'projectFilter.pageSize', 5);
        _.set(projectBackLogListData, 'projectFilter.expression', 'title');
        _.set(projectBackLogListData, 'projectFilter.isSortByAsc', true);
        setGlobal('projectBackLogListData', projectBackLogListData);
    }

    const handelExportProjectBackLog = () => {
        let {exportProjectBacklog} = rootContext;
        if (!exportProjectBacklog) {
            exportProjectBacklog = exportProjectBacklogContext;
            setGlobal('exportProjectBacklog', exportProjectBacklog);
        }
        alert(_.toString(_.get(exportProjectBacklog, 'selectedoptions', [])) + ' ' + _.get(exportProjectBacklog, 'selectedoptions.length', 0) + ' Items Exported');
    }
    
    return (
        <>
            <div className='filter'>
                <form>
                    <div className="projectfilter">
                        <div className='row'>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Work Group</label>
                                <select className="form-select" onSelect={handelWorkGroupSelect}>
                                    <option value=''>Select All</option>
                                    <option value="1">July - 2023</option>
                                    <option value="2">Oct - 2023</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Assigned To</label>
                                {employeeList && <select className="form-select" onChange={handelAssignedToChange}>
                                    <option value=''>Select All</option>
                                    {_.map(employeeList, e =>
                                        <option key={e.keyId} value={e.keyId}>{e.dataValue}</option>
                                    )};
                                </select>}
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Type</label>
                                <select className="form-select" onChange={handelworkFlowTypeChange}>
                                    <option value=''>Select All</option>
                                    {_.map(Object.entries(workFlowType), ([key, value]) =>
                                        <option key={key} value={key}>{value}</option>
                                    )};
                                </select>
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Status</label>
                                <select className="form-select" onChange={handelprojectStatusChange}>
                                    <option value=''>Select All</option>
                                    {_.map(Object.entries(projectStatus), ([key, value]) =>
                                        <option key={key} value={key}>{value}</option>
                                    )};
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Search</label>
                                <div className="input-group">
                                    <span className="input-group-addon nobg"><FontAwesomeIcon icon={faSearch} /></span>
                                    <input className="form-control" onChange={handelSearchFilter} placeholder="Search..." type="text" />
                                </div>
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Start Date</label>
                                <input className="form-control" onChange={handelStartChangeDate} type="date" />
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>End Date</label>
                                <input className="form-control" onChange={handelEndChangeDate} type="date" />
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>priority</label>
                                <select className="form-select" onChange={handelpriorityChange}>
                                    <option value=''>Select All</option>
                                    {_.map(Object.entries(priority), ([key, value]) =>
                                        <option key={key} value={key}>{value}</option>
                                    )};
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>Reported By</label>
                                {employeeList && <select className="form-select" onChange={handelReportedByChange}>
                                    <option value=''>Select All</option>
                                    {_.map(employeeList, e =>
                                        <option key={e.keyId} value={e.keyId}>{e.dataValue}</option>
                                    )};
                                </select>}
                            </div>
                            <div className="form-group col-md-6 col-lg-3 m-0">
                                <label>MultiSelect</label>
                                <MultipleSelect Options={multiSelectOptions} onChange={(val) => console.log('multi select val', val)}/>
                            </div>
                        </div>
                    </div>
                    <div className='projectfilter-footer'>
                        <button className="btn btn-primary rounded-0 m-1" onClick={handelSearch} type='button'> <FontAwesomeIcon icon={faSearch}/> Search </button>
                        <button className="btn btn-secondary rounded-0 m-1" type='reset' onClick={hadelReset}> <FontAwesomeIcon icon={faRefresh} /> Clear </button>
                    </div>
                </form>
            </div>
            <div className='addprojectBacklog'>
                <button className="btn btn-primary rounded-0 m-1" onClick={handelAddProjectBackLog}> <FontAwesomeIcon icon={faAdd} /> Add </button>
                <button className="btn btn-secondary rounded-0 m-1" onClick={handelExportProjectBackLog}> <FontAwesomeIcon icon={faShare} /> Export </button>
            </div>
        </>
    );
}

export default ProjectFilters