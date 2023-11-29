import './ModualLoader.css';
import Spinner from 'react-bootstrap/Spinner';

const ModualLoader = props => {
    let {customClass} = props;
    return (
        <div className={ customClass + ' ' + 'loader'}>
            <Spinner animation="border" className='m-auto' role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default ModualLoader;