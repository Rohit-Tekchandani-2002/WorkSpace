import { Nav } from 'react-bootstrap';
import './UserProfile.css';
import { getUserInfo } from '../../services/UserProfile/UserProfile.service';
import { useEffect, useState, useContext } from 'react';
import { formatDate } from "../../config/utility";
import _ from 'lodash';
import RootContext from '../../context/RootContext/RootContext';

const UserProfile = () => {
    const rootContext = useContext(RootContext);
    let { handleError } = rootContext;
    const [userInfo, setUserInfo] = useState({
        employeeDeatilId: 0,
        profileImage: "",
        userName: "",
        firstName: "",
        lastName: "",
        experience: "0",
        email: "",
        joiningDate: "",
        seniorsFirstName: "",
        seniorsLastName: "",
        seniorsEmail: "",
        cardNo: 0,
        grade: 0,
        departmentName: "",
        designation: "",
        sittingPlace: "",
        createdAt: "",
        notificationTypeResolutionChanged: false,
        notificationOnAssignedWorkItemChangeByTeamMember: false,
        notificationCommnetOnWork: false,
        notificationAssignedWork: false,
        notificationDailyAlertEmail: false,
        notificationOnCreatedWorkItemChangeByTeamMember: false
    });
    let employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
            getUserInfoData();
            // getUserInfo(employeeId).then((data) => {
            //     setUserInfo(data);
            // })
    }, []);

    const getUserInfoData = async () => {
        var tempData = await getUserInfo(employeeId).catch(handleError);
        if (tempData) {
            setUserInfo(tempData);
        }
    }

    const handleSelect = (key) => {
        console.log("key", key);
    }
    
    return (
        <div className='p-3'>
            <h4 className='blue_border'>Employee Details</h4>
            <Nav variant="tabs" defaultActiveKey="employee-details" onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="employee-details">Employee Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="personal-details">Personal Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="system-configuration">System Configuration</Nav.Link>
                </Nav.Item>
            </Nav>
            {userInfo &&
                <div className='row w-100 mt-3'>
                    <div className='col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center'>
                        <img className='user-Profile-img' src={_.get(userInfo, 'profileImage')} alt='profile img' />
                    </div>
                    <div className='col'>
                        <div>
                            <div className="sub-head">Employee Information</div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Employee ID</div>
                                        <div className="col-md-8 col-xs-7">
                                            T{_.get(userInfo, 'employeeDeatilId')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Username</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'userName')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Full Name</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'firstName')} {_.get(userInfo, 'lastName')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Experience</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'experience')} years
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Email</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'email')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Live Email</div>
                                        <div className="col-md-8 col-xs-7">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Report To</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'seniorsFirstName')} {_.get(userInfo, 'seniorsLastName')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Senior's Email</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'seniorsEmail')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Card No</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'cardNo')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Joining Date</div>
                                        <div className="col-md-8 col-xs-7">
                                            {formatDate(_.get(userInfo, 'joiningDate'))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Department</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'departmentName')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Designation</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'designation')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Sitting Place</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'sittingPlace')}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Created On</div>
                                        <div className="col-md-8 col-xs-7">
                                            {formatDate(_.get(userInfo, 'createdAt'))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='row'>
                                        <div className="col-md-4 col-xs-5 alignleft control-label strong">Grade</div>
                                        <div className="col-md-8 col-xs-7">
                                            {_.get(userInfo, 'grade')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default UserProfile 