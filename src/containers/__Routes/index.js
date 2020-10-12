import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../_PrivateRoute';
import HomePage from '../HomePage';
import BusinessPage from '../BusinessPage';
import AboutUsPage from '../AboutUsPage';
import NotFoundPage from '../NotFoundPage';
import PostTwoPage from '../PostTwoPage';
import SearchPage from '../SearchPage';
// import PublicRoute from '../_PublicRoute';

const Routes = () => {
    return (
        <Switch>
            {/* home one routes */}
            <PrivateRoute
                exact
                path="/"
                parentClass="theme-1"
                component={HomePage}
            />
            <PrivateRoute
                exact
                path="/business"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Business" />
                )}
            />
            <PrivateRoute
                exact
                path="/politics"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Politics" />
                )}
            />
            <PrivateRoute
                exact
                path="/food"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Food" />
                )}
            />
            <PrivateRoute
                exact
                path="/society"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Society" />
                )}
            />
            <PrivateRoute
                exact
                path="/blue-zones"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Blue Zones" />
                )}
            />
            <PrivateRoute
                exact
                path="/ngos"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="NGOs" />
                )}
            />
            <PrivateRoute
                exact
                path="/film"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Film" />
                )}
            />
            <PrivateRoute
                exact
                path="/sustainability"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Sustainability" />
                )}
            />
            <PrivateRoute
                exact
                path="/agriculture"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Agriculture" />
                )}
            />
            <PrivateRoute
                exact
                path="/art"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Art" />
                )}
            />
            <PrivateRoute
                exact
                path="/search"
                parentClass="theme-1"
                component={(props) => <SearchPage {...props} />}
            />
            <PrivateRoute
                exact
                path="/science"
                parentClass="theme-1"
                component={(props) => (
                    <BusinessPage {...props} category="Science" />
                )}
            />
            <PrivateRoute
                exact
                path="/about"
                parentClass="theme-1"
                component={(props) => <AboutUsPage {...props} name="About" />}
            />
            <PrivateRoute
                exact
                path="/advertise"
                parentClass="theme-1"
                component={(props) => (
                    <AboutUsPage {...props} name="Advertise" />
                )}
            />
            <PrivateRoute
                exact
                path="/privacypolicy"
                parentClass="theme-1"
                component={(props) => (
                    <AboutUsPage {...props} name="Privacy and Policy" />
                )}
            />
            <PrivateRoute
                exact
                path="/contact"
                parentClass="theme-1"
                component={(props) => <AboutUsPage {...props} name="Contact" />}
            />
            <PrivateRoute
                exact
                path="/404"
                parentClass="theme-1"
                component={NotFoundPage}
            />
            <PrivateRoute
                exact
                path="/article/:id"
                parentClass="theme-1"
                component={PostTwoPage}
            />
            <Route exact component={NotFoundPage} />
        </Switch>
    );
};
export default Routes;
