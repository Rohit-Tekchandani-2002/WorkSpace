import './Layout.css';
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { useState } from 'react';

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
        </div>
    </>);
}

export default Layout