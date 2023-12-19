import './Header.css';
import companyLogo from '../../assets/img/workspace-white.png';
import userDefault from '../../assets/img/default-user-image.png';
import { faBars, faClose, faCheck, faGear, faSignOut, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getUserProjects } from '../../services/Header/Header.service'
import { useEffect, useState, useContext } from 'react';
import { authUserContext } from "../../constants/authUserConstants";
import AuthContext from "../../context/AuthContext/AuthContext";
import RootContext from "../../context/RootContext/RootContext";
import { modalDefaultContext, addRemoveWidgetContext } from "../../constants/modalConstants";
import { userProjectsContext } from '../../constants/userProjectsContext';

const Header = props => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const rootContext = useContext(RootContext);
    let { addRemoveWidget, setGlobal, handleError } = rootContext;
    const [showWidget, setShowWidget] = useState(false);
    const { isSideBarOpen, openSideBar } = props;
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        profileImage: ""
    });
    const [userProjects, setUserProjects] = useState({
        projectId: localStorage.getItem('projectId'),
        projectName: localStorage.getItem('projectName'),
        projects: JSON.parse(localStorage.getItem('projects')) ?? []
    });

    const toggleSideBar = () => {
        let flag = !isSideBarOpen;
        openSideBar(flag);
    }

    const goToMyProfile = () => {
        navigate('/my-profile');
    };

    const handelLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handalLogoClick = () => {
        navigate('/dashboard');
    }

    let employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
        getUserInfoData();
        // getUserInfo(employeeId).then((data) => {
        //     setUserInfo(data);
        // })
        getUserProjectsData();
        // getUserProjects(employeeId).then((data) => {
        //     setUserProjects({
        //         ...userProjects,
        //         projects: data
        //     });
        //     localStorage.getItem('projects', JSON.stringify(data));
        // })
    }, [employeeId]);

    const getUserInfoData = async() => {
        var tempData = await getUserInfo(employeeId).catch(handleError);
        if (tempData) {
            setUserInfo(tempData);
        }
    }

    const getUserProjectsData = async() => {
        var tempData = await getUserProjects(employeeId).catch(handleError);
        setUserProjects({
            ...userProjects,
            projects: tempData
        });
        setGlobal('projectsList', tempData);
        localStorage.getItem('projects', JSON.stringify(tempData));
    }

    useEffect(() => {
        let { setGlobal, userData } = authContext;
        if (!userData) {
            userData = authUserContext;
            setGlobal('userData', userData);
        }
        if (userInfo) {
            userData = {
                employeeId: employeeId,
                userName: localStorage.getItem('userName') ?? '',
                firstName: userInfo.firstName ?? '',
                lastName: userInfo.lastName ?? ''
            };
            setGlobal('userData', userData);
        }
    }, [userInfo]);

    const handleWidgetClose = () => {
        setShowWidget(false);
    };

    let addRemoveWidgetOptions = JSON.parse(localStorage.getItem('addRemoveWidget')) ?? addRemoveWidgetContext;

    useEffect(() => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
    }, [addRemoveWidget]);

    let { myRecentProjectsWidget, activeWorkGroupWidget, teamWorkItemWidget, pendingTraningFeedbackWidget } = addRemoveWidget || addRemoveWidgetOptions;

    const toggleMyRecentProjectBtn = () => {
        handalModalTogglebtn('myRecentProjectsWidget');
    }
    const toggleActiveWorkGroupBtn = () => {
        handalModalTogglebtn('activeWorkGroupWidget');
    }
    const toggleTeamWorkItemBtn = () => {
        handalModalTogglebtn('teamWorkItemWidget');
    }
    const togglePendingTraningFeedbackBtn = () => {
        handalModalTogglebtn('pendingTraningFeedbackWidget');
    }

    const handalModalTogglebtn = (feildName) => {
        if (!addRemoveWidget) {
            addRemoveWidget = addRemoveWidgetOptions;
            setGlobal('addRemoveWidget', addRemoveWidget);
        }
        if (addRemoveWidget) {
            switch (feildName) {
                case 'myRecentProjectsWidget':
                    _.set(addRemoveWidget, 'myRecentProjectsWidget', !myRecentProjectsWidget);
                    break;
                case 'activeWorkGroupWidget':
                    _.set(addRemoveWidget, 'activeWorkGroupWidget', !activeWorkGroupWidget);
                    break;
                case 'teamWorkItemWidget':
                    _.set(addRemoveWidget, 'teamWorkItemWidget', !teamWorkItemWidget);
                    break;
                case 'pendingTraningFeedbackWidget':
                    _.set(addRemoveWidget, 'pendingTraningFeedbackWidget', !pendingTraningFeedbackWidget);
                    break;
                default:
                    break;
            }
            setGlobal('addRemoveWidget', addRemoveWidget);
            setIsModuleRefersh(!isModuleRefersh);
            localStorage.setItem('addRemoveWidget', JSON.stringify(addRemoveWidget));
        }
    }
    const showWidgetBody = <div>
        <ul>
            <li className='px-1 py-2 border-bottom d-flex justify-content-between'>
                <span>My Recent Project</span>
                <button className={(myRecentProjectsWidget && 'btn-primary ') + (!myRecentProjectsWidget && ' btn-danger ') + ' btn px-3 py-0'} onClick={() => toggleMyRecentProjectBtn()}>
                    {myRecentProjectsWidget && <FontAwesomeIcon icon={faCheck} />}
                    {!myRecentProjectsWidget && <FontAwesomeIcon icon={faClose} />}
                </button>
            </li>
            <li className='px-1 py-2 border-bottom d-flex justify-content-between'>
                <span>Active Work Group</span>
                <button className={(activeWorkGroupWidget && 'btn-primary ') + (!activeWorkGroupWidget && ' btn-danger ') + ' btn px-3 py-0'} onClick={() => toggleActiveWorkGroupBtn()}>
                    {activeWorkGroupWidget && <FontAwesomeIcon icon={faCheck} />}
                    {!activeWorkGroupWidget && <FontAwesomeIcon icon={faClose} />}
                </button>
            </li>
            <li className='px-1 py-2 border-bottom d-flex justify-content-between'>
                <span>Team - Work Items</span>
                <button className={(teamWorkItemWidget && 'btn-primary ') + (!teamWorkItemWidget && ' btn-danger ') + ' btn px-3 py-0'} onClick={() => toggleTeamWorkItemBtn()}>
                    {teamWorkItemWidget && <FontAwesomeIcon icon={faCheck} />}
                    {!teamWorkItemWidget && <FontAwesomeIcon icon={faClose} />}
                </button>
            </li>
            <li className='px-1 py-2 border-bottom d-flex justify-content-between'>
                <span>Pending Training Feedback</span>
                <button className={(pendingTraningFeedbackWidget && 'btn-primary ') + (!pendingTraningFeedbackWidget && ' btn-danger ') + ' btn px-3 py-0'} onClick={() => togglePendingTraningFeedbackBtn()}>
                    {pendingTraningFeedbackWidget && <FontAwesomeIcon icon={faCheck} />}
                    {!pendingTraningFeedbackWidget && <FontAwesomeIcon icon={faClose} />}
                </button>
            </li>
        </ul>
    </div>;

    const handalChangeProject = (data) => {
        setUserProjects({
            ...userProjects,
            projectId: _.get(data, 'projectId', null),
            projectName: _.get(data, 'projectName', null)
        });
        console.log('userProjects', userProjects);
        localStorage.setItem('projectId', _.get(data, 'projectId'));
        localStorage.setItem('projectName', _.get(data, 'projectName'));
        navigate('/work-group');
    }

    useEffect(() => {
        let { setGlobal, modalData } = rootContext;
        if (!modalData) {
            modalData = modalDefaultContext;
            setGlobal('modalData', modalData);
        }
        modalData = {
            modalType: 'InformationModal',
            title: 'Add/Remove Widget',
            body: showWidgetBody,
            show: showWidget,
            handleClose: handleWidgetClose,
            modalProps: {
                addRemoveWidget,
                toggleMyRecentProjectBtn
            }
        };
        setGlobal('modalData', modalData);
    }, [showWidget, addRemoveWidget, isModuleRefersh])

    return (
        <div className='w-100 heading'>
            <div className='d-flex align-items-center'>
                <FontAwesomeIcon className='hamburgerIcon' icon={faBars} onClick={() => toggleSideBar()} />
                <img className='ms-4 logo_images' src={companyLogo} onClick={handalLogoClick} />
            </div>
            <div className='h-100'>
                <div className='d-flex align-items-center h-100'>
                    {
                        (_.get(userProjects, 'projects.length', 0) !== 0) &&
                        <div className='border-left-btn p-1 small-project-drop-down'>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" value={_.get(userProjects, 'projectId', null)}>
                                    <span>{_.get(userProjects, 'projectName', null) ?? 'Select Project'}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {_.map(
                                        _.get(userProjects, 'projects', []),
                                        ((data, index) =>
                                        (
                                            <Dropdown.Item key={_.get(data, 'projectId', index)} onClick={() => handalChangeProject(data)}>
                                                {_.get(data, 'projectName', 'Project')}
                                            </Dropdown.Item>
                                        ))
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    }
                    <div className='border-left-btn'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {
                                    userInfo &&
                                    <>
                                        {
                                            (_.trim(_.get(userInfo, 'profileImage', '')) !== '') ?
                                                <img className='userimg' src={_.get(userInfo, 'profileImage', userDefault)} alt={'user img'} /> :
                                                <img className='userimg' src={userDefault} alt={'user img'} />
                                        }
                                        <span> {_.concat(_.get(userInfo, 'firstName', ''), ' ', _.get(userInfo, 'lastName', ''))}</span>
                                    </>
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={goToMyProfile}><FontAwesomeIcon className='progile-btn-dropdown-icon' icon={faUserAlt} /> My Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => setShowWidget(true)}><FontAwesomeIcon className='progile-btn-dropdown-icon' icon={faGear} /> Widgets Setting</Dropdown.Item>
                                <Dropdown.Item onClick={handelLogout}><FontAwesomeIcon className='progile-btn-dropdown-icon' icon={faSignOut} /> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header