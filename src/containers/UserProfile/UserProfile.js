import { Nav } from 'react-bootstrap';
import './UserProfile.css';
import _ from 'lodash';
import EmployeeDetails from './children/EmployeeDetails/EmployeeDetails';
import { Component } from 'react';
import PersonalDetails from './children/PersonalDetails/PersonalDetails';
import SystemConfiguration from './children/SystemConfiguration/SystemConfiguration';
import AlertComponent from '../../components/AlertComponent/AlertComponent';
import RootContext from '../../context/RootContext/RootContext';
import { employeeInfoDefaultContext } from '../../constants/userInfoDefaultContext';

class UserProfile extends Component {
    static contextType = RootContext;
    state = {
        refreshModule: false,
        alertMessage: ''
    }

    content = <EmployeeDetails alertSuccess={(message) => this.setState({alertMessage: message})} />;

    componentDidMount = () => {
        let { setGlobal, employeeInfoContext } = this.context;
        if (!employeeInfoContext) {
            employeeInfoContext = employeeInfoDefaultContext;
            setGlobal('employeeInfoContext', employeeInfoContext);
        }
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
    }

    handleSelect = (key) => {
        switch (key) {
            case 'employee-details':
                this.content = <EmployeeDetails alertSuccess={(message) => this.setState({alertMessage: message})} />
                break;
            case 'personal-details':
                this.content = <PersonalDetails alertSuccess={(message) => this.setState({alertMessage: message})} />
                break;
            case 'system-configuration':
                this.content = <SystemConfiguration alertSuccess={(message) => this.setState({alertMessage: message})} />
                break;
            default:
                this.content = <EmployeeDetails alertSuccess={(message) => this.setState({alertMessage: message})} />
                break;
        }
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    render() {
        return (
            <div className='p-2'>
                <h4 className='blue_border'>Employee Details</h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                <Nav variant="tabs" defaultActiveKey="employee-details" onSelect={this.handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="employee-details">Employee Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="personal-details">Personal Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="system-configuration">System Configuration</Nav.Link>
                    </Nav.Item>
                </Nav>
                {this.content}
            </div>
        );
    }
}

export default UserProfile;