import './TeamRooster.css';
import { Component } from "react";
import { getTeamRoosterDetails } from "../../../../services/Project/project.service";
import _ from 'lodash';
import { Table } from 'react-bootstrap';

class TeamRooster extends Component {
    state = { teamRoosterList: [] }

    componentDidMount = () => {
        this.getTeamRoosterDetailsList();
    }

    getTeamRoosterDetailsList = async () => {
        const { handleError } = this.context;
        const projectId = localStorage.getItem('projectId');
        let teamRoosterData = await getTeamRoosterDetails(projectId).catch(handleError);
        if (teamRoosterData) {
            this.setState({ teamRoosterList: teamRoosterData });
        }
    }

    render() {
        return (
            <div className='mt-3'>
                <div className='subtitle'>Team Rooster Detail</div>
                <Table bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Capacity</th>
                            <th>Assigned Work</th>
                            <th>Remaning Work</th>
                            <th> % Complete</th>
                            <th> % Allocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(_.get(this.state, 'teamRoosterList', []), (data, index) => 
                                <tr key={index}>
                                    <td>{_.get(data, 'employeeName', '')}</td>
                                    <td>{_.get(data, 'capacity', 0)}</td>
                                    <td>{_.get(data, 'assignedWork', 0)}</td>
                                    <td>{_.get(data, 'remaningWork', 0)}</td>
                                    <td>{_.get(data, 'presentageComplete', 0)}</td>
                                    <td>{_.get(data, 'presentageAllocation', 0)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                {
                    (_.get(this.state, 'teamRoosterList.length', 0) === 0) &&
                    <div className='border border-top-0 p-2'> No Data Found </div>
                }
            </div>
        );
    }
}

export default TeamRooster;