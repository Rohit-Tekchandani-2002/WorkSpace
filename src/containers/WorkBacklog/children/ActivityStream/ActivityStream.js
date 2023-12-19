import './ActivityStream.css';
import { Component } from "react";
import { getActivityStream } from "../../../../services/Project/project.service";
import _ from 'lodash';
import AuthContext from '../../../../context/AuthContext/AuthContext';
import { formatDate, formatTime } from '../../../../config/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import { projectStatus } from '../../../../constants/constants';
import taskImg from '../../../../assets/img/task.png';

class ActivityStream extends Component {
    state = { numberOfClick: 0, activityStream: [] }

    componentDidMount = () => {
        this.getActivityStreamData();
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'numberOfClick') !== _.get(prevState, 'numberOfClick'))) {
            this.getActivityStreamData();
        }
    }

    getActivityStreamData = async () => {
        const { handleError } = this.context;
        let request = {
            employeeId: localStorage.getItem('employeeId'),
            numberOfClicks: _.get(this.state, 'numberOfClick', 0)
        }
        let tempData = await getActivityStream(request).catch(handleError);
        if (tempData) {
            let activityStreamData = _.get(this.state, 'activityStream', []);
            if (!_.isEqual(activityStreamData, tempData)) {
                this.setState({ activityStream: [...activityStreamData, ...tempData] });
            } else {
                this.setState({ activityStream: tempData });
            }
        }
    }

    render() {
        let titleDate = null;
        return (
            <AuthContext.Consumer>
                {
                    authContext => {
                        const filePathChar = _.lowerCase(_.get(authContext, 'userData.firstName[0]'));
                        const activityStream = _.get(this.state, 'activityStream', []);
                        return (
                            <div>
                                {
                                    _.map(activityStream, (item, itemIndex) => {
                                        let content = null;
                                        if (titleDate !== formatDate(_.get(item, 'titleDate'))) {
                                            content = (
                                                <div key={itemIndex}>
                                                    <div className='title-date'>
                                                        {formatDate(_.get(item, 'titleDate'))}
                                                    </div>
                                                    <div className='activity-container'>
                                                        <img src={`/alpha/${filePathChar}.jpg`} className='user-char-img' alt='user-char-img' />
                                                        <div className='activties'>
                                                            {
                                                                _.map(activityStream, (data, index) => {
                                                                    let field = _.get(data, 'field', null);
                                                                    if ((_.get(item, 'titleDate')) === _.get(data, 'titleDate')) {
                                                                        if (field === 'Remaining Time') {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <div>
                                                                                        {_.get(data, 'employeeName', '')} added work log of {formatTime(_.get(data, 'oldValue'))}hrs for
                                                                                        <a href='/'><img className='imgPadding px-1' src={taskImg}/>TA{_.get(data, 'projectWorkId', '')}: {_.get(data, 'title', '')}</a>
                                                                                        <span className='media-heading'><FontAwesomeIcon icon={faClock} />{moment(data.updateAt).format('HH:mm')}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (field === 'Work Flow Step') {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <div>{data.employeeName} changed work flow step to {projectStatus[data.newValue]} for
                                                                                    <a href='/'><img className='imgPadding px-1' src={taskImg}/>TA{_.get(data, 'projectWorkId', '')}: {_.get(data, 'title', '')}</a></div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        titleDate = formatDate(_.get(item, 'titleDate'));
                                        return content;
                                    })
                                }
                                <button className='show-more-btn' onClick={() => this.setState({ numberOfClick: _.toNumber(_.get(this.state, 'numberOfClick')) + 1 })}>Show More</button>
                            </div>
                        );
                    }
                }
            </AuthContext.Consumer>
        );
    }
}

export default ActivityStream;