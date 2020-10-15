import React from 'react';
import { Route } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import LogoArea from '../../components/LogoArea';
import MainMenu from '../../components/MainMenu';
import FooterArea from '../../components/FooterArea';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        // eslint-disable-next-line react/destructuring-assignment
        <div className={props.parentClass}>
            <>
                <LogoArea className="white_bg" />
                <div className="border_black" />
                <MainMenu />
                <div className="border_black" />
                <div className="space-15" />
                <TopBar className="white_bg" />
                <div className="space-15" />
                <div className="border_black" />
            </>

            <Route {...rest} render={(props) => <Component {...props} />} />

            <FooterArea className="primay_bg" />
        </div>
    );
};
export default PrivateRoute;
