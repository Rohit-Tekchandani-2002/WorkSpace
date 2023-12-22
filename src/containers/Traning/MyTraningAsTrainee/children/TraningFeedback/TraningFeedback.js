import { Component } from 'react';
import './TraningFeedback.css';
import RootContext from '../../../../../context/RootContext/RootContext';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranineeTraningFeedBack } from '../../../../../services/Traning/traning.service';

class TraningFeedback extends Component {
    static contextType = RootContext;
    state = { alertMessage: '', reload: false, formData: {} }

    componentDidMount = () => {
        this.setState({ reload: true });
    }

    componentDidUpdate = (_prevProps, prevState) => {
        if ((_.get(this.state, 'reload') !== _.get(prevState, 'reload')) && (_.get(this.state, 'reload') === true)) {
            setTimeout(async () => {
                const { type, id } = _.get(this.props, 'location.state');
                if (id) {
                    await this.traningFeedbackData(id);
                }
                this.setState({ reload: false });
            }, 500);
            clearTimeout();
        }
    }

    traningFeedbackData = async (id) => {
        const { handleError } = this.context;
        const employeeId = localStorage.getItem('employeeId');
        console.log('id', id);
        const traningFeedBack = await getTranineeTraningFeedBack(employeeId, id).catch(handleError);
        if (traningFeedBack) {
            const formData = _.get(this.state, 'formData');
            this.setState({ formData: { ...formData, ...traningFeedBack } });
            console.log('traningFeedBack', traningFeedBack);
        }
    }

    render() {
        const { id } = _.get(this.props, 'location.state');
        return (
            <>
                {
                    id &&
                    <div>

                    </div>
                }
                {
                    !id &&
                    <div className="alert alert-danger mt-3">No Data Available</div>
                }
            </>
        );
    }
}


export default () => (
    <TraningFeedback
        location={useLocation()}
        history={useNavigate()}
    />
);