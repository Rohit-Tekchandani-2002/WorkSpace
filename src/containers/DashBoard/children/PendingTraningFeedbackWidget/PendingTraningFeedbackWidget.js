import './PendingTraningFeedbackWidget.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getWidgetPendingTraningFeedBack } from '../../../../services/DashBoard/dashBoard.service';
import { formatDate } from "../../../../config/utility";
import RootContext from "../../../../context/RootContext/RootContext";
import _ from 'lodash';
import { addRemoveWidgetContext } from "../../../../constants/modalConstants";
import ModualLoader from "../../../../components/ModualLoader/ModualLoader";

const PendingTraningFeedbackWidget = () => {
    const rootContext = useContext(RootContext);
    let { addRemoveWidget, setGlobal, handleError } = rootContext;
    let addRemoveWidgetOptions = JSON.parse(localStorage.getItem('addRemoveWidget')) ?? addRemoveWidgetContext;
    let { pendingTraningFeedbackWidget } = addRemoveWidget || addRemoveWidgetOptions;
    const [pendingTraningFeedBackData, setPendingTraningFeedBackData] = useState({});
    let employeeId = localStorage.getItem('employeeId');
    const [reloading, setReloading] = useState(false);
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);

    const getWidgetData = () => {
        getWidgetPendingTraningFeedBackData();
        // getWidgetPendingTraningFeedBack(employeeId).then((data) => {
        //     console.log('getWidgetPendingTraningFeedBack: ', data);
        //     setPendingTraningFeedBackData(data);
        // })
    }

    const getWidgetPendingTraningFeedBackData = async () => {
        var tempData = await getWidgetPendingTraningFeedBack(employeeId).catch(handleError);
        if (tempData) {
            setPendingTraningFeedBackData(tempData);
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

    const closeWidgetPendingTraningFeedbackWidget = () => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
        _.set(addRemoveWidget, 'pendingTraningFeedbackWidget', !addRemoveWidget.pendingTraningFeedbackWidget);
        setGlobal('addRemoveWidget', addRemoveWidget);
        setIsModuleRefersh(!isModuleRefersh);
    }

    return (
        <>
            {
                pendingTraningFeedbackWidget &&
                <div className='col-md p-2'>
                    {
                        !reloading && <div className="widget border">
                            <div className="widgets_title">
                                <span>Pending Traning Feedback</span>
                                <span>
                                    <FontAwesomeIcon icon={faRefresh} className='font_icon_size18 me-2' onClick={reLoadWidget} />
                                    <FontAwesomeIcon icon={faClose} className='font_icon_size20' onClick={closeWidgetPendingTraningFeedbackWidget} />
                                </span>
                            </div>
                            <div className='showrecentproject'>
                                <div className="table">
                                    <div className="table-responsive">
                                        <div className="table-head">
                                            <div className="table-cell">Title</div>
                                            <div className="table-cell">Date</div>
                                        </div>
                                        <div className="table-body">
                                            {
                                                pendingTraningFeedBackData && _.get(pendingTraningFeedBackData, 'length', 0) > 0 
                                                && _.map( pendingTraningFeedBackData, ((data) =>
                                                    <div key={data.title} className="table-row">
                                                        <div className="table-cell">{data.title}</div>
                                                        <div className="table-cell">{formatDate(data.date)}</div>
                                                    </div>
                                                ))
                                            }
                                            {
                                                pendingTraningFeedBackData && _.get(pendingTraningFeedBackData, 'length', 0) <= 0
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

export default PendingTraningFeedbackWidget