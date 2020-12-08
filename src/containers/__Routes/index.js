import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../_PrivateRoute';
import HomePage from '../HomePage';
import CategoryPage from '../CategoryPage';
import InfoPage from '../InfoPage';
import NotFoundPage from '../NotFoundPage';
import PostTwoPage from '../PostTwoPage';
import SearchPage from '../SearchPage';
import OfferPage from '../OfferPage';
import useTracking from '../../utils/useTracking';
// import PublicRoute from '../_PublicRoute';

const selectPage = (pageName, categories, props) => {
    if (pageName === 'Über Uns' || pageName === 'Kontakt') {
        return <InfoPage {...props} name={pageName} />;
    }
    if (pageName === 'Suchportal') {
        return <SearchPage {...props} />;
    }
    return <CategoryPage {...props} name={pageName} categories={categories} />;
};

const Routes = ({ menuData, pages }) => {
    const { menu } = menuData;
    const pagesMenu = pages.pages;
    useTracking(process.env.REACT_APP_UA_TRACK);
    return (
        <Switch>
            <PrivateRoute
                exact
                path="/"
                parentClass="theme-1"
                component={HomePage}
            />
            {menu.map((item) => (
                <PrivateRoute
                    key={item.id}
                    exact
                    path={item.link}
                    parentClass="theme-1"
                    component={(props) =>
                        selectPage(item.linkText, item.categories, props)
                    }
                />
            ))}
            {pagesMenu.map((item) => (
                <PrivateRoute
                    key={item.id}
                    exact
                    path={item.link}
                    parentClass="theme-1"
                    component={(props) => (
                        <InfoPage {...props} name={item.name} />
                    )}
                />
            ))}
            <PrivateRoute
                exact
                path="/article/:id"
                parentClass="theme-1"
                component={PostTwoPage}
            />
            <PrivateRoute
                exact
                path="/offer/:id"
                parentClass="theme-1"
                component={OfferPage}
            />
            <PrivateRoute
                exact
                path="/search"
                parentClass="theme-1"
                component={(props) => <SearchPage {...props} />}
            />
            <Route exact component={NotFoundPage} />
        </Switch>
    );
};
export default Routes;
