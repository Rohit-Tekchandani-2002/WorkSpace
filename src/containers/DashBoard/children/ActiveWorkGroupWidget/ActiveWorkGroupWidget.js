import './ActiveWorkGroupWidget.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getWidgetActiveWorkGroups } from '../../../../services/DashBoard/dashBoard.service';
import RootContext from "../../../../context/RootContext/RootContext";
import _ from 'lodash';
import { addRemoveWidgetContext } from "../../../../constants/modalConstants";
import ModualLoader from "../../../../components/ModualLoader/ModualLoader";

const ActiveWorkGroupWidget = () => {
    const rootContext = useContext(RootContext);
    let { addRemoveWidget, setGlobal, handleError } = rootContext;
    let addRemoveWidgetOptions = JSON.parse(localStorage.getItem('addRemoveWidget')) ?? addRemoveWidgetContext;
    let { activeWorkGroupWidget } = addRemoveWidget || addRemoveWidgetOptions;
    const [activeWorkGroupData, setActiveWorkGroupData] = useState({});
    let employeeId = localStorage.getItem('employeeId');
    const [reloading, setReloading] = useState(false);
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);

    const getWidgetData = () => {
        getWidgetActiveWorkGroupsData();
        // getWidgetActiveWorkGroups(employeeId).then((data) => {
        //     console.log('getWidgetActiveWorkGroups: ', data);
        //     setActiveWorkGroupData(data);
        // })
    }

    const getWidgetActiveWorkGroupsData = async () => {
        var tempData = await getWidgetActiveWorkGroups(employeeId).catch(handleError);
        if (tempData) {
            setActiveWorkGroupData(tempData);
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

    const closeWidgetActiveWorkGroup = () => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
        _.set(addRemoveWidget, 'activeWorkGroupWidget', false);
        setGlobal('addRemoveWidget', addRemoveWidget);
        setIsModuleRefersh(!isModuleRefersh);
    }

    return (
        <>
            {activeWorkGroupWidget && <div className='col-md p-2'>
                {!reloading &&
                    <div className="widget border">
                        <div className="widgets_title">
                            <span>Active Work Group</span>
                            <span>
                                <FontAwesomeIcon icon={faRefresh} className='font_icon_size18 me-2' onClick={reLoadWidget} />
                                <FontAwesomeIcon icon={faClose} className='font_icon_size20' onClick={closeWidgetActiveWorkGroup} />
                            </span>
                        </div>
                        <div className='showrecentproject'>
                            <div className="table">
                                <div className="table-responsive">
                                    <div className="table-head">
                                        <div className="table-cell medium">Project</div>
                                        <div className="table-cell medium">Work Group</div>
                                    </div>
                                    <div className="table-body">
                                        {
                                            activeWorkGroupData && _.get(activeWorkGroupData, 'length', 0) > 0 
                                            &&  _.map(activeWorkGroupData,((data) =>
                                                <div key={data.workGroupId} className="table-row">
                                                    <div className="table-cell medium">{_.get(data, 'projectName', '')}</div>
                                                    <div className="table-cell medium">{_.get(data, 'workGroupName', '')}</div>
                                                </div>
                                            ))
                                        }
                                        {
                                            activeWorkGroupData && _.get(activeWorkGroupData, 'length', 0) <= 0 && <div className="table-row">No data found</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                {
                    reloading && <ModualLoader customClass={'widget border'} />
                }
            </div>}
        </>
    );
}

export default ActiveWorkGroupWidget