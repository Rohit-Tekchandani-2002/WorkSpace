import './RecentProjectWidget.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getWidgetMyRecentProjects } from '../../../../services/DashBoard/dashBoard.service';
import { formatDate } from "../../../../config/utility";
import RootContext from "../../../../context/RootContext/RootContext";
import _ from 'lodash';
import { addRemoveWidgetContext } from "../../../../constants/modalConstants";
import ModualLoader from '../../../../components/ModualLoader/ModualLoader';

const RecentProjectWidget = () => {
    const rootContext = useContext(RootContext);
    let { addRemoveWidget, setGlobal, handleError} = rootContext;
    let addRemoveWidgetOptions = JSON.parse(localStorage.getItem('addRemoveWidget')) ?? addRemoveWidgetContext;
    let { myRecentProjectsWidget } = addRemoveWidget || addRemoveWidgetOptions;
    const [showRecentProject, setShowRecentProject] = useState(true);
    const [recentProjectData, setRecentProjectData] = useState({ myRecentProjects: {}, myCurrentWorkItems: {} });
    let employeeId = localStorage.getItem('employeeId');
    const [reloading, setReloading] = useState(false);
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);

    const getWidgetData = () => {
        getWidgetMyRecentProjectsData();
        // getWidgetMyRecentProjects(employeeId).then((data) => {
        //     setRecentProjectData(data);
        // })
    }

    const getWidgetMyRecentProjectsData = async () => {
        var tempData = await getWidgetMyRecentProjects(employeeId).catch(handleError);
        if (tempData) {
            setRecentProjectData(tempData);
        }
    }

    useEffect(() => {
        getWidgetData();
    }, [])

    const reLoadWidget = () => {
        setReloading(true);
        setTimeout(() => {
            getWidgetData();
            setReloading(false);
        }, 1000);
        clearTimeout();
    }

    const closeWidgetRecentProject = () => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
        _.set(addRemoveWidget, 'myRecentProjectsWidget', false);
        setGlobal('addRemoveWidget', addRemoveWidget);
        setIsModuleRefersh(!isModuleRefersh);
    }

    return (
        <>
            {myRecentProjectsWidget && <div className='col p-2'>
                {!reloading && <div className="widget border">
                    <div className="widgets_title">
                        <span>
                            <span className={!showRecentProject ? 'color_blue' : ''} onClick={() => setShowRecentProject(!showRecentProject)}>
                                My Recent Projects
                            </span> |
                            <span className={(showRecentProject ? 'color_blue' : '') + ' ' + 'ps-2'} onClick={() => setShowRecentProject(!showRecentProject)}>
                                My Current Work Item
                            </span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faRefresh} className='font_icon_size18 me-2' onClick={reLoadWidget} />
                            <FontAwesomeIcon icon={faClose} className='font_icon_size20' onClick={closeWidgetRecentProject} />
                        </span>
                    </div>
                    {!reloading && showRecentProject && <div className='showrecentproject'>
                        <div className="table">
                            <div className="table-responsive">
                                <div className="table-head">
                                    <div className="table-cell verylong">Project Name</div>
                                    <div className="table-cell medium">Release Date</div>
                                    <div className="table-cell short">Team Size</div>
                                    <div className="table-cell short">Quality</div>
                                </div>
                                <div className="table-body">
                                    {
                                        recentProjectData && _.get(recentProjectData, 'myRecentProjects.length', 0) &&
                                        _.map(_.get(recentProjectData, 'myRecentProjects', {}),
                                            ((data) =>
                                                <div key={data.projectId} className="table-row">
                                                    <div className="table-cell verylong"><a>{data.projectName}</a></div>
                                                    <div className="table-cell medium">{formatDate(data.releaseDate)}</div>
                                                    <div className="table-cell short">{data.teamSize}</div>
                                                    <div className="table-cell short"></div>
                                                </div>
                                            ))
                                    }
                                    {
                                        recentProjectData && _.get(recentProjectData, 'myRecentProjects.length', 0) <= 0
                                        && <div className="table-row">No data found</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='viewall_div'>
                            <span className="db_viewall"><a>View All</a></span>
                        </div>
                    </div>}
                    {!reloading && !showRecentProject && <div className="showrecentproject">
                        <div className="table">
                            <div className="table-responsive">
                                <div className="table-head">
                                    <div className="table-cell medium">Work Item</div>
                                    <div className="table-cell long">Project</div>
                                    <div className="table-cell medium">Start Date</div>
                                    <div className="table-cell medium">End Date</div>
                                    <div className="table-cell medium">priority</div>
                                    <div className="table-cell short text-center">Action</div>
                                </div>
                                <div className="table-body">
                                    {
                                        recentProjectData && _.get(recentProjectData, 'myCurrentWorkItems.length', 0) > 0 &&
                                        _.map(_.get(recentProjectData, 'myCurrentWorkItems', {}),
                                            ((data) =>
                                                <div key={data.projectWorkId} className="table-row">
                                                    <div className="table-cell medium"><a>#TA{data.projectWorkId}</a></div>
                                                    <div className="table-cell long"><a>{data.projectName}</a>
                                                    </div>
                                                    <div className="table-cell medium">{formatDate(data.startDate)}</div>
                                                    <div className="table-cell medium">{formatDate(data.endDate)}</div>
                                                    <div className="table-cell medium">{data.priority}</div>
                                                    <div className="table-cell short text-center">
                                                    </div>
                                                </div>
                                            ))
                                    }
                                    {
                                        recentProjectData && _.get(recentProjectData, 'myCurrentWorkItems.length', 0) <= 0
                                        && <div className="table-row">No data found</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="viewall_div">
                            <span className="db_viewall"><a>View All</a></span>
                        </div>
                    </div>}
                </div>}
                {reloading && <ModualLoader customClass={'widget border'} />}
            </div >}
        </>
    );
}

export default RecentProjectWidget