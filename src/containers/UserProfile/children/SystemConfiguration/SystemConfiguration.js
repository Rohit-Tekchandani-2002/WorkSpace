import { Component } from 'react';
import './SystemConfiguration.css';
import { getSystemConfiguration } from '../../../../services/UserProfile/UserProfile.service';
import RootContext from '../../../../context/RootContext/RootContext';
import { employeeInfoDefaultContext } from '../../../../constants/userInfoDefaultContext';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import { systemType } from '../../../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

class SystemConfiguration extends Component {
    static contextType = RootContext;
    state = { refreshModule: false }

    componentDidMount = () => {
        let { setGlobal, employeeInfoContext } = this.context;
        if (!employeeInfoContext) {
            employeeInfoContext = employeeInfoDefaultContext;
            setGlobal('employeeInfoContext', employeeInfoContext)
        }
        this.getSystemConfigurationData();
    }

    getSystemConfigurationData = async () => {
        const { handleError, setGlobal, employeeInfoContext } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        const tempData = await getSystemConfiguration(employeeId).catch(handleError);
        if (tempData) {
            console.log('systemConfigContext', tempData);
            _.set(employeeInfoContext, 'systemConfigContext', tempData)
            setGlobal('employeeInfoContext', employeeInfoContext);
            this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
        }
    }

    render() {
        const pcOrLaptopNumber = _.get(this.context, 'employeeInfoContext.systemConfigContext.systemSpecifications.pcOrLaptopNumber', 'NILL');
        const pcLocation = _.get(this.context, 'employeeInfoContext.systemConfigContext.systemSpecifications.pcLocation', 'NILL');
        const isPrimaryPC = _.get(this.context, 'employeeInfoContext.systemConfigContext.systemSpecifications.isPrimaryPC', false);
        const systemItems = _.get(this.context, 'employeeInfoContext.systemConfigContext.systemItems', []);
        return (
            <div className='p-2'>
                <div className='system-specifications'>
                    <span className='strong'>PC/Laptop No - </span>
                    <span> {pcOrLaptopNumber} </span>
                    <span className='strong'>PC Location - </span>
                    <span> {pcLocation} </span>
                    <span className='strong'>Is Primary PC - </span>
                    <span> {isPrimaryPC ? 'Yes' : 'No'} </span>
                </div>
                <p className='my-3'>System Configuration Details</p>
                <Table bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Item Type</th>
                            <th>Item Model</th>
                            <th>Quantity</th>
                            <th>Has Taken Item Home</th>
                            <th>Serail Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(systemItems, (data, index) => {
                                const systemTypeKey = _.get(data, 'systemType', '');
                                const systemItemModel = _.get(data, 'systemItemModel', '');
                                const systemQuantity = _.get(data, 'systemQuantity', '');
                                const hasTakenHome = _.get(data, 'hasTakenHome', false);
                                const serailId = _.get(data, 'serailId', '');
                                return (
                                    <tr key={index}>
                                        <td>{systemType[systemTypeKey]}</td>
                                        <td>{systemItemModel}</td>
                                        <td>{systemQuantity}</td>
                                        <td>{hasTakenHome ? 'Yes' : 'No'}</td>
                                        <td><a href='#'><FontAwesomeIcon icon={faHashtag} className='serail-tag'/></a>{serailId}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                {
                    (_.get(systemItems, 'length', 0) === 0) &&
                    <div className='border border-top-0 p-2'>No Data Found</div>
                }
            </div>
        );
    }
}

export default SystemConfiguration;