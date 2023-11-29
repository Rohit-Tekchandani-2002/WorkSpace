import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faDashboard, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

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
                            <FontAwesomeIcon icon={faDashboard} />
                        </span> Dashboard
                    </li>
                    {
                        (localStorage.getItem('projectId') !== null) &&
                        <li className={dropdownActivePage('project') ? 'active dropdown' : 'dropdown'}>
                            <div onClick={() => handalActiveMenuClick('project')}>
                                <span>
                                    <FontAwesomeIcon icon={faProjectDiagram} />
                                </span> Project
                                {
                                    <span><FontAwesomeIcon className='icon' icon={dropdownActivePage('project') ? faAngleUp : faAngleDown} /></span>
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
                </ul>
            </div>
        </>
    );
};

export default SideBar