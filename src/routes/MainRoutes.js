import Login from '../containers/Login/Login';
import DashBoard from '../containers/DashBoard/DashBoard';
import ProjectBackLog from '../containers/ProjectBackLog/ProjectBackLog.js';
import ManageProjectbackLog from '../containers/ManageProjectBacklog/ManageProjectbackLog';
import WorkGroup from '../containers/WorkGroups/WorkGroups';
import PageNotFound from '../containers/PageNotFound/PageNotFound.js';
import UserProfile from '../containers/UserProfile/UserProfile'
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import RouteWrapper from "./RouteWrapper";
import WorkBacklog from '../containers/WorkBacklog/WorkBacklog';
import Attendance from '../containers/Workspace/Attendance/Attendance';
import Projects from '../containers/Workspace/Projects/Projects';
import ServiceRequest from '../containers/Workspace/ServiceRequest/ServiceRequest';
import TimeLogs from '../containers/Workspace/TimeLogs/TimeLogs';
import Timesheets from '../containers/Workspace/Timesheets/Timesheets';
import WorkItems from '../containers/Workspace/WorkItems/WorkItems';
import LeaveRequestForm from '../containers/Workspace/LeaveRequest/children/LeaveRequestForm/LeaveRequestForm.js';
import LeaveRequest from '../containers/Workspace/LeaveRequest/LeaveRequest.js';
import ServiceRequestForm from '../containers/Workspace/ServiceRequest/children/ServiceRequestForm/ServiceRequestForm.js';
import MyTraningAsTrainee from '../containers/Traning/MyTraningAsTrainee/MyTraningAsTrainee.js';
import TraningFeedback from '../containers/Traning/MyTraningAsTrainee/children/TraningFeedback/TraningFeedback.js';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route exact path='/login' element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route exact path="/dashboard" element={<RouteWrapper Component={DashBoard} Layout={Layout} />} />
            <Route exact path="/project-backlog" element={<RouteWrapper Component={ProjectBackLog} Layout={Layout} />} />
            <Route exact path="/add-project-worklog" element={<RouteWrapper Component={ManageProjectbackLog} Layout={Layout} />} />
            <Route exact path="/edit-project-worklog/:id" element={<RouteWrapper Component={ManageProjectbackLog} Layout={Layout} />} />
            <Route exact path="/work-group" element={<RouteWrapper Component={WorkGroup} Layout={Layout} />} />
            <Route exact path="/work-backlog" element={<RouteWrapper Component={WorkBacklog} Layout={Layout} />} />
            <Route exact path="/my-profile" element={<RouteWrapper Component={UserProfile} Layout={Layout} />} />
            <Route exact path='/attendance' element={<RouteWrapper Component={Attendance} Layout={Layout} />} />
            <Route exact path='/leave-request' element={<RouteWrapper Component={LeaveRequest} Layout={Layout} />} />
            <Route exact path='/projects' element={<RouteWrapper Component={Projects} Layout={Layout} />} />
            <Route exact path='/service-request' element={<RouteWrapper Component={ServiceRequest} Layout={Layout} />} />
            <Route exact path='/time-logs' element={<RouteWrapper Component={TimeLogs} Layout={Layout} />} />
            <Route exact path='/time-sheets' element={<RouteWrapper Component={Timesheets} Layout={Layout} />} />
            <Route exact path='/work-items' element={<RouteWrapper Component={WorkItems} Layout={Layout} />} />
            <Route exact path='/leave-request-form' element={<RouteWrapper Component={LeaveRequestForm} Layout={Layout} />} />
            <Route exact path='/service-request-form' element={<RouteWrapper Component={ServiceRequestForm} Layout={Layout} />} />
            <Route exact path='/trainee-traning/my' element={<RouteWrapper Component={MyTraningAsTrainee} Layout={Layout} />} />
            <Route exact path='/trainee-feedback/my' element={<RouteWrapper Component={TraningFeedback} Layout={Layout} />} />
        </Routes>
    );
}

export default MainRoutes