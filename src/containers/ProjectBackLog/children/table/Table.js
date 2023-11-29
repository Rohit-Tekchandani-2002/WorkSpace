import './Table.css';
import { formatTime } from "../../../../config/utility";
import { projectStatus } from '../../../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { deleteProjectBackLog } from '../../../../services/Project/project.service';
import React, { useContext, useEffect, useState, useRef } from 'react';
import RootContext from '../../../../context/RootContext/RootContext';
import { projectBackLogTableDefaultContext, exportProjectBacklogContext } from '../../../../constants/projectBackLogConstants';
import { modalDefaultContext } from "../../../../constants/modalConstants";
import _ from 'lodash';

const Table = props => {

    const rootContext = useContext(RootContext);
    let { setGlobal, projectBackLogListData, exportProjectBacklog, handleError } = rootContext;
    const exportAllRef = useRef(false);

    useEffect(() => {
        if (!projectBackLogListData) {
            projectBackLogListData = projectBackLogTableDefaultContext;
            setGlobal('projectBackLogListData', projectBackLogListData);
        }
        if (!exportProjectBacklog) {
            exportProjectBacklog = exportProjectBacklogContext;
            setGlobal('exportProjectBacklog', exportProjectBacklog);
        }
    }, [])

    let { projectFilter, apiData, totalTableEntry } = projectBackLogListData || projectBackLogTableDefaultContext;
    let { getListData } = props;
    let { expression, isSortByAsc, pageNumber, pageSize } = projectFilter || projectBackLogTableDefaultContext.projectFilter;
    const navigate = useNavigate();

    const sortTableClass = (sortVar) => {
        let tempClassName = '';
        if (expression !== sortVar) {
            tempClassName += 'sorting';
        }
        else if (expression === sortVar && isSortByAsc) {
            tempClassName += ' sorting_asc';
        } else if (expression === sortVar && !isSortByAsc) {
            tempClassName += ' sorting_desc';
        }
        return tempClassName;
    }

    const sortTable = (sortVar) => {
        console.log('apiData', apiData);
        _.set(projectBackLogListData, 'projectFilter.expression', sortVar);
        _.set(projectBackLogListData, 'projectFilter.isSortByAsc', !isSortByAsc);
        setGlobal('projectBackLogListData', projectBackLogListData);
        getListData();
    }

    const selectProjectStateClass = (statusId) => {
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

    const handelPageSize = (event) => {
        let tempPageSize = _.get(event, 'target.value');
        _.set(projectBackLogListData, 'projectFilter.pageSize', tempPageSize);
        setGlobal('projectBackLogListData', projectBackLogListData);
        getListData();
    }

    const handelPageNumber = (event) => {
        if (totalTableEntry) {
            let tempPageNumber = _.get(event, 'target.value');
            let maxPageNumber = Math.ceil(totalTableEntry / pageSize);
            if (tempPageNumber >= 1 && tempPageNumber <= maxPageNumber) {
                _.set(projectBackLogListData, 'projectFilter.pageNumber', tempPageNumber);
                setGlobal('projectBackLogListData', projectBackLogListData);
                getListData();
            }
        }
    }

    const getPageNumbers = () => {
        let pageNumbers = [];
        if (totalTableEntry) {
            let maxPageNumber = Math.ceil(totalTableEntry / pageSize);
            for (let i = 2; i <= maxPageNumber; i++) {
                pageNumbers = [...pageNumbers, i];
            }
        }
        return pageNumbers;
    }

    const nextPage = () => {
        if (totalTableEntry) {
            let tempPageNumber = pageNumber + 1;
            let maxPageNumber = Math.ceil(totalTableEntry / pageSize);
            if (tempPageNumber >= 1 && tempPageNumber <= maxPageNumber) {
                _.set(projectBackLogListData, 'projectFilter.pageNumber', tempPageNumber);
                setGlobal('projectBackLogListData', projectBackLogListData);
                getListData();
            }
        }
    }

    const previousPage = () => {
        if (totalTableEntry) {
            let tempPageNumber = pageNumber - 1;
            let maxPageNumber = Math.ceil(totalTableEntry / pageSize);
            if (tempPageNumber >= 1 && tempPageNumber <= maxPageNumber) {
                _.set(projectBackLogListData, 'projectFilter.pageNumber', tempPageNumber);
                setGlobal('projectBackLogListData', projectBackLogListData);
                getListData();
            }
        }
    }

    const handelEditProjectBackLog = (id) => {
        navigate('/edit-project-worklog/' + id);
    }

    // Modal
    const [show, setShowModal] = useState(false);
    const [conform, setConform] = useState(false);
    const [deletedId, setdeletedId] = useState('');
    const handleClose = () => setShowModal(false);
    const handleConfirm = () => {
        setConform(true);
        setShowModal(false);
    };
    const handalCancle = () => {
        setConform(false);
        setShowModal(false);
    };

    useEffect(() => {
        let { modalData } = rootContext;
        if (!modalData) {
            modalData = modalDefaultContext;
            setGlobal('modalData', modalData);
        }
        modalData = {
            modalType: 'ConformModal',
            title: 'Conform Delete',
            body: 'Are you sure want to delete?',
            show: show,
            handleClose: handleClose,
            handleConfirm: handleConfirm,
            handalCancle: handalCancle
        };
        setGlobal('modalData', modalData);
    }, [show])

    const handelDeleteProjectBackLog = (id) => {
        setShowModal(true);
        setdeletedId(id);
    }

    useEffect(() => {
        if ((deletedId !== '') && (conform === true)) {
            deleteProjectBackLogData();
        }
    }, [conform, deletedId]);

    var deleteProjectBackLogData = async (deletedId) => {
        var tempData = await deleteProjectBackLog(deletedId).catch(handleError);
        if (tempData) {
            alert(tempData);
            let maxPageNumber = Math.ceil((totalTableEntry - 1) / pageSize);
            console.log(maxPageNumber < pageNumber, maxPageNumber, pageNumber);
            if (maxPageNumber < pageNumber) {
                _.set(projectBackLogListData, 'projectFilter.pageNumber', 1);
                setGlobal('projectBackLogListData', projectBackLogListData);
            }
            getListData();
            setConform(false);
        }
    }

    const handalExportCheckBox = (e) => {
        let chkValue = e.target.value;
        if (!exportProjectBacklog) {
            exportProjectBacklog = exportProjectBacklogContext;
            setGlobal('exportProjectBacklog', exportProjectBacklog);
        }
        if (_.includes(_.get(exportProjectBacklog, 'selectedoptions', []), chkValue)) {
            exportProjectBacklog = {
                isSelectedAll: false,
                selectedoptions: _.filter(_.get(exportProjectBacklog, 'selectedoptions', []), (item) => item !== chkValue)
            };
        } else {
            exportProjectBacklog = {
                ...exportProjectBacklog,
                selectedoptions: [..._.get(exportProjectBacklog, 'selectedoptions', []), chkValue]
            };
        }
        setGlobal('exportProjectBacklog', exportProjectBacklog);
        exportAllRef.current.indeterminate = (_.get(exportProjectBacklog, 'selectedoptions.length', 0) > 0) && !_.get(exportProjectBacklog, 'isSelectedAll', false);
        console.log('exportProjectBacklog', exportProjectBacklog);
    }

    const handalExportCheckBoxSelectAll = (e) => {
        let isChecked = e.target.checked;
        if (!exportProjectBacklog) {
            exportProjectBacklog = exportProjectBacklogContext;
            setGlobal('exportProjectBacklog', exportProjectBacklog);
        }
        if (isChecked) {
            let alloptions = [];
            for (var i = 0; i < totalTableEntry; i++) {
                alloptions = [...alloptions, _.toString(i)];
            }
            exportProjectBacklog = {
                selectedoptions: alloptions,
                isSelectedAll: true
            };
        } else {
            exportProjectBacklog = {
                isSelectedAll: false,
                selectedoptions: []
            };
        }
        setGlobal('exportProjectBacklog', exportProjectBacklog);
    }

    return (
        <div className='mx-3 text-select-none table-overFlow'>
            {
                apiData && _.get(apiData, 'projectBackLogs.length') <= 0 &&
                <p className='border p-2 w-25'>No Records Found</p>
            }
            {
                apiData && _.get(apiData, 'projectBackLogs.length') > 0 &&
                <table className="table table-hover table-bordered" key={_.get(apiData, 'projectBackLogs.projectWorkId')}>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox' className="form-check-input" onChange={handalExportCheckBoxSelectAll} ref={exportAllRef} />
                                <span className='w-auto px-2'>
                                    {
                                        _.get(exportProjectBacklog, 'isSelectedAll', false) ?
                                            'Select All' : _.get(exportProjectBacklog, 'selectedoptions.length', 0) + ' ' + 'Selected'
                                    }
                                </span>
                            </th>
                            <th></th>
                            <th className={sortTableClass('workGroup')} onClick={() => sortTable('workGroup')}>Work Group</th>
                            <th className={sortTableClass('title')} onClick={() => sortTable('title')} >Title</th>
                            <th className={sortTableClass('projectStatus')} onClick={() => sortTable('projectStatus')} >Status</th>
                            <th className={sortTableClass('projectpriority')} onClick={() => sortTable('projectpriority')} >priority</th>
                            <th className={sortTableClass('assignedTo')} onClick={() => sortTable('assignedTo')} >Assigned To</th>
                            <th className={sortTableClass('originalEst')} onClick={() => sortTable('originalEst')} >Original Est</th>
                            <th className={sortTableClass('remainingEst')} onClick={() => sortTable('remainingEst')} >Remaning Est</th>
                            <th className={sortTableClass('totalWorkDone')} onClick={() => sortTable('totalWorkDone')} >Time Spent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiData && (_.get(apiData, 'projectBackLogs.length') > 0) && _.map(_.get(apiData, 'projectBackLogs', {}), (item, index) => (
                            <tr key={index}>
                                <td><input type='checkbox' className="form-check-input" value={index + ((pageNumber - 1) * pageSize)} onChange={handalExportCheckBox} checked={_.includes(_.get(exportProjectBacklog, 'selectedoptions', []), _.toString(index + ((pageNumber - 1) * pageSize)))} /></td>
                                <td><div className={selectProjectStateClass(_.get(item, 'projectStatusId')) + ' project-status-tag'} ></div></td>
                                <td>{_.get(item, 'workGroup')}</td>
                                <td className='w-25'>{_.get(item, 'title')}</td>
                                <td>{projectStatus[_.get(item, 'projectStatusId')]}</td>
                                <td>{_.get(item, 'projectPriority')}</td>
                                <td>{_.get(item, 'assignedTo')}</td>
                                <td>{formatTime(_.get(item, 'originalEst'))} Hrs</td>
                                <td>{formatTime(_.get(item, 'remainingEst'))} Hrs</td>
                                <td>{formatTime(_.get(item, 'totalWorkDone'))} Hrs</td>
                                <td>
                                    <button className="btn btn-primary rounded-0 me-1" onClick={() => handelEditProjectBackLog(_.get(item, 'projectWorkId'))}> <FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn btn-danger rounded-0" onClick={() => handelDeleteProjectBackLog(_.get(item, 'projectWorkId'))}> <FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {
                apiData && _.get(apiData, 'projectBackLogs.length') > 0 &&
                <form>
                    <div className='pagination-component'>
                        <div className='d-flex'>
                            <div className="d-flex me-2">
                                <span className="input-group-text">Page No.</span>
                                <select className="form-select" onChange={handelPageNumber} value={pageNumber}>
                                    <option value={1}>1</option>
                                    {_.map(getPageNumbers(), (item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex">
                                <span className="input-group-text">Page Size</span>
                                <select className="form-select" onChange={handelPageSize} value={pageSize}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <nav className='d-flex align-items-center'>
                                <ul className="pagination m-0">
                                    <li className="page-item">
                                        <span className="page-link no-border-radius normal" onClick={() => previousPage()}>Previous</span>
                                    </li>
                                    <li className="page-item" aria-current="page">
                                        <span className="page-link normal">{pageNumber} of {Math.ceil(totalTableEntry / pageSize)}</span>
                                    </li>
                                    <li className="page-item">
                                        <span className="page-link no-border-radius normal" onClick={() => nextPage()}>Next</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}

export default Table