import Login from '../containers/Login/Login';
import DashBoard  from '../containers/DashBoard/DashBoard';
import ProjectBackLog from '../containers/ProjectBackLog/ProjectBackLog.js';
import ManageProjectbackLog from '../containers/ManageProjectBacklog/ManageProjectbackLog';
import WorkGroup from '../containers/WorkGroups/WorkGroups';
import PageNotFound from '../containers/PageNotFound/PageNotFound.js';
import UserProfile from '../containers/UserProfile/UserProfile'
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import RouteWrapper from "./RouteWrapper";
import WorkBacklog from '../containers/WorkBacklog/WorkBacklog';

const MainRoutes = () => {
    return (
        <>
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
            </Routes>
        </>
    );
}

export default MainRoutes