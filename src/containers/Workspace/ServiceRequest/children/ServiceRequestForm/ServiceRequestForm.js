import { Component } from 'react';
import './ServiceRequestForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowLeft, faGears, faSave } from '@fortawesome/free-solid-svg-icons';
import AlertComponent from '../../../../../components/AlertComponent/AlertComponent';
import _ from 'lodash';
import ModualLoader from '../../../../../components/ModualLoader/ModualLoader';
import RootContext from '../../../../../context/RootContext/RootContext';
import { serviceDefaultContext } from '../../../../../constants/workspaceConstants';
import { getUpdateServiceRequest, serviceRequestDropDown, updateServiceRequest } from '../../../../../services/Workspace/workspace.service';
import { Table } from 'react-bootstrap';
import { formatDate } from '../../../../../config/utility';
import { serviceStatus } from '../../../../../constants/constants';

class ServiceRequestForm extends Component {
    static contextType = RootContext;
    state = { alertMessage: '', refreshModule: false, reload: false, errorMessage: '' }

    componentDidMount = () => {
        this.getUpdateServiceRequest();
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(() => {
                this.getServiceRequestDropDown();
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
        if ((_.get(this.state, 'alertMessage') !== _.get(prevState, 'alertMessage')) && (_.get(this.state, 'alertMessage') !== '')) {
            this.setState({ alertMessage: '' });
        }
        if ((_.get(this.state, 'errorMessage') !== _.get(prevState, 'errorMessage')) && (_.get(this.state, 'errorMessage') !== '')) {
            this.setState({ errorMessage: '' });
        }
    }

    getUpdateServiceRequest = async () => {
        const { handleError, setGlobal } = this.context;
        let serviceContext = _.get(this.state, 'serviceContext', serviceDefaultContext);
        const id = _.get(this.props, 'location.state.id');
        const updateServiceRequestData = await getUpdateServiceRequest(id).catch(handleError);
        if (updateServiceRequestData) {
            console.log('updateServiceRequestData', updateServiceRequestData);
            _.set(serviceContext, 'updateServiceRequestData', updateServiceRequestData);
            _.set(serviceContext, 'updateServiceRequest.serviceRequestId', id);
            _.set(serviceContext, 'updateServiceRequest.serviceGroupId', _.get(updateServiceRequestData[0], 'serviceGroupId', ''));
            _.set(serviceContext, 'updateServiceRequest.categoryId', _.get(updateServiceRequestData[0], 'categoryId', ''));
            _.set(serviceContext, 'updateServiceRequest.subCategoryId', _.get(updateServiceRequestData[0], 'subCategoryId', ''));
            _.set(serviceContext, 'updateServiceRequest.serviceRequestPriority', _.get(updateServiceRequestData[0], 'priority', ''));
            _.set(serviceContext, 'updateServiceRequest.serviceDetails', _.get(updateServiceRequestData[0], 'serviceDetails', ''));
            _.set(serviceContext, 'updateServiceRequest.comments', _.get(updateServiceRequestData[0], 'extraComments', ''));
            setGlobal('serviceContext', serviceContext);
        }
        this.setState({ reload: true });
    }

    validateForm = () => {
        let isFormValid = true;
        const serviceGroupId = _.get(this.context, 'serviceContext.updateServiceRequest.serviceGroupId', '');
        const categoryId = _.get(this.context, 'serviceContext.updateServiceRequest.categoryId', '');
        const subCategoryId = _.get(this.context, 'serviceContext.updateServiceRequest.subCategoryId', '');
        if (!subCategoryId || subCategoryId === '') {
            this.setState({ errorMessage: 'Sub Category feild cannot be empty'});
            isFormValid = false;
        }
        if (!categoryId || categoryId === '') {
            this.setState({ errorMessage: 'Category feild cannot be empty'});
            isFormValid = false;
        }
        if (!serviceGroupId || serviceGroupId === '') {
            this.setState({ errorMessage: 'Service Group feild cannot be empty'});
            isFormValid = false;
        }
        return isFormValid;
    }

    updateServiceRequest = async() => {
        const { handleError } = this.context;
        const isFormValid = this.validateForm();
        const request = _.get(this.context, 'serviceContext.updateServiceRequest', null);
        console.log('request', request);
        if (request && isFormValid) {
            const message = await updateServiceRequest(request).catch(handleError);
            if (message) {
                this.setState({alertMessage: message});
            }
        }
    }

    getServiceRequestDropDown = async () => {
        const { handleError, setGlobal } = this.context;
        let serviceContext = _.get(this.state, 'serviceContext', serviceDefaultContext);
        const serviceGroupId = _.get(serviceContext, 'updateServiceRequest.serviceGroupId');
        const categoryId = _.get(serviceContext, 'updateServiceRequest.categoryId');
        const request = {
            inputServiceGroupId: serviceGroupId ? serviceGroupId : null,
            inputCategoryId: categoryId ? categoryId : null
        }
        const serviceRequestList = await serviceRequestDropDown(request).catch(handleError);
        if (serviceRequestList) {
            console.log('serviceRequestList', serviceRequestList);
            const serviceGroupList = _.get(serviceRequestList, 'serviceGroupList');
            const categoriList = _.get(serviceRequestList, 'categoriList');
            const subCategoriList = _.get(serviceRequestList, 'subCategoriList');
            _.set(serviceContext, 'serviceGroupList', serviceGroupList ? serviceGroupList : []);
            _.set(serviceContext, 'categoriList', categoriList ? categoriList : []);
            _.set(serviceContext, 'subCategoriList', subCategoriList ? subCategoriList : []);
            setGlobal('serviceContext', serviceContext);
        }
        this.setState({ refreshModule: !_.get(this.state, 'refreshModule') });
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        let serviceContext = _.get(this.state, 'serviceContext', serviceDefaultContext);
        let value = _.get(event, 'target.value');
        switch (feild) {
            case 'serviceGroupId':
                _.set(serviceContext, 'updateServiceRequest.serviceGroupId', value);
                break;
            case 'categoryId':
                _.set(serviceContext, 'updateServiceRequest.categoryId', value);
                break;
            case 'subCategoryId':
                _.set(serviceContext, 'updateServiceRequest.subCategoryId', value);
                break;
            case 'serviceRequestPriority':
                _.set(serviceContext, 'updateServiceRequest.serviceRequestPriority', value);
                break;
            case 'serviceDetails':
                _.set(serviceContext, 'updateServiceRequest.serviceDetails', value);
                break;
            case 'comments':
                _.set(serviceContext, 'updateServiceRequest.comments', value);
                break;
            default:
                break;
        }
        setGlobal('serviceContext', serviceContext);
        this.getServiceRequestDropDown();
    }

    gotoServiceRequestPage = () => {
        this.props.history('/service-request');
    }

    render() {
        const reload = _.get(this.state, 'reload');
        const serviceContext = _.get(this.state, 'serviceContext', serviceDefaultContext);
        const {
            serviceGroupList,
            categoriList,
            subCategoriList,
            updateServiceRequestData
        } = serviceContext;
        return (
            <div className='p-2 h-100'>
                <FontAwesomeIcon icon={faGears} /> Projects <FontAwesomeIcon icon={faAngleRight} />
                <span className='font-weight-normal'> Service Request</span>
                <h4 className='blue_border px-0 pt-2'>
                    My Service Request
                </h4>
                <AlertComponent
                    show={_.get(this.state, 'alertMessage') !== ''}
                    alertMessage={_.get(this.state, 'alertMessage')}
                    type={'success'}
                />
                <AlertComponent
                    show={_.get(this.state, 'errorMessage') !== ''}
                    alertMessage={_.get(this.state, 'errorMessage')}
                    type={'danger'}
                />
                {
                    !reload &&
                    <form className='form-group'>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className='sub-title'>Request Details</div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Ticket No.</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={_.get(updateServiceRequestData[0], 'ticket', '')} readOnly disabled />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Requested Date</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={formatDate(_.get(updateServiceRequestData[0], 'requestDate', ''))} readOnly disabled />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Requested Name</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={_.get(updateServiceRequestData[0], 'name', '')} readOnly disabled />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Status</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className="form-control w-100" value={serviceStatus[_.get(updateServiceRequestData[0], 'status', '')]} readOnly disabled />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Service Group</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className='form-select w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.serviceGroupId')}
                                            onChange={(e) => { this.handleChange(e, 'serviceGroupId') }}>
                                            <option value={''}>Select</option>
                                            {
                                                _.map(serviceGroupList, (data, index) => {
                                                    return (
                                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Category</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className='form-select w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.categoryId')}
                                            onChange={(e) => { this.handleChange(e, 'categoryId') }}>
                                            <option value={''}>Select</option>
                                            {
                                                _.map(categoriList, (data, index) => {
                                                    return (
                                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Sub Category</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className='form-select w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.subCategoryId')}
                                            onChange={(e) => { this.handleChange(e, 'subCategoryId') }}>
                                            <option value={''}>Select</option>
                                            {
                                                _.map(subCategoriList, (data, index) => {
                                                    return (
                                                        <option key={index} value={_.get(data, 'key')}>{_.get(data, 'value')}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Priority</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className='form-select w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.serviceRequestPriority')}
                                            onChange={(e) => { this.handleChange(e, 'serviceRequestPriority') }}>
                                            <option value={'Low'}>Low</option>
                                            <option value={'Medium'}>Medium</option>
                                            <option value={'High'}>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Service Details</div>
                                    <div className="col-md-8 col-xs-7">
                                        <textarea
                                            className='form-control w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.serviceDetails', '') ? _.get(serviceContext, 'updateServiceRequest.serviceDetails') : ''}
                                            onChange={(e) => { this.handleChange(e, 'serviceDetails') }} />
                                    </div>
                                </div>
                                <div className='sub-title'>Action Required</div>
                                <div className='row mb-2'>
                                    <div className="col-md-4 col-xs-5 form-label">Extra Comment</div>
                                    <div className="col-md-8 col-xs-7">
                                        <textarea
                                            className='form-control w-100'
                                            value={_.get(serviceContext, 'updateServiceRequest.comments', '') ? _.get(serviceContext, 'updateServiceRequest.comments') : ''}
                                            onChange={(e) => { this.handleChange(e, 'comments') }} />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className="col-md-4 col-xs-5 form-label"></div>
                                    <div className="col-md-8 col-xs-7 px-3 py-1 mb-3">
                                        <button
                                            type='button'
                                            className='btn btn-primary rounded-0 me-2'
                                            onClick={this.updateServiceRequest}>
                                            <FontAwesomeIcon icon={faSave} /> Update
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-default rounded-0'
                                            onClick={this.gotoServiceRequestPage}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 mb-5'>
                                <div className='sub-title'>Request Status History</div>
                                <Table bordered responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status changed date</th>
                                            <th>Status</th>
                                            <th>Comments</th>
                                            <th>Attachment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            _.map(updateServiceRequestData, (data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{_.get(data, 'name')}</td>
                                                        <td>{formatDate(_.get(data, 'pendingAt'))}</td>
                                                        <td>{serviceStatus[_.get(data, 'status')]}</td>
                                                        <td>{_.get(data, 'comments')}</td>
                                                        <td>{_.get(data, 'extraComments')}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </form>
                }
                {
                    reload &&
                    <ModualLoader customClass={'h-50'} />
                }
            </div>
        );
    }
}

export default () => (
    <ServiceRequestForm
        location={useLocation()}
        history={useNavigate()}
    />
);