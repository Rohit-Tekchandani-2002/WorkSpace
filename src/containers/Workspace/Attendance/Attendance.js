import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Attendance.css';
import { Component } from 'react';
import { faAngleRight, faBriefcase, faRefresh, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { attendanceOptions, month } from '../../../constants/constants';
import _ from 'lodash';
import { getHoliday, getAttendance, addAttendance } from '../../../services/Workspace/workspace.service';
import { attendanceDefaultContext } from '../../../constants/workspaceConstants';
import RootContext from '../../../context/RootContext/RootContext';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';

class Attendance extends Component {
    static contextType = RootContext;
    state = { refreshModule: false, alertMessage: '', reload: false };
    attendanceHeader = null;

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let attendance = _.get(this.context, 'attendance');
        if (!attendance) {
            attendance = attendanceDefaultContext;
            setGlobal('attendance', attendance);
        }
        this.getAttendanceData();
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
    }

    getAttendanceData = async () => {
        const { handleError, setGlobal } = this.context;
        let attendance = _.get(this.context, 'attendance', attendanceDefaultContext);
        const attendanceFilter = _.get(attendance, 'filter', {});
        const request = {
            employeeId: localStorage.getItem('employeeId'),
            ...attendanceFilter
        }
        const attendanceData = await getAttendance(request).catch(handleError);
        if (attendanceData) {
            _.set(attendance, 'attendanceData', attendanceData);
            setGlobal('attendance', attendance);
        }
        const holidayList = await getHoliday().catch(handleError);
        if (holidayList) {
            _.set(attendance, 'holidayList', holidayList);
            setGlobal('attendance', attendance);
        }
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const selectedMonth = _.get(this.context, 'attendance.filter.month', currentMonth);
        const selectedYear = _.get(this.context, 'attendance.filter.year', currentYear);
        this.attendanceHeader = `${month[selectedMonth]}-${selectedYear}`;
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
        console.log('attendance', attendance);
    }

    resetData = () => {
        this.setState({ reload: true });
        setTimeout(() => {
            const { setGlobal } = this.context;
            const currentDate = new Date();
            let attendance = _.get(this.context, 'attendance');
            _.set(attendance, 'filter.month', currentDate.getMonth() + 1);
            _.set(attendance, 'filter.year', currentDate.getFullYear());
            setGlobal('attendance', attendance);
            this.getAttendanceData();
            this.setState({ reload: false });
        }, 500);
        clearTimeout();
    }

    handleChange = (event, field) => {
        const value = _.get(event, 'target.value');
        const { setGlobal } = this.context;
        let attendance = _.get(this.context, 'attendance');
        switch (field) {
            case 'month':
                _.set(attendance, 'filter.month', value);
                break;
            case 'year':
                _.set(attendance, 'filter.year', value);
                break;
            default:
                break;
        }
        setGlobal('attendance', attendance);
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    isCurrentDate = (date) => {
        const currentDate = new Date();
        return moment(currentDate).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY');
    }

    changeOption = (feild, index) => {
        const { setGlobal } = this.context;
        let attendance = _.get(this.context, 'attendance');
        switch (feild) {
            case 'Present':
                _.set(attendance, `attendanceData[${index}].attendanceOption`, 1);
                break;
            case 'Absent':
                _.set(attendance, `attendanceData[${index}].attendanceOption`, 2);
                break;
            case 'HalfLeave':
                _.set(attendance, `attendanceData[${index}].attendanceOption`, 3);
                break;
            default:
                break;
        }
        setGlobal('attendance', attendance);
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    addOrUpdateAttendance = async () => {
        const { attendance, handleError } = this.context;
        const currentDate = new Date();
        const currentAttendance = _.find(_.get(attendance, 'attendanceData', []), (data) => {
            if (moment(_.get(data, 'currentDate')).format('DD-MM-YYYY') === moment(currentDate).format('DD-MM-YYYY')) {
                return data;
            }
        });
        const request = {
            employeeId: localStorage.getItem('employeeId'),
            attendanceOption: _.get(currentAttendance, 'attendanceOption')
        }
        const message = await addAttendance(request).catch(handleError);
        if (message) {
            this.setState({ alertMessage: message });
        }
    }

    isCurrentAttendanceApproved = () => {
        const attendance = _.get(this.context, 'attendance');
        const currentDate = new Date();
        const currentAttendance = _.find(_.get(attendance, 'attendanceData', []), (data) => {
            if (moment(_.get(data, 'currentDate')).format('DD-MM-YYYY') === moment(currentDate).format('DD-MM-YYYY')) {
                return data;
            }
        });
        return _.get(currentAttendance, 'isApproved') ? true : false;
    }

    render() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const selectedMonth = _.get(this.context, 'attendance.filter.month', currentMonth);
        const selectedYear = _.get(this.context, 'attendance.filter.year', currentYear);
        const attendanceData = _.get(this.context, 'attendance.attendanceData', []);
        const holidayList = _.get(this.context, 'attendance.holidayList', []);
        const totalPresent = _.reduce(attendanceData, (total, data) => {
            if (_.get(data, 'attendanceOption')) {
                switch (_.get(data, 'attendanceOption')) {
                    case 1:
                        total += 1;
                        break;
                    case 3:
                        total += 0.5;
                    default:
                        break;
                }
            }
            return total;
        }, 0);
        const totalAbsent = _.reduce(attendanceData, (total, data) => {
            if (_.get(data, 'attendanceOption')) {
                switch (_.get(data, 'attendanceOption')) {
                    case 2:
                        total += 1;
                        break;
                    case 3:
                        total += 0.5;
                    default:
                        break;
                }
            }
            return total;
        }, 0);
        const reload = _.get(this.state, 'reload', false);
        return (
            <>
                <div className='p-2'>
                    <FontAwesomeIcon icon={faBriefcase} /> My Workspace <FontAwesomeIcon icon={faAngleRight} />
                    <span className='font-weight-normal'> Attendance</span>
                    <h4 className='blue_border px-0 pt-2'>Attendance</h4>
                    <AlertComponent
                        show={_.get(this.state, 'alertMessage') !== ''}
                        alertMessage={_.get(this.state, 'alertMessage')}
                        type={'success'}
                    />
                    <div className='pt-2 border'>
                        <form className='form-group row m-2'>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Select Month</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className="form-select w-100" value={selectedMonth} onChange={(e) => this.handleChange(e, 'month')}>
                                            {
                                                _.map(_.entries(month), ([key, value]) => {
                                                    return <option key={key} value={key}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Select Year</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className="form-select w-100" value={selectedYear} onChange={(e) => this.handleChange(e, 'year')}>
                                            <option value={currentYear}>{currentYear}</option>
                                            <option value={currentYear - 1}>{currentYear - 1}</option>
                                            <option value={currentYear - 2}>{currentYear - 2}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                            <button className='btn btn-primary rounded-0 me-2' onClick={this.getAttendanceData}><FontAwesomeIcon icon={faSearch} /> Search</button>
                            <button className='btn btn-default rounded-0' onClick={this.resetData}><FontAwesomeIcon icon={faRefresh} /> Reset</button>
                        </div>
                    </div>
                </div>
                {
                    !reload &&
                    <div className='p-2'>
                        <div className='d-flex justify-content-between'>
                            <div className='text-danger'>
                                {
                                    this.isCurrentAttendanceApproved() &&
                                    <span>Today's attendance has been submitted by  your RO. Please contact him/her now in case of any corrections.</span>
                                }
                            </div>
                            <div>
                                <span className="FullLeaveBox ColorBox"></span>&nbsp;<label>Full Leave&nbsp;</label>
                                <span className="HalfLeaveBox ColorBox"></span>&nbsp;<label>Half Leave&nbsp;</label>
                                <span className="CurrentDate  ColorBox"></span>&nbsp;<label>Today&nbsp;</label>
                                <span className="WeekendBox ColorBox"></span>&nbsp;<label>Weekend&nbsp;</label>
                                <span className="HolidayBox ColorBox"></span>&nbsp;<label>Holiday&nbsp;</label>
                            </div>
                        </div>
                        <div className='attendance-container'>
                            <div className='attendance-header'>
                                {this.attendanceHeader}
                                <span> Total &#8658; Present: {totalPresent} & Absent: {totalAbsent} </span>
                            </div>
                            <div className='attendance-body'>
                                <div className='attendance-calender'>
                                    {
                                        _.map(attendanceData, (data, index) => {
                                            const date = _.get(data, 'currentDate');
                                            const day = _.toUpper(_.get(data, 'currentWeekDay[0]'));
                                            let isHoliday = false;
                                            _.map(holidayList, (data) => {
                                                if (data.value === date) {
                                                    isHoliday = true;
                                                }
                                            })
                                            const classList = (day === 'S') ? 'day-weekend' : (isHoliday ? 'holiday' : '');
                                            const attendanceOption = _.get(data, 'attendanceOption') ? attendanceOptions[_.get(data, 'attendanceOption')] : '';
                                            return (
                                                <div className='form-group mb-0' key={index}>
                                                    <div className='attendance-date'>
                                                        <span>{moment(_.get(data, 'currentDate')).format('D')}</span>
                                                        <span>{day}</span>
                                                    </div>
                                                    {
                                                        !this.isCurrentDate(_.get(data, 'currentDate')) &&
                                                        <div className={`attendance-input ${classList} ${_.get(data, 'isApproved') ? 'text-success' : ''}`}>
                                                            {attendanceOption}
                                                        </div>
                                                    }
                                                    {
                                                        this.isCurrentDate(_.get(data, 'currentDate')) &&
                                                        <Dropdown className="attendance-input">
                                                            <Dropdown.Toggle className={`${_.get(data, 'isApproved') ? 'text-success' : ''}`}>
                                                                {attendanceOption}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => this.changeOption('Present', index)}>
                                                                    Present
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => this.changeOption('Absent', index)}>
                                                                    Absent
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => this.changeOption('HalfLeave', index)}>
                                                                    Half Leave
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    !this.isCurrentAttendanceApproved() &&
                                    <button className='btn btn-primary save-attendance' onClick={this.addOrUpdateAttendance}><FontAwesomeIcon icon={faSave} /> Save</button>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    reload &&
                    <ModualLoader customClass={'h-50'} />
                }
            </>
        );
    }
}

export default Attendance;