import './Layout.css';
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { useState } from 'react';
import tatvaLogo from '../assets/img/tatvalogo.png';

const Layout = props => {
    const { children } = props;
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const openSideBar = (flag) => {
        setIsSideBarOpen(flag ? true : false);
    };

    const sideBarProps = {
        isSideBarOpen,
        openSideBar
    }

    return (<>
        <Header {...sideBarProps} />
        <div className={'main-container'}>
            <div className={(isSideBarOpen ? 'overlay' : ' ') + ' ' + 'overlay-content'}>
                <SideBar {...sideBarProps} />
            </div>
            <div className={'main-content' + ' ' + (isSideBarOpen ? 'sidebar-open' : 'sidebar-close')}>
                {children}
            </div>
            <div className={'footer border p-2' + ' ' + (isSideBarOpen ? 'open' : 'close')}>
                <img src={tatvaLogo}/> <span className='copyright'>Version : 2.0 | Copyright © TatvaSoft All rights reserved.</span>
            </div>
        </div>
    </>);
}

export default Layout