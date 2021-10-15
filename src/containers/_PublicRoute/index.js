/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Route } from 'react-router-dom';
import FooterArea from '../../components/FooterArea';
import LogoAreaTwo from '../../components/LogoAreaTwo';
import MainMenuTwo from '../../components/MainMenuTwo';

const PublicRoute = (props) => {
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
export default PublicRoute;
