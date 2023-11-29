import './ProjectBackLog.css';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { getProjectBackLog } from '../../services/Project/project.service';
import ProjectFilters from "./children/projectFilter/ProjectFilters";
import Table from './children/table/Table';
import RootContext from "../../context/RootContext/RootContext";
import { projectBackLogTableDefaultContext } from '../../constants/projectBackLogConstants';
import _ from 'lodash';
import { modalDefaultContext } from '../../constants/modalConstants';

const ProjectBackLog = () => {

    const [isListUpdated, setIsListUpdated] = useState(false);
    const rootContext = useContext(RootContext);
    let { setGlobal, projectBackLogListData, handleError } = rootContext;

    useEffect(() => {
        if (!projectBackLogListData) {
            projectBackLogListData = projectBackLogTableDefaultContext;
            setGlobal('projectBackLogListData', projectBackLogListData);
        }
    }, [])

    let { apiData, totalTableEntry } = projectBackLogListData || projectBackLogTableDefaultContext;

    const getListData = async () => {
        let { projectFilter: tempPayload } = projectBackLogListData || projectBackLogTableDefaultContext;
        let payload = tempPayload;
        var tempData = await getProjectBackLog(payload).catch(handleError);
        if (tempData) {
            _.set(projectBackLogListData, 'apiData', tempData);
            _.set(projectBackLogListData, 'totalTableEntry', _.get(tempData, 'totalProjectBacklogs'));
            setGlobal('projectBackLogListData', projectBackLogListData);
            setIsListUpdated(!isListUpdated);
        }
    }

    useEffect(() => {
        getListData();
    }, [])

    return (
        <>
            {/* <RootContext.Provider value={tableProps}> */}
            <div className='project-container py-1 px-3 text-select-none'>
                <div className='pb-2'>
                    Projects <FontAwesomeIcon icon={faAngleRight} />
                    <span className='font-weight-normal'> Product Backlog</span>
                </div>
            </div>
            <ProjectFilters getListData={getListData} />
            {apiData && <div className='px-3'>Total {totalTableEntry ?? 0} Records Found</div>}
            {apiData && <Table getListData={getListData} />}
            {/* </RootContext.Provider> */}
        </>
    );
}

export default ProjectBackLog 