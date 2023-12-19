import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Timesheets.css';
import { Component } from 'react';
import { faAngleDown, faAngleRight, faAngleUp, faBriefcase, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { timesheetDefaultContext } from '../../../constants/workspaceConstants';
import _ from 'lodash';
import { getHoliday, getMonthlyTimeSheet, getTimeSheet } from '../../../services/Workspace/workspace.service';
import RootContext from '../../../context/RootContext/RootContext';
import { formatTime } from '../../../config/utility';
import taskImg from '../../../assets/img/task.png';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';
import { getProjectBacklogInfo } from '../../../services/Project/project.service';
import AuthContext from '../../../context/AuthContext/AuthContext';

class Timesheets extends Component {
    static contextType = RootContext;
    state = { accordian: [], reload: false, alertMessage: '' }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let timesheetContext = _.get(this.context, 'timesheetContext');
        if (!timesheetContext) {
            timesheetContext = timesheetDefaultContext;
            setGlobal('timesheetContext', timesheetContext);
        }
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                await this.getTimesheetData();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
    }

    getTimesheetData = async () => {
        const { setGlobal, handleError } = this.context;
        let timesheetContext = _.get(this.context, 'timesheetContext', timesheetDefaultContext);
        let request = _.get(timesheetContext, 'filter');
        let timesheet = await getTimeSheet(request).catch(handleError);
        if (timesheet) {
            timesheet = _.chain(timesheet)
                .groupBy("ProjectName")
                .map((value, key) => ({ projectName: key, timesheet: value }))
                .value();
            _.set(timesheetContext, 'timesheet', timesheet);
            console.log('timeSheet', timesheet);
        }
        let monthlyTimeSheet = await getMonthlyTimeSheet(request).catch(handleError);
        if (monthlyTimeSheet) {
            _.set(timesheetContext, 'monthlyTimeSheet', monthlyTimeSheet);
            setGlobal('timesheetContext', timesheetContext);
            console.log('monthlyTimeSheet', monthlyTimeSheet);
        }
        const holidayList = await getHoliday().catch(handleError);
        if (holidayList) {
            _.set(timesheetContext, 'holidayList', holidayList);
        }
        setGlobal('timesheetContext', timesheetContext);
    }

    previousDate = (month, year) => {
        const { setGlobal } = this.context;
        let timesheetContext = _.get(this.context, 'timesheetContext', timesheetDefaultContext);
        _.set(timesheetContext, 'filter.month', (month - 1));
        if (month === 1) {
            _.set(timesheetContext, 'filter.month', 12);
            _.set(timesheetContext, 'filter.year', (year - 1));
        }
        setGlobal('timesheetContext', timesheetContext);
        this.setState({ reload: true });
    }

    nextDate = (month, year) => {
        const { setGlobal } = this.context;
        let timesheetContext = _.get(this.context, 'timesheetContext', timesheetDefaultContext);
        _.set(timesheetContext, 'filter.month', (month + 1));
        if (month === 12) {
            _.set(timesheetContext, 'filter.month', 1);
            _.set(timesheetContext, 'filter.year', (year + 1));
        }
        setGlobal('timesheetContext', timesheetContext);
        this.setState({ reload: true });
    }

    getCalender = (month, year) => {
        let lastDay = new Date(year, month, 0).getDate();
        let calender = [];
        _.map(_.range(lastDay), (day) => calender.push(`${year}-${month}-${_.padStart(_.toString(day + 1), 2, 0)}`));
        return calender;
    }

    selectProjectStateClass = (statusId) => {
        let tempClassName = '';
        switch (statusId) {
            case 1:
                tempClassName = 'new';
                break;
            case 2:
                tempClassName = 'in-progress';
                break;
            case 3:
                tempClassName = 'dev-completed';
                break;
            case 4:
                tempClassName = 'ready-for-testing';
                break;
            case 5:
                tempClassName = 'closed';
                break;
            default:
                tempClassName = ''
        }
        return tempClassName;
    };

    toggleAccordian = (index) => {
        let accordian = _.get(this.state, 'accordian', []);
        if (!_.includes(accordian, index)) {
            this.setState({ accordian: [...accordian, index] });
        } else {
            _.remove(accordian, (item) => item === index);
            this.setState({ accordian: accordian });
        }
    };

    addWorkLogtime = (workLog) => {
        let { modalData, setGlobal } = this.context;
        if (workLog) {
            modalData = {
                modalType: 'AddWorkLogModal',
                show: true,
                data: workLog,
                handleConfirm: (message) => {
                    this.getTimesheetData();
                    setGlobal('modalData', { show: false });
                    this.setState({ alertMessage: message })
                }
            };
            setGlobal('modalData', modalData);
            this.setState({ reload: true });
        }
    }

    addWorkLogData = async (date, name, item) => {
        const { handleError } = this.context;
        const id = _.split(_.get(item, 'ProjectTitle', ''), ':')[0];
        const data = await getProjectBacklogInfo(id).catch(handleError);
        if (data) {
            console.log('data', data);
            _.set(data, 'projectWorkId', id);
            _.set(data, 'workDoneOn', date);
            _.set(data, 'assignedTo', name);
            this.addWorkLogtime(data);
        }
    }

    render() {
        let currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const selectedMonth = _.get(this.context, 'timesheetContext.filter.month', (currentMonth + 1));
        const selectedYear = _.get(this.context, 'timesheetContext.filter.year', currentYear);
        currentDate.setMonth(selectedMonth - 1);
        currentDate.setFullYear(selectedYear);
        const month = moment(currentDate).format('MMMM');
        const year = moment(currentDate).format('YYYY');
        const calender = this.getCalender(selectedMonth, selectedYear);
        const timesheetContext = _.get(this.context, 'timesheetContext', timesheetDefaultContext);
        const timesheet = _.get(timesheetContext, 'timesheet');
        const holidayList = _.get(timesheetContext, 'holidayList');
        const dailyWorkLog = _.get(timesheetContext, 'monthlyTimeSheet.workList', []);
        const dailyTimeLog = _.get(timesheetContext, 'monthlyTimeSheet.timeList', []);
        const reload = _.get(this.state, 'reload');
        return (
            <div className='h-100 p-2'>
                <FontAwesomeIcon icon={faBriefcase} /> My Workspace <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Timesheets</span>
                <h4 className='blue_border px-0 pt-2'>My Timesheet</h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                <div className='d-flex justify-content-end'>
                    <div>
                        <span className="FullLeaveBox ColorBox"></span>&nbsp;<label>Full Leave&nbsp;</label>
                        <span className="HalfLeaveBox ColorBox"></span>&nbsp;<label>Half Leave&nbsp;</label>
                        <span className="CurrentDateBox  ColorBox"></span>&nbsp;<label>Today's Date&nbsp;</label>
                        <span className="WeekendBox ColorBox"></span>&nbsp;<label>Weekend&nbsp;</label>
                        <span className="HolidayBox ColorBox"></span>&nbsp;<label>Public Holiday&nbsp;</label>
                    </div>
                </div>
                {
                    !reload &&
                    <div className='timesheet'>
                        <div className='timesheet-header'>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className='me-2'
                                onClick={() => this.previousDate(selectedMonth, selectedYear)} />
                            <div className='calender'>{month} - {year}</div>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className='ms-2'
                                onClick={() => this.nextDate(selectedMonth, selectedYear)} />
                        </div>
                        <div className='timesheet-body'>
                            <div className='timesheet-row'>
                                <div className='status-height'>&nbsp;</div>
                                <div className='cell-long'>Work Items</div>
                                <div className='cell-short'>p</div>
                                <div className='cell-short'>Σ</div>
                                {
                                    _.map(calender, (date) => {
                                        const saturdayClass = (moment(date).format('dd') === 'Sa') ? 'border-right' : '';
                                        return (
                                            <div key={date} className={`calender-cell ${saturdayClass}`}>
                                                <div>{moment(date).format('D')}</div>
                                                <div>{moment(date).format('dd')[0]}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {
                                _.map(timesheet, (data, index) => {
                                    const timesheetList = _.get(data, 'timesheet', []);
                                    const totalPresent = _.reduce(timesheetList, (total, list) => total + _.get(list, 'P'), 0);
                                    const totalWork = _.reduce(timesheetList, (total, list) => total + _.get(list, 'TotalWorkLog'), 0);
                                    const isAccordianOpen = !_.includes(_.get(this.state, 'accordian'), `accordian-${index}`);
                                    const accordianClass = isAccordianOpen ? 'accrodian-open' : '';
                                    return (
                                        <div className='accordian-container' key={index}>
                                            <div className='timesheet-row bg-grey'>
                                                <div className='status-height'>&nbsp;</div>
                                                <div className='cell-long'>
                                                    <FontAwesomeIcon className='me-2' icon={isAccordianOpen ? faAngleDown : faAngleUp} onClick={() => this.toggleAccordian(`accordian-${index}`)} />
                                                    {_.get(data, 'projectName')}
                                                </div>
                                                <div className='cell-short'>{formatTime(totalPresent)}</div>
                                                <div className='cell-short'>{formatTime(totalWork)}</div>
                                                {
                                                    _.map(calender, (date) => {
                                                        const saturdayClass = (moment(date).format('dd') === 'Sa') ? 'border-right' : '';
                                                        const filterData = _.filter(dailyWorkLog, (data) => {
                                                            if (moment(_.get(data, 'workDoneOn')).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY')) {
                                                                return data;
                                                            }
                                                        });
                                                        const workTime = _.get(filterData[0], 'workTime');
                                                        const weekendClass = (moment(date).format('dd')[0] === 'S') ? 'bg-grey' : '';
                                                        return (
                                                            <div key={date} className={`calender-cell ${saturdayClass} ${weekendClass}`}>
                                                                {workTime ? formatTime(workTime) : ''}
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            <div className={`accrodian ${accordianClass}`}>
                                                <div className='accrodian-content-table'>
                                                    {
                                                        _.map(timesheetList, (item, itemIndex) => {
                                                            return (
                                                                <div className='timesheet-row' key={itemIndex}>
                                                                    <div className={`${this.selectProjectStateClass(_.get(item, 'ProjectStatusId'))} status-height`}>&nbsp;</div>
                                                                    <div className='cell-long'>
                                                                        <a href='#'> <img src={taskImg} className='imgPadding' alt='task' />{_.get(item, 'ProjectTitle')}</a>
                                                                    </div>
                                                                    <div className='cell-short'>{formatTime(_.get(item, 'P'))}</div>
                                                                    <div className='cell-short'>{formatTime(_.get(item, 'TotalWorkLog'))}</div>
                                                                    {
                                                                        _.map(calender, (date) => {
                                                                            const isWeekEnd = moment(date).format('dd')[0] === 'S';
                                                                            const isCurrentDate = moment(date).format('YYYYMMDD') === moment().format('YYYYMMDD');
                                                                            const isEditable = moment(date).format('YYYYMM') === moment().format('YYYYMM') && _.inRange(_.subtract(_.toNumber(moment().format('DD')), _.toNumber(moment(date).format('DD'))), 5);
                                                                            let isHoliday = false;
                                                                            const saturdayClass = moment(date).format('dd') === 'Sa' ? 'border-right' : '';
                                                                            _.map(holidayList, (data) => {
                                                                                const holidayDate = moment(_.get(data, 'value')).format('YYYY-MM-DD');
                                                                                const currentItemDate = moment(date).format('YYYY-MM-DD');
                                                                                if (holidayDate === currentItemDate) {
                                                                                    isHoliday = true;
                                                                                }
                                                                            })
                                                                            const isEditableClass = (isEditable && !isHoliday && !isWeekEnd);
                                                                            const classList = isWeekEnd ? 'bg-grey' : (isHoliday ? 'holiday' : isCurrentDate ? 'current-date' : '');
                                                                            return (
                                                                                <div key={date}>
                                                                                    {
                                                                                        isEditableClass &&
                                                                                        <AuthContext.Consumer>
                                                                                            {
                                                                                                authContext => {
                                                                                                    const userName = _.get(authContext, 'userData.firstName', 'User') + ' ' + _.get(authContext, 'userData.lastName', '');
                                                                                                    return (
                                                                                                        <div key={date} className={`calender-cell ${saturdayClass} ${classList} hover-pen`} onClick={() => this.addWorkLogData(date, userName, item)}>
                                                                                                            {_.get(item, date) ? formatTime(_.get(item, date)) : ''}
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            }
                                                                                        </AuthContext.Consumer>
                                                                                    }
                                                                                    {
                                                                                        !isEditableClass &&
                                                                                        <div key={date} className={`calender-cell ${saturdayClass} ${classList}`}>
                                                                                            {_.get(item, date) ? formatTime(_.get(item, date)) : ''}
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            );
                                                                        })
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {
                                (_.get(dailyWorkLog, 'length', 0) !== 0) &&
                                <div className='timesheet-row'>
                                    <div className='status-height'>&nbsp;</div>
                                    <div className='cell-long border-right-light'>
                                        Daily work log hours
                                    </div>
                                    <div className='cell-short'></div>
                                    <div className='cell-short'></div>
                                    {
                                        _.map(calender, (date) => {
                                            const saturdayClass = (moment(date).format('dd') === 'Sa') ? 'border-right' : '';
                                            const filterData = _.filter(dailyWorkLog, (data) => {
                                                if (moment(_.get(data, 'workDoneOn')).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY')) {
                                                    return data;
                                                }
                                            });
                                            const workTime = _.get(filterData[0], 'workTime');
                                            return (
                                                <div key={date} className={`cell-short ${saturdayClass}`}>
                                                    {workTime ? formatTime(workTime) : ''}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }
                            <div className='timesheet-row'>
                                <div className='status-height'>&nbsp;</div>
                                <div className='cell-long border-right-light'>
                                    Daily time log hours
                                </div>
                                <div className='cell-short'></div>
                                <div className='cell-short'></div>
                                {
                                    _.map(calender, (date) => {
                                        const saturdayClass = (moment(date).format('dd') === 'Sa') ? 'border-right' : '';
                                        const filterData = _.filter(dailyTimeLog, (data) => {
                                            if (moment(_.get(data, 'logDate')).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY')) {
                                                return data;
                                            }
                                        });
                                        const timeLog = _.get(filterData[0], 'timeLog');
                                        return (
                                            <div key={date} className={`cell-short ${saturdayClass}`}>
                                                {timeLog ? formatTime(timeLog) : ''}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className='timesheet-row'>
                                <div className='status-height'>&nbsp;</div>
                                <div className='cell-long border-right-light'>
                                    Weekly hours total
                                </div>
                                <div className='cell-short'></div>
                                <div className='cell-short'></div>
                                {
                                    _.map(calender, (date) => {
                                        const isSaturday = moment(date).format('dd') === 'Sa';
                                        const saturdayClass = isSaturday ? 'border-right' : '';
                                        let weeklyTimeLog = 0;
                                        _.map(dailyTimeLog, (data) => {
                                            if (isSaturday) {
                                                const previousWeekEnd = _.toNumber(moment(date).subtract(1, 'weeks').format('YYYYMMDD'));
                                                const currentLogDate = _.toNumber(moment(_.get(data, 'logDate')).format('YYYYMMDD'));
                                                const nextWeekEnd = _.toNumber(moment(date).format('YYYYMMDD'));
                                                if ((_.toNumber(previousWeekEnd) < _.toNumber(currentLogDate)) && (_.toNumber(currentLogDate) <= _.toNumber(nextWeekEnd))) {
                                                    weeklyTimeLog += _.get(data, 'timeLog');
                                                }
                                            } else {
                                                weeklyTimeLog = 0;
                                            }
                                        });
                                        return (
                                            <div key={date} className={`cell-short ${saturdayClass}`}>
                                                {isSaturday ? formatTime(weeklyTimeLog) : ''}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    reload &&
                    <ModualLoader customClass={'h-50'} />
                }
            </div>
        );
    }
}

export default Timesheets;