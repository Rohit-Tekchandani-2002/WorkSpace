import { Alert } from 'react-bootstrap';
import './AlertComponent.css';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

class AlertComponent extends Component {
    state = { showAlert: false }
    alertMessage = '';
    componentDidUpdate = (prevProps, _prevState) => {
        if ((_.get(this.props, 'show') !== _.get(prevProps, 'show'))) {
            //Auto close Alert PopUp
            if (this.props.show === true) {
                this.setState({ showAlert: true });
                this.alertMessage = this.props.alertMessage;
                setTimeout(() => {
                    this.setState({ showAlert: false });
                }, 3000);
                clearTimeout();
            }
        }
    }
    render() {
        const alertCloseClass = _.get(this.state, 'showAlert') ? 'alert-open' : 'alert-close';
        return (
            <div className={`alert-div ${alertCloseClass}`}>
                <Alert variant={this.props.type} className='d-flex alert justify-content-between align-items-center'>
                    <span>{this.alertMessage}</span> <FontAwesomeIcon icon={faClose} onClick={() => this.setState({ showAlert: false })} />
                </Alert>
            </div>
        );
    }
}

export default AlertComponent;
