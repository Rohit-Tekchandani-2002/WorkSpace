import './MonthlyTimeLogs.css';
import RootContext from '../../../../../context/RootContext/RootContext';
import { Component } from 'react';
import { timeLogsDefaultContext } from '../../../../../constants/workspaceConstants';
import _ from 'lodash';
import { getMonthlyTimeLog } from '../../../../../services/Workspace/workspace.service';
import { OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { formatTime } from '../../../../../config/utility';

class MonthlyTimeLogs extends Component {
    static contextType = RootContext;
    state = { refreshModule: false }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let timeLogsContext = _.get(this.context, 'timeLogsContext');
        if (!timeLogsContext) {
            timeLogsContext = timeLogsDefaultContext;
            setGlobal('timeLogsContext', timeLogsContext);
        }
        this.getMonthlyTimeLogsList();
    }

    componentDidUpdate = (prevProps, _prevState) => {
        console.log(this.props, prevProps, _.get(this.props, 'month'), _.get(prevProps, 'month'), _.get(this.props, 'year'), _.get(prevProps, 'year'));
        if ((_.get(this.props, 'month') !== _.get(prevProps, 'month')) || (_.get(this.props, 'year') !== _.get(prevProps, 'year'))) {
            this.getMonthlyTimeLogsList();
        }
    }

    getMonthlyTimeLogsList = async () => {
        const { setGlobal, handleError } = this.context;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const selectedMonth = _.get(this.props, 'month', currentMonth);
        const selectedYear = _.get(this.props, 'year', currentYear);
        const employeeId = localStorage.getItem('employeeId');
        let timeLogsContext = _.get(this.context, 'timeLogsContext', timeLogsDefaultContext);
        let request = {
            employeeId: employeeId,
            month: selectedMonth,
            year: selectedYear
        }
        let monthlyTimeLogs = await getMonthlyTimeLog(request).catch(handleError);
        if (monthlyTimeLogs) {
            _.set(timeLogsContext, 'monthlyTimeLogs', monthlyTimeLogs);
            setGlobal('timeLogsContext', timeLogsContext);
            this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
        }
    }

    checkLowWorkLogHours = (value) => {
        if (value >= 8.30) {
            return <span className='text-primary'>{formatTime(value)}</span>
        } else {
            return <span className='text-danger'>{formatTime(value)}</span>
        }
    }

    render() {
        const employeeInfo = _.get(this.context, 'timeLogsContext.monthlyTimeLogs.employeeInfo', {});
        const employeeMonthlyLogs = _.get(this.context, 'timeLogsContext.monthlyTimeLogs.employeeMonthlyLogs', []);
        const monthlyLogsList = _.chain(employeeMonthlyLogs)
            .groupBy("date")
            .map((value, key) => ({ date: key, logs: value }))
            .value();
        return (
            <>
                <Table bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Employee No</th>
                            <th>Name</th>
                            <th>Shift</th>
                            <th>Experience</th>
                            <th>Hours</th>
                            <th>P Days</th>
                            <th>L Days</th>
                            <th>Half Leaves</th>
                            <th>Late Days</th>
                            <th>Avg Time Log</th>
                            <th>Avg Work Log</th>
                            <th>Difference [TL/WL]</th>
                            <th>Out Hours [Avg.]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{_.get(employeeInfo, 'employeeNo', '')}</td>
                            <td>{_.get(employeeInfo, 'name', '')}</td>
                            <td>{_.get(employeeInfo, 'shift', '')}</td>
                            <td>{_.get(employeeInfo, 'experience', 0)}</td>
                            <td>{_.get(employeeInfo, 'hours', 0)}</td>
                            <td>{_.get(employeeInfo, 'presentDays', 0)}</td>
                            <td>{_.get(employeeInfo, 'leaveDays', 0)}</td>
                            <td>{_.get(employeeInfo, 'halfLeave', 0)}</td>
                            <td>{_.get(employeeInfo, 'lateDays', 0)}</td>
                            <td>{this.checkLowWorkLogHours(_.get(employeeInfo, 'avgTimeLog', 0))}</td>
                            <td>{this.checkLowWorkLogHours(_.get(employeeInfo, 'avgWorkLog', 0))}</td>
                            <td>{this.checkLowWorkLogHours(_.get(employeeInfo, 'difference', 0))}</td>
                            <td>{_.get(employeeInfo, 'outHours', 0)}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table bordered responsive hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Last Comer?</th>
                            <th>First In Time</th>
                            <th>Last Out Time</th>
                            <th>Total Out Hours</th>
                            <th>Time Log</th>
                            <th>Work Log</th>
                            <th>Difference [TL/WL]</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(monthlyLogsList, (data, index) => {
                                const lateComerFlag = _.get(data, 'logs[0].lateComer', 0);
                                const lateComer = (lateComerFlag === 0) ? '-' : (lateComerFlag === 1) ? 'Yes' : 'No';
                                const firstInTime = _.get(data, 'logs[0].firstInTime', 0);
                                const lastOutTime = _.get(_.last(_.get(data, 'logs')), 'lastOutTime', 0);
                                const timeLog = lastOutTime - firstInTime;
                                const workLog = _.get(data, 'workLog', 0);
                                const currentDate = _.get(data, 'date', '');
                                const totalOutHours = _.reduce(_.get(data, 'logs'), (total, log) => total += _.get(log, 'totalOutHours', 0), 0)
                                const popover = <Popover className='p-2'>
                                    <Table bordered responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Out Hrs</th>
                                                <th>Work Hrs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                _.map(_.get(data, 'logs', []), (popoverItem, popoverIndex) => {
                                                    return (
                                                        <tr key={popoverIndex}>
                                                            <td>{_.get(popoverItem, 'firstInTime')}</td>
                                                            <td>{_.get(popoverItem, 'lastOutTime')}</td>
                                                            <td>{_.get(popoverItem, 'totalOutHours')} Hrs</td>
                                                            <td>{_.get(popoverItem, 'workLog')} Hrs</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Popover>;
                                return (
                                    <OverlayTrigger
                                        key={index}
                                        trigger={['hover', 'focus']}
                                        placement="top"
                                        overlay={popover}
                                    >
                                        <tr key={index}>
                                            <td>{currentDate}</td>
                                            <td>{lateComer}</td>
                                            <td>{firstInTime}</td>
                                            <td>{lastOutTime}</td>
                                            <td>{totalOutHours}</td>
                                            <td>{timeLog}</td>
                                            <td>{workLog}</td>
                                            <td>{timeLog - workLog}</td>
                                        </tr>
                                    </OverlayTrigger>
                                );
                            })
                        }
                    </tbody>
                </Table >
            </>
        );
    }
}

export default MonthlyTimeLogs;