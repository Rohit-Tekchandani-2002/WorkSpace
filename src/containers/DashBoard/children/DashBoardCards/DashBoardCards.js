import './DashBoardCards.css';
import { getDashBoardInfo, getNewsAndUpdates } from '../../../../services/DashBoard/dashBoard.service'
import { useEffect, useState, useContext } from 'react';
import { formatTime } from "../../../../config/utility";
import RootContext from "../../../../context/RootContext/RootContext";
import { modalDefaultContext } from "../../../../constants/modalConstants";
import _ from 'lodash';

const DashBoardCards = () => {
    const rootContext = useContext(RootContext);
    let {handleError} = rootContext;
    const [dashBoardInfo, setDashBoardInfo] = useState({
        assignWorkHours: 0,
        isAttendanceAdded: false,
        monthlyFullLeaves: 0,
        monthlyHalfLeaves: 0,
        monthlyLeaveDates: "",
        monthlyPendingWorkLogEntryCount: 0,
        monthlyTimeLog: 0,
        monthlyTotalLeaves: 0,
        monthlyWorkLog: 0,
        totalWorkItems: 0,
        workHours: 0,
        yearlyTotalLeaves: 0
    });
    const [newsAndUpdates, setNewsAndUpdates] = useState([{
        documentPath: "",
        newsDate: "",
        newsDescription: null,
        newsId: 0,
        newsTitle: "",
        updateAt: ""
    }]);
    let employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
        getNewsAndUpdatesData();
        // getNewsAndUpdates().then((data) => { setNewsAndUpdates(data); });
        if (employeeId) {
            getDashBoardInfoData();
            // getDashBoardInfo(employeeId).then((data) => { setDashBoardInfo(data); })
        }
    }, [employeeId]);

    const getNewsAndUpdatesData = async () => {
        var tempData = await getNewsAndUpdates().catch(handleError);
        if (tempData) {
            setNewsAndUpdates(tempData);
        }
    }

    const getDashBoardInfoData = async () => {
        var tempData = await getDashBoardInfo(employeeId).catch(handleError);
        if (tempData) {
            setDashBoardInfo(tempData);
        }
    }

    // Modal
    const [showNewsAndUpdate, setShowNewsAndUpdateModal] = useState(false);
    const [newsAndUpdateData, setNewsAndUpdateData] = useState({
        title: null,
        body: null
    });
    const handleNewsAndUpdateModalClose = () => {
        setShowNewsAndUpdateModal(false);
        setNewsAndUpdateData({
            title: null,
            body: null
        })
    };

    useEffect(() => {
        let { setGlobal, modalData } = rootContext;
        if (!modalData) {
            modalData = modalDefaultContext;
            setGlobal('modalData', modalData);
        }
        modalData = {
            modalType: 'InformationModal',
            title: newsAndUpdateData.title,
            body: newsAndUpdateData.body,
            show: showNewsAndUpdate,
            handleClose: handleNewsAndUpdateModalClose
        };
        setGlobal('modalData', modalData);
    }, [showNewsAndUpdate]);

    const showNewsAndUpdatesModal = (news) => {
        let tempDate = new Date(_.get(news, 'newsDate', ''));
        let tempDateString = tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
        let tempBody = (<div>
            <div className='flex-between'>
                <div>Discription:</div>
                <div>{tempDateString}</div>
            </div>
            <div className='py-1'>
                {_.get(news, 'newsDescription', '')}
            </div>
            <div className='py-1'>
                <a href={_.get(news, 'documentPath', '')} target="_blank" >{_.get(news, 'newsTitle', '')}</a>
            </div>
        </div>);
        setNewsAndUpdateData({
            title: _.get(news, 'newsTitle'),
            body: tempBody
        });
        setShowNewsAndUpdateModal(true);
    }

    return (
        <div className='p-3 user-select-none'>
            {dashBoardInfo &&
                <div className='row'>
                    <div className='p-2 col-12 col-md-6 col-xl-3'>
                        <div className='top-box news_events'>
                            <h3 className="db_title">News/Events</h3>
                            <ul className='news_list'>
                                {_.map(newsAndUpdates, (item) => (
                                    <li key={item.newsId} onClick={() => showNewsAndUpdatesModal(item)}>{item.newsTitle}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='p-2 col-12 col-md-6 col-xl-3'>
                        <div className='top-box monthly_average'>
                            <h3 className="db_title">My Monthly Average</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="33%">
                                            <p>Time-Log</p>
                                            <div className='num-tag'> {formatTime(_.get(dashBoardInfo, 'monthlyTimeLog', 0))} </div>
                                        </td>
                                        <td className="box_bord">
                                            <p>Work-Log</p>
                                            <div className='num-tag'> {formatTime(_.get(dashBoardInfo, 'monthlyWorkLog', 0))} </div>
                                        </td>
                                        <td className="box_bord" width="33%">
                                            <p>Difference</p>
                                            <div className='num-tag'>{formatTime(Math.abs(_.get(dashBoardInfo, 'monthlyTimeLog', 0) - _.get(dashBoardInfo, 'monthlyWorkLog', 0)))}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="db_text">
                                Pending Entry <span>{_.get(dashBoardInfo, 'monthlyPendingWorkLogEntryCount', 0)} day(s)</span>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 col-12 col-md-6 col-xl-3'>
                        <div className='top-box my_leave'>
                            {!_.get(dashBoardInfo, 'isAttendanceAdded', false) &&
                                <span className='fill-attendance'><span>Fill Attendance</span></span>}
                            <h3 className="db_title">My Monthly Leaves</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="33%">
                                            <p>Leaves</p>
                                            <div className='num-tag'> {_.get(dashBoardInfo, 'monthlyTotalLeaves')} </div>
                                        </td>
                                        <td className="box_bord">
                                            <p>Full/Half</p>
                                            <div className='num-tag'>
                                                {_.get(dashBoardInfo, 'monthlyFullLeaves', 0)}/{_.get(dashBoardInfo, 'monthlyHalfLeaves', 0)}</div>
                                        </td>
                                        <td className="box_bord" width="33%">
                                            <p>Total</p>
                                            <div className='num-tag'> {_.get(dashBoardInfo, 'yearlyTotalLeaves')} </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="db_text">
                                Leave Date: {_.get(dashBoardInfo, 'monthlyLeaveDates')}
                            </div>
                        </div>
                    </div>
                    <div className='p-2 col-12 col-md-6 col-xl-3'>
                        <div className='top-box my_assignment'>
                            <h3 className="db_title">My Assignments</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="33%">
                                            <p>Ass. Hrs</p>
                                            <div className='num-tag'>{formatTime(_.get(dashBoardInfo, 'assignWorkHours', 0))}</div>
                                        </td>
                                        <td className="box_bord">
                                            <p>Work. Hrs</p>
                                            <div className='num-tag'>{formatTime(_.get(dashBoardInfo, 'workHours', 0))}</div>
                                        </td>
                                        <td className="box_bord" width="33%">
                                            <p>Rem. Hrs</p>
                                            <div className='num-tag'>{formatTime(Math.abs(_.get(dashBoardInfo, 'assignWorkHours', 0) - _.get(dashBoardInfo, 'workHours', 0)))}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="db_text">
                                Total Work Items: {_.get(dashBoardInfo, 'totalWorkItems', 0)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DashBoardCards;