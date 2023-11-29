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
            reloadData
        } = this.props;
        return (
            <>
                <div className='workbacklog-nav'>
                    <button className='btn btn-default'><FontAwesomeIcon icon={faPlus} /> New</button>
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
            </>
        );
    }
}

export default ToolBar;