import './TeamWorkItemWidget.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getWidgetTeamWorkItems } from '../../../../services/DashBoard/dashBoard.service';
import RootContext from "../../../../context/RootContext/RootContext";
import _ from 'lodash';
import { addRemoveWidgetContext } from "../../../../constants/modalConstants";
import ModualLoader from "../../../../components/ModualLoader/ModualLoader";

const TeamWorkItemWidget = () => {
    const rootContext = useContext(RootContext);
    let { addRemoveWidget, setGlobal, handleError } = rootContext;
    let addRemoveWidgetOptions = JSON.parse(localStorage.getItem('addRemoveWidget')) ?? addRemoveWidgetContext;
    let { teamWorkItemWidget } = addRemoveWidget || addRemoveWidgetOptions;
    const [teamWorkItemsData, setTeamWorkItemsData] = useState({});
    let employeeId = localStorage.getItem('employeeId');
    const [reloading, setReloading] = useState(false);
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);

    const getWidgetData = () => {
        getWidgetTeamWorkItemsData();
        // getWidgetTeamWorkItems(employeeId).then((data) => {
        //     console.log('getWidgetTeamWorkItems: ', data);
        //     setTeamWorkItemsData(data);
        // });
    }

    const getWidgetTeamWorkItemsData = async () => {
        var tempData = await getWidgetTeamWorkItems(employeeId).catch(handleError);
        if (tempData) {
            setTeamWorkItemsData(tempData);
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

    const closeWidgetTeamWorkItem = () => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
        _.set(addRemoveWidget, 'teamWorkItemWidget', false);
        setGlobal('addRemoveWidget', addRemoveWidget);
        setIsModuleRefersh(!isModuleRefersh);
    }

    return (
        <>
            {
                teamWorkItemWidget && <div className='col-md p-2'>
                    {!reloading && <div className="widget border">
                        <div className="widgets_title">
                            <span>Team - Work Items</span>
                            <span>
                                <FontAwesomeIcon icon={faRefresh} className='font_icon_size18 me-2' onClick={reLoadWidget} />
                                <FontAwesomeIcon icon={faClose} className='font_icon_size20' onClick={closeWidgetTeamWorkItem} />
                            </span>
                        </div>
                        <div className='showrecentproject'>
                            <div className="table">
                                <div className="table-responsive">
                                    <div className="table-head">
                                        <div className="table-cell">Name</div>
                                        <div className="table-cell">Project</div>
                                        <div className="table-cell short">Work Items</div>
                                    </div>
                                    <div className="table-body">
                                        {
                                            teamWorkItemsData && _.get(teamWorkItemsData, 'length', 0) > 0 && _.map(teamWorkItemsData, 
                                                ((data, Index) =>
                                                <div key={Index} className="table-row">
                                                    <div className="table-cell">{data.name}</div>
                                                    <div className="table-cell">{data.projectName}</div>
                                                    <div className="table-cell short">{data.workItems}</div>
                                                </div>
                                            ))
                                        }
                                        {
                                            teamWorkItemsData && _.get(teamWorkItemsData, 'length', 0) <= 0
                                            && <div className="table-row">No data found</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    { reloading && <ModualLoader customClass={'widget border'}/> }
                </div>
            }
        </>
    );
}

export default TeamWorkItemWidget