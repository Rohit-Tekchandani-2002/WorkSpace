import { Component } from 'react';
import './LeaveRequestForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import AlertComponent from '../../../../../components/AlertComponent/AlertComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faClose, faGears, faSave } from '@fortawesome/free-solid-svg-icons';
import { addLeaveRequest, getAddedLeaveRequest, getleaveRequestEmployeeInfo, updateAddedLeaveRequest } from '../../../../../services/Workspace/workspace.service';
import RootContext from '../../../../../context/RootContext/RootContext';
import { adjustDateTime, formatDate } from '../../../../../config/utility';
import moment from 'moment';
import ModualLoader from '../../../../../components/ModualLoader/ModualLoader';

class LeaveRequestForm extends Component {
    static contextType = RootContext;
    state = { alertMessage: '', reload: false, formData: {} }

    componentDidMount = () => {
        this.setState({ reload: true });
        const { type, id } = _.get(this.props, 'location.state');
        if (id && (type === 'update')) {
            this.getleaveRequestInfo(id);
        }
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                await this.getemployeeInfo();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
        if (_.get(this.state, 'formData.leaveStartDate') !== _.get(prevState, 'formData.leaveStartDate')) {
            this.getemployeeInfo();
        }
        if (_.get(this.state, 'formData.leaveEndDate') !== _.get(prevState, 'formData.leaveEndDate')) {
            this.getemployeeInfo();
        }
    }

    getleaveRequestInfo = async (id) => {
        const { handleError } = this.context;
        const leaveRequestInfo = await getAddedLeaveRequest(id).catch(handleError);
        if (leaveRequestInfo) {
            const formData = _.get(this.state, 'formData');
            this.setState({ formData: { ...formData, ...leaveRequestInfo } });
            console.log('leaveRequestInfo', leaveRequestInfo);
        }
    }

    getemployeeInfo = async () => {
        const { handleError } = this.context;
        const request = {
            employeeId: localStorage.getItem('employeeId'),
            startDate: _.get(this.state, 'formData.leaveStartDate', null),
            endDate: _.get(this.state, 'formData.leaveEndDate', null)
        }
        const employeeInfo = await getleaveRequestEmployeeInfo(request).catch(handleError);
        if (employeeInfo) {
            const formData = _.get(this.state, 'formData');
            this.setState({ formData: { ...formData, ...employeeInfo } });
            console.log('employeeInfo', _.get(this.state, 'formData'));
        }
    }

    cancleLeaveRequest = () => {
        this.props.history('/leave-request');
    }

    handleChange = (event, feild) => {
        let value = _.get(event, 'target.value');
        let tempState = _.cloneDeep(_.get(this.state, 'formData'));
        switch (feild) {
            case 'reasonForLeave':
                if (_.get(value, 'length', 0) < 250)
                    _.set(tempState, 'reasonForLeave', value);
                break;
            case 'leaveStartDate':
                _.set(tempState, 'leaveStartDate', value);
                break;
            case 'startDateAttendanceOption':
                _.set(tempState, 'startDateAttendanceOption', value);
                break;
            case 'leaveEndDate':
                _.set(tempState, 'leaveEndDate', value);
                break;
            case 'endDateAttendanceOption':
                _.set(tempState, 'endDateAttendanceOption', value);
                break;
            case 'isAdhocLeave':
                value = _.get(event, 'target.checked', false);
                if (value) {
                    _.set(tempState, 'adhocLeaveStatus', '');
                }
                _.set(tempState, 'isAdhocLeave', value);
                break;
            case 'adhocLeaveStatus':
                _.set(tempState, 'adhocLeaveStatus', value);
                break;
            case 'phoneNumber':
                _.set(tempState, 'phoneNumber', value);
                break;
            case 'availibiltyOnPhone':
                _.set(tempState, 'availibiltyOnPhone', value);
                break;
            case 'alternatePhoneNumber':
                _.set(tempState, 'alternatePhoneNumber', value);
                break;
            case 'availibiltyInCity':
                _.set(tempState, 'availibiltyInCity', value);
                break;
            default:
                break;
        }
        this.setState({ formData: tempState });
    }

