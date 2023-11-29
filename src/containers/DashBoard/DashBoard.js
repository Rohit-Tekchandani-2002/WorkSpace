import './DashBoard.css';
import DashBoardCards from './children/DashBoardCards/DashBoardCards';
import RecentProjectWidget from './children/RecentProjectWidget/RecentProjectWidget';
import ActiveWorkGroupWidget from './children/ActiveWorkGroupWidget/ActiveWorkGroupWidget';
import PendingTraningFeedbackWidget from './children/PendingTraningFeedbackWidget/PendingTraningFeedbackWidget';
import TeamWorkItemWidget from './children/TeamWorkItemWidget/TeamWorkItemWidget';
import { useEffect, useState, useContext } from 'react';
import RootContext from "../../context/RootContext/RootContext";
import { modalDefaultContext } from "../../constants/modalConstants";
import _ from 'lodash';

const DashBoard = () => {
    
    return (
        <div className='dashboard-container'>
            <DashBoardCards />
            <div className='row w-100 m-auto p-0'>
                <RecentProjectWidget />
            </div>
            <div className='row w-100 m-auto p-0'>
                <ActiveWorkGroupWidget />
                <TeamWorkItemWidget />
                <PendingTraningFeedbackWidget />
            </div>
        </div>
    );
}

export default DashBoard 