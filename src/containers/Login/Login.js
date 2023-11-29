import './Login.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/img/login-img1.jpg';
import img2 from '../../assets/img/login-img2.jpg';
import img3 from '../../assets/img/login-img3.jpg';
import WorkSpaceLogo from '../../assets/img/workspace-black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { authLogin } from "../../services/Auth/auth.service";
import { useNavigate } from 'react-router-dom';
import { authUserContext } from "../../constants/authUserConstants";
import AuthContext from "../../context/AuthContext/AuthContext";
import RootContext from '../../context/RootContext/RootContext';
import _ from 'lodash';

const Login = () => {
    const rootContext = useContext(RootContext);
    let {handleError} = rootContext;
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUserNameValid, setUserNameValid] = useState(false);
    const [isFromSubitted, setIsFromSubitted] = useState(false);

    let userNameErrorMessage = (!isUserNameValid && isFromSubitted) ? <span className="text-red">Username is required</span> : null;
    let passwordErrorMessage = (!isPasswordValid && isFromSubitted) ? <span className="text-red">Password is required</span> : null;

    const handelUserNameValidation = (event) => {
        setUserName(event.target.value);
        setUserNameValid(event.target.value.length > 0);
    }

    const handelPasswordValidation = (event) => {
        setPassword(event.target.value);
        setIsPasswordValid(event.target.value.length > 0);
    }

    const authContext = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsFromSubitted(true);
        if (isPasswordValid && isUserNameValid) {
            const payload = {
                userName: userName,
                password: password
            }
            await authLogin(payload).then((data) => {
                if (_.get(data, 'isValid', false)) {
                    let { setGlobal, userData } = authContext;
                    if (!userData) {
                        userData = authUserContext;
                        setGlobal('userData', userData);
                    }
                    if (userName && userName !== '') {
                        userData = { ...authUserContext, userName: userName };
                        localStorage.setItem( 'userName', userName );
                        setGlobal('userData', userData);
                    }
                    navigate('/dashboard');
                }else{
                    handleError(_.get(data, 'error', { message: 'Something Went Wrong', code: 'Error'}));
                }
            });
        } else {
            if (!isUserNameValid) {
                setUserName('');
            }
            if (!isPasswordValid) {
                setPassword('');
            }
        }
    }

    var settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="login-page">
            <div className="loginarea">
                <div className="loginbg1">
                    <div className="login-carousel">
                        <Slider {...settings}>
                            <div>
                                <img src={img1} alt="login Imgage 1" />
                            </div>
                            <div>
                                <img src={img2} alt="login Imgage 2" />
                            </div>
                            <div>
                                <img src={img3} alt="login Imgage 3" />
                            </div>
                        </Slider>
                    </div >
                </div >
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="logincontent">
                            <h1 className="logintitle"><img src={WorkSpaceLogo} alt="" /></h1>

                            <h2 className="logintitle">Login to your account</h2>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon nobg"><FontAwesomeIcon icon={faUserAlt} /></span>
                                    <input className="form-control" onChange={handelUserNameValidation} id="txtUserName" value={userName} placeholder="Username"
                                        type="text" />
                                </div>
                                <span>{userNameErrorMessage}</span>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon nobg">
                                        <FontAwesomeIcon icon={faLock} /></span>
                                    <input className="form-control" onChange={handelPasswordValidation} value={password} placeholder="Password" type="password" />
                                </div>
                                <span>{passwordErrorMessage}</span>
                            </div>
                            <input id="btnSave" value="Login" type="submit" className="btn btn-primary btn-lg theme-btn" />
                        </div>
                    </form>
                    <div>
                        <div className="logincopyright">© TatvaSoft All rights reserved.</div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default Login