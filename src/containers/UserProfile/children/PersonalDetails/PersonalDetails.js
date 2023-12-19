import { Component } from 'react';
import './PersonalDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getPersonalDetails, getTravelInfo, updatePersonalInfo, createCountryVisaInfo, updateCountryVisaInfo, deleteCountryVisaInfo } from '../../../../services/UserProfile/UserProfile.service';
import RootContext from '../../../../context/RootContext/RootContext';
import { employeeInfoDefaultContext } from '../../../../constants/userInfoDefaultContext';
import _ from 'lodash';
import { adjustDateTime } from '../../../../config/utility';
import { Table } from 'react-bootstrap';

class PersonalDetails extends Component {
    static contextType = RootContext;
    state = {
        referashModule: false
    }

    componentDidMount = () => {
        let { setGlobal, employeeInfoContext } = this.context;
        if (!employeeInfoContext) {
            employeeInfoContext = employeeInfoDefaultContext;
            setGlobal('employeeInfoContext', employeeInfoContext);
        }
        this.getPersonalDetailsData();
        this.getTravelInfoData();
    }

    getPersonalDetailsData = async () => {
        const { setGlobal, handleError } = this.context;
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext', employeeInfoDefaultContext);
        const employeeId = localStorage.getItem('employeeId');
        const tempData = await getPersonalDetails(employeeId).catch(handleError);
        if (tempData) {
            _.set(employeeInfoContext, 'personalInfoContext.personalInfo', tempData);
            setGlobal('employeeInfoContext', employeeInfoContext);
            this.setState({ referashModule: !_.get(this.state, 'referashModule') });
        }
    }

    getTravelInfoData = async () => {
        const { setGlobal, handleError } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        const tempData = await getTravelInfo(employeeId).catch(handleError);
        if (tempData) {
            let employeeInfoContext = _.get(this.context, 'employeeInfoContext', employeeInfoDefaultContext);
            _.set(employeeInfoContext, 'employeeInfoContext.personalInfoContext.travelInfo', tempData);
            setGlobal('employeeInfoContext', employeeInfoContext);
            this.setState({ referashModule: !_.get(this.state, 'referashModule') });
        }
    }

