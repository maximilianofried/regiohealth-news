/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import LogoArea from '../../components/LogoArea';
import MainMenu from '../../components/MainMenu';
import FooterArea from '../../components/FooterArea';
import TopBarTwo from '../../components/TopBarTwo';
import LogoAreaTwo from '../../components/LogoAreaTwo';
import MainMenuTwo from '../../components/MainMenuTwo';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        <div className={props.parentClass}>
            <div className="border_black" />
            <LogoAreaTwo />
            <MainMenuTwo />

            <Route {...rest} render={(props) => <Component {...props} />} />
            <FooterArea />
        </div>
    );
};
export default PrivateRoute;
