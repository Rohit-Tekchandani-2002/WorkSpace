import { Alert } from 'react-bootstrap';
import './AlertPopUp.css';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import RootContext from '../../context/RootContext/RootContext';
import { alertPopUpDefaultContext } from '../../constants/alertPopupDefaultContext';

class AlertPopUp extends Component {
    static contextType = RootContext;
    state = { showAlert: false }
    alertMessage = '';
    componentDidMount = () => {
        const { setGlobal } = this.context;
        let alertPopUpContext = _.get(this.context, 'alertPopUpContext');
        let { show, alertString } = alertPopUpContext || alertPopUpDefaultContext;
        if (!alertPopUpContext) {
            alertPopUpContext = alertPopUpDefaultContext;
            setGlobal('alertPopUpContext', alertPopUpContext);
        }
        //Auto close Alert PopUp
        if (show === true) {
            this.alertMessage = alertString;
            this.setState({ showAlert: true });
            setTimeout(() => {
                _.set(alertPopUpContext, 'show', false);
                _.set(alertPopUpContext, 'alertString', '');
                setGlobal('alertPopUpContext', alertPopUpContext);
                this.setState({ showAlert: false });
            }, 3000);
            clearTimeout();
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        // if(this.props !== prevProps){
        //     console.log('this.props', this.props, prevProps);
        // }
        // if(this.state !== prevState){
        //     console.log('this.state',this.state, prevState);
        // }
    }
    
    render() {
        const alertCloseClass = _.get(this.state, 'showAlert') ? 'alert-open' : 'alert-close';
        return (
            <div className={`alert-div ${alertCloseClass}`}>
                <Alert className='d-flex alert justify-content-between align-items-center'>
                    <span>{this.alertMessage}</span> <FontAwesomeIcon icon={faClose} onClick={() => this.setState({ showAlert: false })} />
                </Alert>
            </div>
        );
    }
}

export default AlertPopUp;
