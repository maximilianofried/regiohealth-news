import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = (props) => {
    const redirect = null;
    return (
        <Route
            {...props}
            render={(props) =>
                !redirect ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirect} />
                )
            }
        />
    );
};

export default PublicRoute;
