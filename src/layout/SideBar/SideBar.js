import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBriefcase, faChalkboardTeacher, faDesktop, faGears, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = props => {
    const { isSideBarOpen } = props;
    let sideBarCloseClass = isSideBarOpen ? '' : 'sidebar-close';
    const [activeMenuPage, setActiveMenuPage] = useState('');
    const navigate = useNavigate();

    const dropdownActivePage = (page) => {
        if (activeMenuPage === page) {
            return true;
        }
        return false;
    }

    const handalActiveMenuClick = (menu, navigateUrl) => {
        (activeMenuPage !== menu) ? setActiveMenuPage(menu) : setActiveMenuPage('');
        if (navigateUrl) {
            navigate(navigateUrl);
        }
    }

    const handelSubMenuClick = (navigateUrl) => {
        navigate(navigateUrl);
    }

    return (
        <>
            <div className={sideBarCloseClass + ' sideBar border'}>
                <ul className='sidebar-dropdown'>
                    <li className={dropdownActivePage('dashboard') ? 'active' : ''} onClick={() => handalActiveMenuClick('dashboard', '/dashboard')}>
                        <span>
                            <FontAwesomeIcon icon={faDesktop} />
                        </span> Dashboard
                    </li>
                    <li className={dropdownActivePage('workSpace') ? 'active dropdown' : 'dropdown'}>
                        <div onClick={() => handalActiveMenuClick('workSpace')}>
                            <span>
                                <FontAwesomeIcon icon={faBriefcase} />
                            </span> My Workspace
                            {
                                <span><FontAwesomeIcon className='icon' icon={dropdownActivePage('workSpace') ? faAngleDown : faAngleRight} /></span>
                            }
                        </div>
                        {
                            dropdownActivePage('workSpace') &&
                            <ul>
                                <li onClick={() => handelSubMenuClick('/Attendance')}>Attendance</li>
                                <li onClick={() => handelSubMenuClick('/Projects')}>Projects</li>
                                <li onClick={() => handelSubMenuClick('/WorkItems')}>Work Items</li>
                                <li onClick={() => handelSubMenuClick('/Timesheets')}>Timesheets</li>
                                <li onClick={() => handelSubMenuClick('/TimeLogs')}>Time Logs</li>
                                <li onClick={() => handelSubMenuClick('/LeaveRequest')}>Leave Request</li>
                                <li onClick={() => handelSubMenuClick('/ServiceRequest')}>Service Request</li>
                                <li>Library</li>
                                <li>Documents</li>
                                <li>Knowledge Repository</li>
                            </ul>
                        }
                    </li>
                    {
                        (localStorage.getItem('projectId') !== null) &&
                        <li className={dropdownActivePage('project') ? 'active dropdown' : 'dropdown'}>
                            <div onClick={() => handalActiveMenuClick('project')}>
                                <span>
                                    <FontAwesomeIcon icon={faGears} />
                                </span> Project
                                {
                                    <span><FontAwesomeIcon className='icon' icon={dropdownActivePage('project') ? faAngleDown : faAngleRight} /></span>
                                }
                            </div>
                            {
                                dropdownActivePage('project') &&
                                <ul>
                                    <li onClick={() => handelSubMenuClick('/project-backlog')}>Project Backlog</li>
                                    <li onClick={() => handelSubMenuClick('/work-group')}>Work Group</li>
                                    <li onClick={() => handelSubMenuClick('/work-backlog')}>Work Backlog</li>
                                </ul>
                            }
                        </li>
                    }
                    <li className={dropdownActivePage('traning') ? 'active dropdown' : 'dropdown'}>
                        <div onClick={() => handalActiveMenuClick('traning')}>
                            <span>
                                <FontAwesomeIcon icon={faChalkboardTeacher} />
                            </span> Traning
                            {
                                <span><FontAwesomeIcon className='icon' icon={dropdownActivePage('traning') ? faAngleDown : faAngleRight} /></span>
                            }
                        </div>
                        {
                            dropdownActivePage('traning') &&
                            <ul>
                                <li>My Traning As Fqaculty</li>
                                <li>My Traning As Trainee</li>
                                <li>Upcoming Traning</li>
                                <li>Completed Traning</li>
                                <li>Download Material</li>
                                <li>eLearning</li>
                            </ul>
                        }
                    </li>
                    <li className={dropdownActivePage('deviceManagement') ? 'active' : ''} onClick={() => handalActiveMenuClick('deviceManagement', '/dashboard')}>
                        <span>
                            <FontAwesomeIcon className='px-1' icon={faMobileAlt} />
                        </span> Device Management
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideBar