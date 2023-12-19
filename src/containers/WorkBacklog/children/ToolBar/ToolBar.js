import './ToolBar.css';
import { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDashboard, faFilter, faHistory, faList, faListAlt, faPlus, faRefresh, faTh } from '@fortawesome/free-solid-svg-icons';

class ToolBar extends Component {
    state = {}
    render() {
        const {
            setActiveWindow,
            toggleFilter,
            getActiveWindowClass,
            reloadData,
            activeWindow,
            getGroupByClass,
            setGroupBy
        } = this.props;
        return (
            <>
                <div className='workbacklog-nav'>
                    <button className='btn btn-default' onClick={() => {window.location.href = '/add-project-worklog'}}><FontAwesomeIcon icon={faPlus} /> New</button>
                    <div className='toolbar-container'>
                        {(activeWindow === 'dashboard' || activeWindow === 'listView' || activeWindow === 'boxView') &&
                            <div className='group-by'>
                                <div className='pe-2'>Group by</div>
                                <div className='tool-bar'>
                                    <button className={`btn btn-default ${getGroupByClass('none')}`}
                                        onClick={() => setGroupBy('none')}>
                                        None
                                    </button>
                                    {
                                        (activeWindow === 'listView' || activeWindow === 'boxView') &&
                                        <button className={`btn btn-default ${getGroupByClass('type')}`}
                                            onClick={() => setGroupBy('type')}>
                                            Type
                                        </button>
                                    }
                                    {
                                        (activeWindow === 'listView' || activeWindow === 'boxView') &&
                                        <button className={`btn btn-default ${getGroupByClass('status')}`}
                                            onClick={() => setGroupBy('status')}>
                                            Status
                                        </button>
                                    }
                                    {(activeWindow === 'listView' || activeWindow === 'boxView') &&
                                        <button className={`btn btn-default ${getGroupByClass('priority')}`}
                                            onClick={() => setGroupBy('priority')}>
                                            Priority
                                        </button>
                                    }
                                    <button className={`btn btn-default ${getGroupByClass('assignedTo')}`}
                                        onClick={() => setGroupBy('assignedTo')}>
                                        Assigned To
                                    </button>
                                </div>
                            </div>
                        }
                        <div className='tool-bar'>
                            <Tooltip title="Dashboard">
                                <button className={`btn btn-default ${getActiveWindowClass('dashboard')}`}
                                    onClick={() => setActiveWindow('dashboard')}>
                                    <FontAwesomeIcon icon={faDashboard} />
                                </button>
                            </Tooltip>
                            <Tooltip title="List View">
                                <button className={`btn btn-default ${getActiveWindowClass('listView')}`}
                                    onClick={() => setActiveWindow('listView')}>
                                    <FontAwesomeIcon icon={faList} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Box View">
                                <button className={`btn btn-default ${getActiveWindowClass('boxView')}`}
                                    onClick={() => setActiveWindow('boxView')} >
                                    <FontAwesomeIcon icon={faTh} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Team Rooster Details">
                                <button className={`btn btn-default ${getActiveWindowClass('teamRooster')}`}
                                    onClick={() => setActiveWindow('teamRooster')} >
                                    <FontAwesomeIcon icon={faListAlt} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Activity Stream">
                                <button className={`btn btn-default ${getActiveWindowClass('activityStream')}`}
                                    onClick={() => setActiveWindow('activityStream')} >
                                    <FontAwesomeIcon icon={faHistory} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Work Log">
                                <button className={`btn btn-default ${getActiveWindowClass('workLog')}`}
                                    onClick={() => setActiveWindow('workLog')}>
                                    <FontAwesomeIcon icon={faClock} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Refresh">
                                <button className='btn btn-default' onClick={reloadData}>
                                    <FontAwesomeIcon icon={faRefresh} />
                                </button>
                            </Tooltip>
                            <Tooltip title="Filter">
                                <button className={`btn btn-default ${getActiveWindowClass('filterWindowActive')}`} onClick={toggleFilter}>
                                    <FontAwesomeIcon icon={faFilter} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ToolBar;