    handleChange = (event, feild) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value', '');
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext', employeeInfoDefaultContext);
        let personalInfo = _.get(employeeInfoContext, 'personalInfoContext.personalInfo');
        switch (feild) {
            case 'dateOfBirth':
                _.set(personalInfo, 'dateOfBirth', value);
                break;
            case 'gender':
                _.set(personalInfo, 'gender', value);
                break;
            case 'maritalStatus':
                _.set(personalInfo, 'maritalStatus', value);
                break;
            case 'bloodGroup':
                _.set(personalInfo, 'bloodGroup', value);
                break;
            case 'anyDiseases':
                _.set(personalInfo, 'anyDiseases', value);
                break;
            case 'contactNumber':
                _.set(personalInfo, 'contactNumber', value);
                break;
            case 'alternateNumber':
                _.set(personalInfo, 'alternateNumber', value);
                break;
            case 'accountNumber':
                _.set(personalInfo, 'accountNumber', value);
                break;
            case 'panCardNumber':
                _.set(personalInfo, 'panCardNumber', value);
                break;
            case 'presentAddress':
                _.set(personalInfo, 'presentAddress', value);
                break;
            case 'permanentAddress':
                _.set(personalInfo, 'permanentAddress', value);
                break;
            case 'providentFundNumber':
                _.set(personalInfo, 'providentFundNumber', value);
                break;
            case 'nsrNumber':
                _.set(personalInfo, 'nsrNumber', value);
                break;
            case 'companyMail':
                _.set(personalInfo, 'companyMail', value);
                break;
            case 'personalMail':
                _.set(personalInfo, 'personalMail', value);
                break;
            case 'messengers':
                _.set(personalInfo, 'messengers', value);
                break;
            case 'passportNumber':
                _.set(personalInfo, 'passportNumber', value);
                break;
            case 'dateOfIssue':
                _.set(personalInfo, 'dateOfIssue', value);
                break;
            case 'placeOfIssue':
                _.set(personalInfo, 'placeOfIssue', value);
                break;
            case 'nameInPassport':
                _.set(personalInfo, 'nameInPassport', value);
                break;
            case 'validUpto':
                _.set(personalInfo, 'validUpto', value);
                break;
            default:
                break;
        }
        _.set(employeeInfoContext, 'personalInfoContext.personalInfo', personalInfo);
        setGlobal('employeeInfoContext', employeeInfoContext);
        this.setState({ referashModule: _.get(this.state, 'referashModule') });
    }

    savePersonalDetails = async () => {
        const { alertSuccess } = this.props;
        const { handleError } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        const personalInfo = _.get(this.context, 'employeeInfoContext.personalInfoContext.personalInfo', _.get(employeeInfoDefaultContext, 'personalInfoContext.personalInfo'));
        const request = {
            employeeId: employeeId,
            ...personalInfo
        }
        let isFormValid = true;
        _.forEach(_.entries(request), ([key, value]) => {
            if (this.isFormInvalid(value, key)) {
                isFormValid = false;
                return;
            }
        })
        if (isFormValid) {
            const message = await updatePersonalInfo(request).catch(handleError);
            if (message) {
                alertSuccess(message);
            }
        }
    }

    addTravelInfo = () => {
        const { setGlobal } = this.context;
        const travelInfo = _.get(this.context, 'personalInfoContext.travelInfo', _.get(employeeInfoDefaultContext, 'travelInfo'));
        const newEntry = {
            countryName: '',
            visaType: '',
            visaValidFor: adjustDateTime(new Date())
        }
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext', employeeInfoDefaultContext);
        _.set(employeeInfoContext, 'personalInfoContext.travelInfo', [...travelInfo, newEntry]);
        setGlobal('employeeInfoContext', employeeInfoContext);
        this.setState({ referashModule: _.get(this.state, 'referashModule') });
    }

    handleTravelInfoChange = (event, feild, index) => {
        const { setGlobal } = this.context;
        const value = _.get(event, 'target.value', '');
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext');
        _.set(employeeInfoContext, `employeeInfoContext.travelInfo[${index}].${feild}`, value);
        setGlobal('employeeInfoContext', employeeInfoContext);
        this.setState({ referashModule: _.get(this.state, 'referashModule') });
    }

    saveTravelInfo = async (travelInfo) => {
        const { alertSuccess } = this.props;
        const { handleError } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        const request = {
            ...travelInfo,
            employeeId: employeeId
        }
        if (!_.get(travelInfo, 'visaId')) {
            let message = await createCountryVisaInfo(request).catch(handleError);
            if (message) {
                alertSuccess(message);
            }
        } else {
            let message = await updateCountryVisaInfo(request).catch(handleError);
            if (message) {
                alertSuccess(message);
            }
        }
    }

    deleteTravelInfo = async (selectedIndex, visaId) => {
        const { setGlobal, handleError } = this.context;
        const { alertSuccess } = this.props;
        let employeeInfoContext = _.get(this.context, 'employeeInfoContext');
        if (visaId) {
            let message = await deleteCountryVisaInfo(visaId).catch(handleError);
            if (message) {
                alertSuccess(message);
                this.getTravelInfoData();
            }
        }
        else {
            _.set(employeeInfoContext, 'personalInfoContext.travelInfo', _.filter(_.get(employeeInfoContext, 'personalInfoContext.travelInfo', []), (data, index) => {
                if (selectedIndex !== index) {
                    return data;
                }
            }))
        }
        setGlobal('employeeInfoContext', employeeInfoContext);
        this.setState({ referashModule: _.get(this.state, 'referashModule') });
    }

    isFormInvalid = (value, feild) => {
        let isInValid = false;
        let length = 0;
        switch (feild) {
            case 'contactNumber':
            case 'alternateNumber':
                length = _.size(_.toString(value));
                if ((length !== 10) && (length !== 0)) {
                    isInValid = true;
                }
                break;
            case 'accountNumber':
            case 'panCardNumber':
                length = _.size(_.toString(value));
                if ((length !== 11) && (length !== 0)) {
                    isInValid = true;
                }
                break;
            case 'companyMail':
            case 'personalMail':
                const emailRegex = /\S+@\S+\.\S+/;
                isInValid = !emailRegex.test(_.toString(value));
                break;
            default:
                break;
        }
        return isInValid;
    }

    render() {
        const personalInfo = _.get(this.context, 'employeeInfoContext.personalInfoContext.personalInfo', _.get(employeeInfoDefaultContext, 'personalInfoContext.personalInfo'));
        const {
            dateOfBirth,
            gender,
            maritalStatus,
            bloodGroup,
            anyDiseases,
            contactNumber,
            alternateNumber,
            accountNumber,
            panCardNumber,
            presentAddress,
            permanentAddress,
            providentFundNumber,
            nsrNumber,
            companyMail,
            personalMail,
            messengers,
            passportNumber,
            dateOfIssue,
            placeOfIssue,
            nameInPassport,
            validUpto
        } = personalInfo;
        const travelInfo = _.get(this.context, 'employeeInfoContext.personalInfoContext.travelInfo', _.get(employeeInfoDefaultContext, 'personalInfoContext.travelInfo'));
        return (
            <>
                <div className='mt-2'>
                    <div className="sub-head">Personal Information</div>
                    <form className='form-group'>
                        <div className='row p-2'>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Date of Birth</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={adjustDateTime(dateOfBirth ? dateOfBirth : new Date())} type='date' onChange={(e) => this.handleChange(e, 'dateOfBirth')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Gender</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className="form-select w-100" value={gender} onChange={(e) => this.handleChange(e, 'gender')}>
                                            <option value={true}>Male</option>
                                            <option value={false}>Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Marital Status</div>
                                    <div className="col-md-8 col-xs-7">
                                        <select className="form-select w-100" value={maritalStatus} onChange={(e) => this.handleChange(e, 'maritalStatus')}>
                                            <option value={false}>Single</option>
                                            <option value={true}>Married</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Blood Group</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={bloodGroup ? bloodGroup : ''} onChange={(e) => this.handleChange(e, 'bloodGroup')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Any Disease</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={anyDiseases ? anyDiseases : ''} onChange={(e) => this.handleChange(e, 'anyDiseases')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Contact Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(contactNumber, 'contactNumber') ? 'is-invalid' : ''}`} value={contactNumber ? contactNumber : ''} onChange={(e) => this.handleChange(e, 'contactNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Alternate Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(alternateNumber, 'alternateNumber') ? 'is-invalid' : ''}`} value={alternateNumber ? alternateNumber : ''} onChange={(e) => this.handleChange(e, 'alternateNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">HDFC A/c No.</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(accountNumber, 'accountNumber') ? 'is-invalid' : ''}`} value={accountNumber ? accountNumber : ''} onChange={(e) => this.handleChange(e, 'accountNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Pan Card Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(panCardNumber, 'panCardNumber') ? 'is-invalid' : ''}`} value={panCardNumber ? panCardNumber : ''} onChange={(e) => this.handleChange(e, 'panCardNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Present Address</div>
                                    <div className="col-md-8 col-xs-7">
                                        <textarea className='form-control w-100' value={presentAddress ? presentAddress : ''} onChange={(e) => this.handleChange(e, 'presentAddress')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Permanent Address</div>
                                    <div className="col-md-8 col-xs-7">
                                        <textarea className='form-control w-100' value={permanentAddress ? permanentAddress : ''} onChange={(e) => this.handleChange(e, 'permanentAddress')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Provident Fund Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={providentFundNumber ? providentFundNumber : 0} onChange={(e) => this.handleChange(e, 'providentFundNumber')} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">NSR Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={nsrNumber ? nsrNumber : 0} onChange={(e) => this.handleChange(e, 'nsrNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">TatvaSoft Email</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(companyMail, 'companyMail') ? 'is-invalid' : ''}`} value={companyMail ? companyMail : ''} onChange={(e) => this.handleChange(e, 'companyMail')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Messengers</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={messengers ? messengers : ''} onChange={(e) => this.handleChange(e, 'messengers')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Personal Email</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className={`form-control w-100 ${this.isFormInvalid(personalMail, 'personalMail') ? 'is-invalid' : ''}`} value={personalMail ? personalMail : ''} onChange={(e) => this.handleChange(e, 'personalMail')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='mt-2'>
                    <div className="sub-head">Passport Details</div>
                    <form className='form-group'>
                        <div className='row p-2'>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Passport Number</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={passportNumber ? passportNumber : ''} onChange={(e) => this.handleChange(e, 'passportNumber')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Date of Issue</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' type='date' value={adjustDateTime(dateOfIssue ? dateOfIssue : new Date())} onChange={(e) => this.handleChange(e, 'dateOfIssue')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Place of Issue</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={placeOfIssue ? placeOfIssue : ''} onChange={(e) => this.handleChange(e, 'placeOfIssue')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Name in Passport</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' value={nameInPassport ? nameInPassport : ''} onChange={(e) => this.handleChange(e, 'nameInPassport')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 p-1">
                                <div className='row'>
                                    <div className="col-md-4 col-xs-5 form-label">Valid Upto</div>
                                    <div className="col-md-8 col-xs-7">
                                        <input className='form-control w-100' type='date' value={adjustDateTime(validUpto ? validUpto : new Date())} onChange={(e) => this.handleChange(e, 'validUpto')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='mt-2'>
                    <div className='flex-between'>
                        <div className="sub-head w-100 m-0">
                            Countries Travelled
                        </div>
                        <button className='btn btn-primary m-0 rounded-0' onClick={this.addTravelInfo}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    {
                        (_.get(travelInfo, 'length', 0) !== 0) &&
                        <Table className='mt-2' bordered responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Country Name</th>
                                    <th>Visa Type</th>
                                    <th>Visa Valid For</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(travelInfo, (data, index) => {
                                        return (
                                            <tr className='from-group' key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <input className={`form-control ${(_.get(data, 'countryName', '') === '') ? 'is-invalid' : ''}`} value={_.get(data, 'countryName')} onChange={(e) => this.handleTravelInfoChange(e, 'countryName', index)} />
                                                </td>
                                                <td>
                                                    <input className={`form-control ${(_.get(data, 'visaType', '') === '') ? 'is-invalid' : ''}`} value={_.get(data, 'visaType')} onChange={(e) => this.handleTravelInfoChange(e, 'visaType', index)} />
                                                </td>
                                                <td>
                                                    <input className={`form-control ${(_.get(data, 'visaValidFor', '') === '') ? 'is-invalid' : ''}`} type='date' value={adjustDateTime(_.get(data, 'visaValidFor'))} onChange={(e) => this.handleTravelInfoChange(e, 'visaValidFor', index)} />
                                                </td>
                                                <td>
                                                    <button className='btn btn-primary rounded-0 me-2' onClick={() => this.deleteTravelInfo(index, _.get(data, 'visaId'))}><FontAwesomeIcon icon={faTrash} /></button>
                                                    {
                                                        (!_.includes(data, '')) &&
                                                        <button className='btn btn-primary rounded-0' onClick={() => this.saveTravelInfo(data)}><FontAwesomeIcon icon={faSave} /></button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                    {
                        (_.get(travelInfo, 'length', 0) === 0) &&
                        <div className="alert alert-danger mt-3">
                            No Data Available
                        </div>
                    }
                </div>
                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn btn-primary m-0 rounded-0' onClick={this.savePersonalDetails}><FontAwesomeIcon icon={faSave} /> Save</button>
                </div>
            </>
        );
    }
}

export default PersonalDetails;