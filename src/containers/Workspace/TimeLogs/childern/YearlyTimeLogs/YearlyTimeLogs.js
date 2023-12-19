import './YearlyTimeLogs.css';
import { Component } from 'react';
import RootContext from '../../../../../context/RootContext/RootContext';
import { timeLogsDefaultContext } from '../../../../../constants/workspaceConstants';
import { getYearlyTimeLog } from '../../../../../services/Workspace/workspace.service';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import { formatTime } from '../../../../../config/utility';

class YearlyTimeLogs extends Component {
    static contextType = RootContext;
    state = { refreshModule: false }

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let timeLogsContext = _.get(this.context, 'timeLogsContext');
        if (!timeLogsContext) {
            timeLogsContext = timeLogsDefaultContext;
            setGlobal('timeLogsContext', timeLogsContext);
        }
        this.getYearlyTimeLogsList();
    }

    componentDidUpdate = (prevProps, _prevState) => {
        console.log(this.props, prevProps, _.get(this.props, 'month'), _.get(prevProps, 'month'), _.get(this.props, 'year'), _.get(prevProps, 'year'));
        if ((_.get(this.props, 'month') !== _.get(prevProps, 'month')) || (_.get(this.props, 'year') !== _.get(prevProps, 'year'))) {
            this.getYearlyTimeLogsList();
        }
    }

    getYearlyTimeLogsList = async () => {
        const { setGlobal, handleError } = this.context;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const selectedYear = _.get(this.props, 'year', currentYear);
        const employeeId = localStorage.getItem('employeeId');
        let timeLogsContext = _.get(this.context, 'timeLogsContext', timeLogsDefaultContext);
        let request = {
            employeeId: employeeId,
            year: selectedYear
        }
        let getYearlyTimeLogs = await getYearlyTimeLog(request).catch(handleError);
        if (getYearlyTimeLogs) {
            _.set(timeLogsContext, 'yearlyTimeLogs', getYearlyTimeLogs);
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
        const yearlyTimeLogs = _.get(this.context, 'timeLogsContext.yearlyTimeLogs', []);
        return (
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Employee No</th>
                        <th>Name</th>
                        <th>Month</th>
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
                    {
                        _.map(yearlyTimeLogs, (data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{_.get(data, 'employeeNo', '')}</td>
                                    <td>{_.get(data, 'name', '')}</td>
                                    <td>{_.get(data, 'month', '')}</td>
                                    <td>{_.get(data, 'hours', 0)}</td>
                                    <td>{_.get(data, 'pDays', 0)}</td>
                                    <td>{_.get(data, 'lDays', 0)}</td>
                                    <td>{_.get(data, 'halfLeaves', 0)}</td>
                                    <td>{_.get(data, 'lateDays', 0)}</td>
                                    <td>{this.checkLowWorkLogHours(_.get(data, 'avgTimeLog', 0))}</td>
                                    <td>{this.checkLowWorkLogHours(_.get(data, 'avgWorkLog', 0))}</td>
                                    <td>{this.checkLowWorkLogHours(_.get(data, 'difference', 0))}</td>
                                    <td>{this.checkLowWorkLogHours(_.get(data, 'outHours', 0))}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default YearlyTimeLogs;