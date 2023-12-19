import './WorkGroups.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RootContext from '../../context/RootContext/RootContext';
import { userProjectsContext, workGroupContext } from '../../constants/userProjectsContext';
import { getWorkGroup, getWorkGroupStatusCount, getWorkGroupItemStatusCount } from "../../services/Project/project.service";
import { OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap';
import { formatDate } from '../../config/utility';
import { bgStatus, colorStatus, projectStatus } from '../../constants/constants';

const WorkGroup = () => {
    const navigate = useNavigate();
    const rootcontext = useContext(RootContext);
    let { workGroup, setGlobal, handleError } = rootcontext;
    const projectId = localStorage.getItem('projectId');
    const projectName = localStorage.getItem('projectName');
    const [statusCount, setStatusCount] = useState([]);
    const [workGroupProgressBar, setWorkGroupProgressBar] = useState([]);
    const [isModuleRefersh, setIsModuleRefersh] = useState(false);

    useEffect(() => {
        if (workGroup) {
            let data = _.get(workGroup, 'workGroupList', []);
            setWorkGroupProgressBar([]);
            let progressBarData = workGroupProgressBar;
            _.forEach(data, async (workGroup) => {
                const { workGroupId } = workGroup;
                var tempData = await getWorkGroupItemStatusCount(projectId, workGroupId).catch(handleError);
                const totalStatusCount = _.reduce(tempData, (total, item) => total + item.statusCount, 0);
                const existingObject = _.isObject(_.find(workGroupProgressBar, (item) => item.workGroupId === workGroupId));
                if (!existingObject) {
                    progressBarData.push({
                        workGroupId: workGroupId,
                        progressbar: tempData,
                        totalStatusCount: totalStatusCount,
                    });
                    setWorkGroupProgressBar(progressBarData);
                }
            });
            console.log('workGroupProgressBar', workGroupProgressBar);
        }
        getWorkGroupData();
        getStatusCount();
    }, [projectId]);

    const getWorkGroupData = async () => {
        if (!workGroup) {
            workGroup = workGroupContext;
            setGlobal('workGroup', workGroup);
        }
        let datalist = workGroup;
        var tempData = await getWorkGroup(projectId).catch(handleError);
        if (tempData) {
            _.set(datalist, 'workGroupList', tempData);
            setGlobal('workGroup', datalist);
            setIsModuleRefersh(!isModuleRefersh);
        }
    }

    const getStatusCount = async () => {
        var tempData = await getWorkGroupStatusCount(projectId).catch(handleError);
        if (tempData) {
            setStatusCount(tempData);
        }
    }

    const popover = (header, body) => {
        return (
            <Popover id="popover-basic">
                <Popover.Header as="h3">{header}</Popover.Header>
                <Popover.Body>{body}</Popover.Body>
            </Popover>
        );
    }

    const getProgressBar = (workgroupId) => {
        if (workgroupId) {
            let progressBarList = _.find(workGroupProgressBar, entry => entry.workGroupId == workgroupId);
            let totalStatusCount = _.get(progressBarList, 'totalStatusCount', 1);
            return (
                <>
                    {
                        (_.get(progressBarList, 'progressbar.length', 0) !== 0) &&
                        <ProgressBar className='w-100 rounded-0'>
                            {_.map(_.get(progressBarList, 'progressbar', []), ((progressData, progressIndex) =>
                                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover(projectStatus[_.get(progressData, 'projectStatusId', '')], ((_.get(progressData, 'statusCount', 0) / totalStatusCount) * 100).toFixed(2) + "%")} key={progressIndex}>
                                    <ProgressBar className={bgStatus[_.get(progressData, 'projectStatusId', '')] + ' ' + 'rounded-0'}
                                        style={{ width: (_.get(progressData, 'statusCount', 0) / totalStatusCount) * 100 + "%" }} key={progressIndex} />
                                </OverlayTrigger>
                            ))}
                        </ProgressBar>}
                </>
            );
        } else {
            return null;
        }

    }

    const handalBackButton = () => navigate(-1);

    const gotoWorkGroup = (workGroupId) => {
        localStorage.setItem('workGroupId', workGroupId);
        navigate('/work-backlog');
    }

    return (
        <div className='project-container py-1 px-3 text-select-none'>
            <div className='pb-2'>
                {projectName ?? 'Project'} <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Work Groups</span>
            </div>
            <h4 className='blue_border px-0 pt-2'>Work Groups</h4>
            <div className='d-flex justify-content-end py-2'>
                <button className='btn btn-primary rounded-0' onClick={handalBackButton}>Back</button>
            </div>
            <div className='row'>
                {
                    (_.get(workGroup, 'workGroupList.length', 0) !== 0) &&
                    <div className='col-md-8 p-2'>
                        <div className='border'>
                            <div className='p-2 workGroupHeading'>Active Work Groups</div>
                            <div className='p-2'>
                                {
                                    _.map(_.get(workGroup, 'workGroupList', []), ((data, index) =>
                                        <div className='p-2 workGroupContent' key={index} onClick={() => gotoWorkGroup(_.get(data, 'workGroupId', null))}>
                                            <div>
                                                {_.get(data, 'title', '')}
                                            </div>
                                            <div>
                                                {formatDate(_.get(data, 'startDate', '')) + ' - ' + formatDate(_.get(data, 'endDate', ''))}
                                            </div>
                                            <div className='w-50'>
                                                {getProgressBar(_.get(data, 'workGroupId', null))}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    (_.get(workGroup, 'workGroupList.length', 0) !== 0) &&
                    <div className='col-md-4 p-2'>
                        {
                            _.map(statusCount, ((data, index) =>
                                <div className='p-2 pt-0 row tag-status' key={index}>
                                    <div className={'border col-2' + ' ' + bgStatus[_.get(data, 'projectStatusId', '')]}></div>
                                    <div className='border col-10'>
                                        <div className={'tag-status-count' + ' ' + colorStatus[_.get(data, 'projectStatusId', '')]}>{_.get(data, 'statusCount', 0)}</div>
                                        <div>{projectStatus[_.get(data, 'projectStatusId', 0)]}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    (_.get(workGroup, 'workGroupList.length', 0) === 0) &&
                    <div className='col p-2'>
                        <div className='border'>
                            <div className='p-2 workGroupHeading'>Active Work Groups</div>
                            <div className='p-2'>
                                No Work Group Found
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default WorkGroup