    isFormDataValid = () => {
        let isFormDataValid = true;
        let errorMessage = null;
        const reasonForLeave = _.get(this.state, 'formData.reasonForLeave');
        const leaveStartDate = _.get(this.state, 'formData.leaveStartDate', '');
        const startDateAttendanceOption = _.get(this.state, 'formData.startDateAttendanceOption', 1);
        const leaveEndDate = _.get(this.state, 'formData.leaveEndDate', '');
        const endDateAttendanceOption = _.get(this.state, 'formData.endDateAttendanceOption', 1);
        const phoneNumber = _.get(this.state, 'formData.phoneNumber', '');
        const alternatePhoneNumber = _.get(this.state, 'formData.alternatePhoneNumber', '');
        const validatePhoneNumber = /^\d{10}$/;
        if (!reasonForLeave) {
            errorMessage = 'Reson for leave feild is required';
        }
        else {
            if (!validatePhoneNumber.test(phoneNumber)) {
                errorMessage = 'Phone number is not valid';
            }
            else {
                if (!validatePhoneNumber.test(alternatePhoneNumber)) {
                    errorMessage = 'Alternate phone number is not valid';
                }
                else {
                    const startdateValue = _.toNumber(moment(leaveStartDate).format('YYYYMMDD'));
                    const enddateValue = _.toNumber(moment(leaveEndDate).format('YYYYMMDD'));
                    const currentDate = _.toNumber(moment().format('YYYYMMDD'));
                    if ((startdateValue === enddateValue) && (startDateAttendanceOption !== endDateAttendanceOption)) {
                        errorMessage = 'For same start and end leave request date both option must be same \n Example: Full Day, Full Day';
                    }
                    else {
                        if (startdateValue > enddateValue) {
                            errorMessage = 'Start date cannot be greater then End date';
                        }
                        else {
                            if (enddateValue - startdateValue > 10) {
                                errorMessage = 'Leave cannot be greater then 10 days';
                            }
                            else {
                                if ((currentDate - startdateValue) > 15) {
                                    errorMessage = 'adhoc leave cannot be applied after 15 days';
                                }
                                else {
                                    if ((startdateValue - currentDate) > 15) {
                                        errorMessage = 'Leave cannot be applied 15 days ago';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (errorMessage) {
            isFormDataValid = false;
            const { handleError } = this.context;
            handleError({ message: errorMessage });
        }
        return isFormDataValid;
    }

    addLeaveRequest = async () => {
        const isFormDataValid = this.isFormDataValid();
        if (isFormDataValid) {
            const { handleError } = this.context;
            const formData = _.get(this.state, 'formData');
            const {
                reportingPersonId,
                reasonForLeave,
                leaveStartDate,
                startDateAttendanceOption = 1,
                leaveEndDate,
                endDateAttendanceOption = 1,
                isAdhocLeave = false,
                adhocLeaveStatus = null,
                phoneNumber,
                availibiltyOnPhone = true,
                alternatePhoneNumber,
                availibiltyInCity = true
            } = formData;
            const request = {
                employeeId: localStorage.getItem('employeeId'),
                reportingPersonId: reportingPersonId,
                reasonForLeave: reasonForLeave,
                leaveStartDate: leaveStartDate,
                leaveEndDate: leaveEndDate,
                startDateAttendanceOption: startDateAttendanceOption,
                endDateAttendanceOption: endDateAttendanceOption,
                isAdhocLeave: isAdhocLeave,
                adhocLeaveStatus: (adhocLeaveStatus !== '') ? adhocLeaveStatus : null,
                phoneNumber: phoneNumber,
                alternatePhoneNumber: alternatePhoneNumber,
                availibiltyOnPhone: availibiltyOnPhone,
                availibiltyInCity: availibiltyInCity
            }
            const message = await addLeaveRequest(request).catch(handleError);
            if (message) {
                this.setState({ alertMessage: message });
            }
        }
    }

    updateLeaveRequest = async () => {
        const isFormDataValid = this.isFormDataValid();
        if (isFormDataValid) {
            const { handleError } = this.context;
            const { id } = _.get(this.props, 'location.state');
            const formData = _.get(this.state, 'formData');
            const {
                reportingPersonId,
                reasonForLeave,
                leaveStartDate,
                startDateAttendanceOption = 1,
                leaveEndDate,
                endDateAttendanceOption = 1,
                isAdhocLeave = false,
                adhocLeaveStatus = null,
                phoneNumber,
                availibiltyOnPhone = true,
                alternatePhoneNumber,
                availibiltyInCity = true
            } = formData;
            const request = {
                leaveRequestId: id,
                reasonForLeave: reasonForLeave,
                leaveStartDate: leaveStartDate,
                leaveEndDate: leaveEndDate,
                startDateAttendanceOption: startDateAttendanceOption,
                endDateAttendanceOption: endDateAttendanceOption,
                isAdhocLeave: isAdhocLeave,
                adhocLeaveStatus: adhocLeaveStatus,
                phoneNumber: phoneNumber,
                alternatePhoneNumber: alternatePhoneNumber,
                availibiltyOnPhone: availibiltyOnPhone,
                availibiltyInCity: availibiltyInCity
            }
            const message = await updateAddedLeaveRequest(request).catch(handleError);
            if (message) {
                this.setState({ alertMessage: message });
            }
        }
    }

    render() {
        const reload = _.get(this.state, 'reload');
        const employeeName = _.get(this.state, 'formData.employeeName', '');
        const reportingPersonName = _.get(this.state, 'formData.reportingPersonName', '');
        const duration = _.get(this.state, 'formData.duration', 1);
        const returnDate = formatDate(_.get(this.state, 'formData.returnDate', ''));
        const requestedDate = formatDate(_.get(this.state, 'formData.requestedDate', ''));
        const reasonForLeave = _.get(this.state, 'formData.reasonForLeave', '');
        const leaveStartDate = adjustDateTime(_.get(this.state, 'formData.leaveStartDate', new Date()));
        const startDateAttendanceOption = _.get(this.state, 'formData.startDateAttendanceOption', 1);
        const leaveEndDate = adjustDateTime(_.get(this.state, 'formData.leaveEndDate', new Date()));
        const endDateAttendanceOption = _.get(this.state, 'formData.endDateAttendanceOption', 1);
        const isAdhocLeave = _.get(this.state, 'formData.isAdhocLeave', false);
        const phoneNumber = _.get(this.state, 'formData.phoneNumber', '');
        const availibiltyOnPhone = _.get(this.state, 'formData.availibiltyOnPhone', true);
        const alternatePhoneNumber = _.get(this.state, 'formData.alternatePhoneNumber', '');
        const availibiltyInCity = _.get(this.state, 'formData.availibiltyInCity', true);
        const adhocLeaveStatus = _.get(this.state, 'formData.adhocLeaveStatus', '');
        const { type, id } = _.get(this.props, 'location.state');
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Leave Request</span>
                <h4 className='blue_border px-0 pt-2'>
                    Leave Request
                </h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                {
                    !reload &&
                    <form className='form-group'>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Name</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={employeeName} disabled readOnly />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Send Request To</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={reportingPersonName} disabled readOnly />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Reason for leave</div>
                                    <div className="col-md-8 col-xs-7">
                                        <textarea className="form-control w-100" value={reasonForLeave} onChange={(e) => this.handleChange(e, 'reasonForLeave')} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Leave Start Date</div>
                                    <div className="col-md-8 col-xs-7">
                                        <div className='row'>
                                            <div className="col-md-7 col-xs-6 mb-2">
                                                <input className="form-control w-100" type='date' value={leaveStartDate} onChange={(e) => this.handleChange(e, 'leaveStartDate')} />
                                            </div>
                                            <div className="col-md-5 col-xs-6 mb-2">
                                                <select className="form-select w-100" value={startDateAttendanceOption} onChange={(e) => this.handleChange(e, 'startDateAttendanceOption')}>
                                                    <option value={1}>Full Day</option>
                                                    <option value={2}>First Half</option>
                                                    <option value={3}>Second Half</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Leave End Date</div>
                                    <div className="col-md-8 col-xs-7">
                                        <div className='row'>
                                            <div className="col-md-7 col-xs-6 mb-2">
                                                <input
                                                    className="form-control w-100"
                                                    value={leaveEndDate}
                                                    type='date'
                                                    onChange={(e) => this.handleChange(e, 'leaveEndDate')}
                                                />
                                            </div>
                                            <div className="col-md-5 col-xs-6 mb-2">
                                                <select className="form-select w-100" value={endDateAttendanceOption} onChange={(e) => this.handleChange(e, 'endDateAttendanceOption')}>
                                                    <option value={1}>Full Day</option>
                                                    <option value={2}>First Half</option>
                                                    <option value={3}>Second Half</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Duation Of Leave</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <input className="form-control w-100" value={duration} disabled readOnly />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Return Date</div>
                                    <div className="col-md-8 col-xs-7">
                                        {returnDate}
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Requested Date</div>
                                    <div className="col-md-8 col-xs-7">
                                        {requestedDate}
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Is Adhoc Leave</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <input type='checkbox' checked={isAdhocLeave} onChange={(e) => this.handleChange(e, 'isAdhocLeave')} />
                                    </div>
                                </div>
                                {isAdhocLeave &&
                                    <div className='row mb-2'>
                                        <div className="col-md-4 col-xs-5 form-label">Adhoc Leave Status</div>
                                        <div className="col-md-8 col-xs-7 px-3 py-1">
                                            <select className="form-select w-100" value={adhocLeaveStatus} onChange={(e) => this.handleChange(e, 'adhocLeaveStatus')}>
                                                <option value={''}>Select</option>
                                                <option value={'Inform'}>Informed directly</option>
                                                <option value={'InformByTm'}>Informed by team member</option>
                                                <option value={'UnInform'}>Uninformed</option>
                                            </select>
                                        </div>
                                    </div>
                                }
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Phone</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <input className="form-control w-100" value={phoneNumber} onChange={(e) => this.handleChange(e, 'phoneNumber')} />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Availability On Phone</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <select className="form-select w-100" value={availibiltyOnPhone} onChange={(e) => this.handleChange(e, 'availibiltyOnPhone')}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Alternate Phone Number</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <input className="form-control w-100" value={alternatePhoneNumber} onChange={(e) => this.handleChange(e, 'alternatePhoneNumber')} />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Availability in Ahmedabad</div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1">
                                        <select className="form-select w-100" value={availibiltyInCity} onChange={(e) => this.handleChange(e, 'availibiltyInCity')}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className="col-md-4 col-xs-5 form-label"></div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1 mb-3">
                                        {
                                            (!id && (type === 'add')) &&
                                            <button
                                                type='button'
                                                onClick={this.addLeaveRequest}
                                                className='btn btn-primary rounded-0 me-2'>
                                                <FontAwesomeIcon icon={faSave} /> Save
                                            </button>
                                        }
                                        {
                                            (id && (type === 'update')) &&
                                            <button
                                                type='button'
                                                onClick={this.updateLeaveRequest}
                                                className='btn btn-primary rounded-0 me-2'>
                                                <FontAwesomeIcon icon={faSave} /> Update
                                            </button>
                                        }
                                        <button
                                            type='button'
                                            onClick={this.cancleLeaveRequest}
                                            className='btn btn-default rounded-0'>
                                            <FontAwesomeIcon icon={faClose} /> Cancle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                }
                {
                    reload &&
                    <ModualLoader customClass={'h-50'} />
                }
            </div>
        );
    }
}

export default () => (
    <LeaveRequestForm
        location={useLocation()}
        history={useNavigate()}
    />
);