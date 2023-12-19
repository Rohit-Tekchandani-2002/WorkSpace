import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TimeLogs.css';
import { Component } from 'react';
import { faAngleRight, faGears, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { month } from '../../../constants/constants';
import RootContext from '../../../context/RootContext/RootContext';
import { timeLogsDefaultContext } from '../../../constants/workspaceConstants';
import MonthlyTimeLogs from './childern/MonthlyTimeLogs/MonthlyTimeLogs';
import YearlyTimeLogs from './childern/YearlyTimeLogs/YearlyTimeLogs';
import ModualLoader from '../../../components/ModualLoader/ModualLoader';

class TimeLogs extends Component {
    static contextType = RootContext;
    state = { refreshModule: false, reload: false}
    content = <MonthlyTimeLogs {..._.get(timeLogsDefaultContext, 'filter', {})}/>;

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let timeLogsContext = _.get(this.context, 'timeLogsContext');
        if (!timeLogsContext) {
            timeLogsContext = timeLogsDefaultContext;
            setGlobal('timeLogsContext', timeLogsContext);
        }
    }

    handleChange = (event, field) => {
        const value = _.get(event, 'target.value');
        const { setGlobal } = this.context;
        let timeLogsContext = _.get(this.context, 'timeLogsContext');
        switch (field) {
            case 'type':
                _.set(timeLogsContext, 'filter.type', value);
                break;
            case 'month':
                _.set(timeLogsContext, 'filter.month', value);
                break;
            case 'year':
                _.set(timeLogsContext, 'filter.year', value);
                break;
            default:
                break;
        }
        setGlobal('timeLogsContext', timeLogsContext);
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    searchTimeLogs = (type) => {
        const filter = _.get(this.context, 'timeLogsContext.filter', {});
        if (type === 'monthly') {
            this.content = <MonthlyTimeLogs {...filter}/>
        } else {
            if (type === 'yearly') {
                this.content = <YearlyTimeLogs {...filter}/>
            }
        }
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    resetData = () => {
        this.setState({ reload: true });
        setTimeout(() => {
            const { setGlobal } = this.context;
            const filter = _.get(this.context, 'timeLogsContext.filter', {});
            const currentDate = new Date();
            let timeLogsContext = _.get(this.context, 'timeLogsContext');
            _.set(timeLogsContext, 'filter.type', 'monthly');
            _.set(timeLogsContext, 'filter.month', currentDate.getMonth() + 1);
            _.set(timeLogsContext, 'filter.year', currentDate.getFullYear());
            setGlobal('timeLogsContext', timeLogsContext);
            this.content = <MonthlyTimeLogs {...filter} />
            this.setState({ reload: false });
        }, 500);
        clearTimeout();
    }

    render() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const selectedType = _.get(this.context, 'timeLogsContext.filter.type', 'monthly');
        const selectedMonth = _.get(this.context, 'timeLogsContext.filter.month', currentMonth);
        const selectedYear = _.get(this.context, 'timeLogsContext.filter.year', currentYear);
        const reload = _.get(this.state, 'reload', false);
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Time Logs</span>
                <h4 className='blue_border px-0 pt-2'>My Time Logs</h4>
                <div className='pt-2 border'>
                    <form className='form-group row m-2'>
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Select Type</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className="form-select w-100" value={selectedType} onChange={(e) => this.handleChange(e, 'type')}>
                                        <option value={'monthly'}>Monthly</option>
                                        <option value={'yearly'}>Yearly</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {
                            (selectedType === 'monthly') &&
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
                        }
                        <div className="col-lg-4 col-md-6 p-1">
                            <div className='row'>
                                <div className="col-md-4 col-xs-5 form-label">Select Year</div>
                                <div className="col-md-8 col-xs-7">
                                    <select className="form-select w-100" value={selectedYear} onChange={(e) => this.handleChange(e, 'year')}>
                                        <option value={currentYear}>{currentYear}</option>
                                        <option value={currentYear - 1}>{currentYear - 1}</option>
                                        <option value={currentYear - 2}>{currentYear - 2}</option>
                                        <option value={currentYear - 3}>{currentYear - 3}</option>
                                        <option value={currentYear - 4}>{currentYear - 4}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='border-top p-2 d-flex align-items-center justify-content-end bg-body-tertiary'>
                        <button className='btn btn-primary rounded-0 me-2' onClick={() => this.searchTimeLogs(selectedType)}><FontAwesomeIcon icon={faSearch} /> Search</button>
                        <button className='btn btn-default rounded-0' onClick={this.resetData}><FontAwesomeIcon icon={faRefresh} /> Reset</button>
                    </div>
                </div>
                <div className='pt-2 h-100'>
                    <div className="my-1">
                        <span className="ColorBox me-1 bg-danger"></span>
                        <label>Low Work Log Hours&nbsp;</label> &nbsp;
                        <span className="ColorBox me-1 bg-primary"></span>
                        <label>Over Work Log Hours&nbsp;</label> &nbsp;
                        <label>Shift Time: 09:00 To 18:30&nbsp;</label>
                    </div>
                    {
                        !reload &&
                        this.content
                    }
                    {
                        reload &&
                        <ModualLoader customClass={'h-50'} />
                    }
                </div>
            </div>
        );
    }
}

export default TimeLogs;