import { Component } from 'react';
import { employeeInfoDefaultContext } from '../../../../constants/userInfoDefaultContext';
import RootContext from '../../../../context/RootContext/RootContext';
import { getUserInfo, updatePasswords, updateNotificationSetting } from '../../../../services/UserProfile/UserProfile.service';
import { formatDate } from '../../../../config/utility';
import './EmployeeDetails.css';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';

class EmployeeDetails extends Component {
    static contextType = RootContext;
    state = {
        refreshModule: false,
        passwords: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    componentDidMount = () => {
        let { setGlobal, employeeInfoContext } = this.context;
        if (!employeeInfoContext) {
            employeeInfoContext = employeeInfoDefaultContext;
            setGlobal('employeeInfoContext', employeeInfoContext);
        }
        this.getUserInfoData();
    }

    getUserInfoData = async () => {
        const { setGlobal, handleError } = this.context;
        let employeeInfoContext = _.get(this.context, 'userInfoContext', employeeInfoDefaultContext);
        const employeeId = localStorage.getItem('employeeId');
        const tempData = await getUserInfo(employeeId).catch(handleError);
        if (tempData) {
            _.set(employeeInfoContext, 'userInfoContext', tempData);
            setGlobal('employeeInfoContext', employeeInfoContext);
            this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
        }
    }

    handelChange = (event, feild) => {
        let value = _.get(event, 'target.value');
        let passwords = _.get(this.state, 'passwords');
        switch (feild) {
            case 'oldPassword':
                _.set(passwords, 'oldPassword', value);
                break;
            case 'newPassword':
                _.set(passwords, 'newPassword', value);
                break;
            case 'confirmPassword':
                _.set(passwords, 'confirmPassword', value);
                break;
            default:
                break;
        }
        this.setState({ passwords: passwords });
    }

    handleNotificationChange = (event, feild) => {
        const { setGlobal } = this.context;
        let checked = _.get(event, 'target.checked');
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext', employeeInfoDefaultContext);
        switch (feild) {
            case 'notificationTypeResolutionChanged':
                _.set(employeeInfoContext, 'userInfoContext.notificationTypeResolutionChanged', checked);
                break;
            case 'notificationOnAssignedWorkItemChangeByTeamMember':
                _.set(employeeInfoContext, 'userInfoContext.notificationOnAssignedWorkItemChangeByTeamMember', checked);
                break;
            case 'notificationCommnetOnWork':
                _.set(employeeInfoContext, 'userInfoContext.notificationCommnetOnWork', checked);
                break;
            case 'notificationAssignedWork':
                _.set(employeeInfoContext, 'userInfoContext.notificationAssignedWork', checked);
                break;
            case 'notificationDailyAlertEmail':
                _.set(employeeInfoContext, 'userInfoContext.notificationDailyAlertEmail', checked);
                break;
            case 'notificationOnCreatedWorkItemChangeByTeamMember':
                _.set(employeeInfoContext, 'userInfoContext.notificationOnCreatedWorkItemChangeByTeamMember', checked);
                break;
            default:
                break;
        }
        setGlobal('employeeInfoContext', employeeInfoContext);
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    clearPasswordForm = () => {
        let passwords = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
        this.setState({ passwords: passwords })
    }

    savePassword = async () => {
        const passwords = _.get(this.state, 'passwords');
        const { handleError } = this.context;
        const { alertSuccess } = this.props;
        const employeeId = localStorage.getItem('employeeId');
        const { oldPassword, newPassword, confirmPassword } = passwords;
        let request = {
            employeeId: employeeId,
            newpassword: _.trim(newPassword),
            oldpassword: _.trim(oldPassword)
        }
        if (!_.includes({ ...passwords }, '') && (newPassword === confirmPassword) && (newPassword !== oldPassword)) {
            let message = await updatePasswords(request).catch(handleError);
            if (message) {
                alertSuccess(message);
            }
            this.clearPasswordForm();
        } else {
            if (_.includes({ ...passwords }, '')) {
                handleError({ message: 'password can not be empty' });
            } else {
                if (newPassword !== confirmPassword) {
                    handleError({ message: 'New password and conform passwords are different' });
                } else {
                    if (newPassword === oldPassword) {
                        handleError({ message: 'New password and Old password can not be same' });
                    }
                }
            }
        }
    }

    saveNotificationSetting = async () => {
        const { handleError } = this.context;
        const { alertSuccess } = this.props;
        const employeeId = localStorage.getItem('employeeId');
        const {
            notificationTypeResolutionChanged,
            notificationOnAssignedWorkItemChangeByTeamMember,
            notificationCommnetOnWork,
            notificationAssignedWork,
            notificationDailyAlertEmail,
            notificationOnCreatedWorkItemChangeByTeamMember
        } = _.get(this.context, 'employeeInfoContext.userInfoContext', employeeInfoDefaultContext);
        const request = {
            employeeId: employeeId,
            notificationTypeResolutionChanged: notificationTypeResolutionChanged,
            notificationOnAssignedWorkItemChangeByTeamMember: notificationOnAssignedWorkItemChangeByTeamMember,
            notificationCommnetOnWork: notificationCommnetOnWork,
            notificationAssignedWork: notificationAssignedWork,
            notificationDailyAlertEmail: notificationDailyAlertEmail,
            notificationOnCreatedWorkItemChangeByTeamMember: notificationOnCreatedWorkItemChangeByTeamMember
        }
        const message = await updateNotificationSetting(request).catch(handleError);
        if (message) {
            alertSuccess(message);
        }else{
            this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
        }
    }

    render() {
        const userInfoContext = _.get(this.context, 'employeeInfoContext.userInfoContext', employeeInfoDefaultContext);
        const { oldPassword, newPassword, confirmPassword } = _.get(this.state, 'passwords');
        const {
            notificationTypeResolutionChanged,
            notificationOnAssignedWorkItemChangeByTeamMember,
            notificationCommnetOnWork,
            notificationAssignedWork,
            notificationDailyAlertEmail,
            notificationOnCreatedWorkItemChangeByTeamMember
        } = userInfoContext;
        console.log('employeeInfoContext', userInfoContext);
        return (
            <>
                {
                    userInfoContext &&
                    <div className='row w-100 mt-3'>
                        <div className='col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center'>
                            <img className='user-Profile-img' src={_.get(userInfoContext, 'profileImage')} alt='profile img' />
                        </div>
                        <div className='col'>
                            <div>
                                <div className="sub-head">Employee Information</div>
                                <div className="row px-3">
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Employee ID</div>
                                            <div className="col-md-8 col-xs-7">
                                                T{_.get(userInfoContext, 'employeeDeatilId')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Username</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'userName')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Full Name</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'firstName')} {_.get(userInfoContext, 'lastName')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Experience</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'experience')} years
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Email</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'email')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Grade</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'grade')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Report To</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'seniorsFirstName')} {_.get(userInfoContext, 'seniorsLastName')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Senior's Email</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'seniorsEmail')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Card No</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'cardNo')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Joining Date</div>
                                            <div className="col-md-8 col-xs-7">
                                                {formatDate(_.get(userInfoContext, 'joiningDate'))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Department</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'departmentName')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Designation</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'designation')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Sitting Place</div>
                                            <div className="col-md-8 col-xs-7">
                                                {_.get(userInfoContext, 'sittingPlace')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='row'>
                                            <div className="col-md-4 col-xs-5 alignleft control-label strong">Created On</div>
                                            <div className="col-md-8 col-xs-7">
                                                {formatDate(_.get(userInfoContext, 'createdAt'))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div className="sub-head">Change Password</div>
                                <div className="px-3">
                                    <form className='form-group mb-1'>
                                        <div className='row py-1'>
                                            <div className='col-sm-4 control-label p-2'>Current Password</div>
                                            <div className='col-sm-4'>
                                                <input className='form-control w-100' type='password' value={oldPassword} onChange={(event) => this.handelChange(event, 'oldPassword')} />
                                            </div>
                                        </div>
                                        <div className='row py-1'>
                                            <div className='col-sm-4 control-label p-2'>New Password</div>
                                            <div className='col-sm-4'>
                                                <input className='form-control w-100' type='password' value={newPassword} onChange={(event) => this.handelChange(event, 'newPassword')} />
                                            </div>
                                        </div>
                                        <div className='row py-1'>
                                            <div className='col-sm-4 control-label p-2'>Confirm Password</div>
                                            <div className='col-sm-4'>
                                                <input className='form-control w-100' type='password' value={confirmPassword} onChange={(event) => this.handelChange(event, 'confirmPassword')} />
                                            </div>
                                        </div>
                                        <div className='row py-1'>
                                            <div className='col-sm-4 control-label'></div>
                                            <div className='col-sm-4'>
                                                <button type='button' className='btn btn-primary rounded-0 m-1' onClick={this.savePassword}><FontAwesomeIcon icon={faSave} /> Update Password</button>
                                                <button type='button' className='btn btn-default rounded-0 m-1' onClick={this.clearPasswordForm}><FontAwesomeIcon icon={faClose} /> Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <div className="sub-head">Notification Email Settings</div>
                                <form className='px-3'>
                                    <div className='row'>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationTypeResolutionChanged} onChange={(e) => { this.handleNotificationChange(e, 'notificationTypeResolutionChanged') }} />
                                            <span>When team member changed resolution of my created Defect</span>
                                        </div>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationOnAssignedWorkItemChangeByTeamMember} onChange={(e) => { this.handleNotificationChange(e, 'notificationOnAssignedWorkItemChangeByTeamMember') }} />
                                            <span>When team member changed my assigned Work Item</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationCommnetOnWork} onChange={(e) => { this.handleNotificationChange(e, 'notificationCommnetOnWork') }} />
                                            <span>When team member add comment on my assigned Work Item</span>
                                        </div>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationAssignedWork} onChange={(e) => { this.handleNotificationChange(e, 'notificationAssignedWork') }} />
                                            <span>When team member assigned any Work Item to me</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationDailyAlertEmail} onChange={(e) => { this.handleNotificationChange(e, 'notificationDailyAlertEmail') }} />
                                            <span>Daily Time Alert Email ?</span>
                                        </div>
                                        <div className='col px-3 py-2'>
                                            <input type='checkbox' className='me-2' checked={notificationOnCreatedWorkItemChangeByTeamMember} onChange={(e) => { this.handleNotificationChange(e, 'notificationOnCreatedWorkItemChangeByTeamMember') }} />
                                            <span>When team member changed my created Work Item</span>
                                        </div>
                                    </div>
                                    <button type='button' className='btn btn-primary rounded-0' onClick={this.saveNotificationSetting}><FontAwesomeIcon icon={faSave} /> Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default EmployeeDetails;