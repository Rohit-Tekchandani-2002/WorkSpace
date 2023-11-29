import { Component } from 'react';
import './ListView.css';
import RootContext from '../../../../context/RootContext/RootContext';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import { workBacklogDefaultContext } from '../../../../constants/workBackLogConstants';
import { formatDate, formatTime } from '../../../../config/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { projectStatus } from '../../../../constants/constants';

class ListView extends Component {
    static contextType = RootContext;
    state = {}

    componentDidMount = () => {
        const { setGlobal } = this.context;
        let workBacklog = _.get(this.context, 'workBacklog');
        if (!workBacklog) {
            workBacklog = workBacklogDefaultContext;
            setGlobal('workBacklog', workBacklog);
        }
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

    render() {
        const workLog = _.get(this.context, 'workBacklog.workLog', {});
        const tableLength = _.get(workLog, 'length', 0);
        const { addWorkLogtime } = this.props;
        return (
            <div className='mt-2'>
                <Table bordered responsive hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Assigned To</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Orignal Est</th>
                            <th>Remaning Est</th>
                            <th>Time Spent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (tableLength === 0) ?
                                <tr className='border'>
                                    No Data Found
                                </tr> :
                                _.map(workLog, (data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><div className={`${this.selectProjectStateClass(_.get(data, 'projectStatusId'))}  project-status-tag`} ></div></td>
                                            <td>{_.get(data, 'title')}</td>
                                            <td>{projectStatus[_.get(data, 'projectStatusId')]}</td>
                                            <td>{_.get(data, 'workPriority')}</td>
                                            <td>{(_.trim(_.get(data, 'assignedTo')) === '') ? 'Unassigned' : _.get(data, 'assignedTo')}</td>
                                            <td><span className='smallWidth'>{formatDate(_.get(data, 'endDate'))}</span></td>
                                            <td><span className='smallWidth'>{formatDate(_.get(data, 'startDate'))}</span></td>
                                            <td>{formatTime(_.get(data, 'originalEstTime'))} Hrs</td>
                                            <td>{formatTime(_.get(data, 'remainingEstTime'))} Hrs</td>
                                            <td>{formatTime(_.get(data, 'totalWorkDone'))} Hrs</td>
                                            <td className='text-center'><FontAwesomeIcon icon={faClock} onClick={() => addWorkLogtime(data)} /></td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </Table>
                {
                    (tableLength !== 0) &&
                    <div className='t-footer'>
                        Showing 1 to {tableLength} of {tableLength} entries
                    </div>
                }
            </div>
        );
    }
}

export default ListView;