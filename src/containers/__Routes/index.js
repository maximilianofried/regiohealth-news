import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from '../_PublicRoute';
import HomePage from '../HomePage';
import CategoryPage from '../CategoryPage';
import InfoPage from '../InfoPage';
import NotFoundPage from '../NotFoundPage';
import ArticlePage from '../ArticlePage';
import SearchPage from '../SearchPage';
import OfferPage from '../OfferPage';
import OffersPage from '../OffersPage';
import useTracking from '../../utils/useTracking';
import mockMenu from '../../mockdata/menu.json';
import mockPages from '../../mockdata/pages.json';
import CookieDeclarationPage from '../CookieDeclarationPage';

const selectPage = (pageName, categories, props) => {
    if (pageName === 'Suchportal') {
        return <SearchPage {...props} />;
    }
    if (pageName === 'angebote') {
        return (
            <OffersPage
                {...props}
                menuName={pageName}
                categories={categories}
            />
        );
    }
    return (
        <CategoryPage {...props} menuName={pageName} categories={categories} />
    );
};

const Routes = () => {
    useTracking(process.env.REACT_APP_UA_TRACK);
    return (
        <Switch>
            <PublicRoute
                exact
                home_style={2}
                parentClass="theme-3 theme3_bg"
                path="/"
                component={HomePage}
            />
            {mockMenu.map((item) => (
                <PublicRoute
                    key={item.id}
                    exact
                    path={item.link}
                    home_style={2}
                    parentClass="theme-3 theme3_bg"
                    component={(props) =>
                        selectPage(item.linkText, item.categories, props)
                    }
                />
            ))}
            {mockPages.map((item) => (
                <PublicRoute
                    key={item.id}
                    exact
                    path={item.link}
                    home_style={2}
                    parentClass="theme-3 theme3_bg"
                    component={(props) => (
                        <InfoPage {...props} name={item.name} />
                    )}
                />
            ))}
            <PublicRoute
                exact
                path="/article/:slug"
                home_style={2}
                parentClass="theme-3 theme3_bg"
                component={ArticlePage}
            />
            <PublicRoute
                exact
                path="/offer/:slug"
                home_style={2}
                parentClass="theme-3 theme3_bg"
                component={OfferPage}
            />
            <PublicRoute
                exact
                path="/such-portal"
                home_style={2}
                parentClass="theme-3 theme3_bg"
                component={(props) => <SearchPage {...props} />}
            />
            <PublicRoute
                exact
                path="/cookie-declaration"
                parentClass="theme-3 theme3_bg"
                component={CookieDeclarationPage}
            />
            <Route exact component={NotFoundPage} />
        </Switch>
    );
};
export default Routes;
