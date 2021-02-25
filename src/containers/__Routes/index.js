import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../_PrivateRoute';
import HomePage from '../HomePage';
import HomePageTwo from '../HomePageTwo';
import CategoryPage from '../CategoryPage';
import InfoPage from '../InfoPage';
import NotFoundPage from '../NotFoundPage';
import PostTwoPage from '../PostTwoPage';
import SearchPage from '../SearchPage';
import OfferPage from '../OfferPage';
import useTracking from '../../utils/useTracking';
import mockMenu from '../../mockdata/menu.json';
import mockPages from '../../mockdata/pages.json';
// import PublicRoute from '../_PublicRoute';

const selectPage = (pageName, categories, props) => {
    if (pageName === 'Über uns' || pageName === 'Kontakt') {
        return <InfoPage {...props} name={pageName} />;
    }
    if (pageName === 'Suchportal') {
        return <SearchPage {...props} />;
    }
    return <CategoryPage {...props} name={pageName} categories={categories} />;
};

const Routes = ({ menuData, pages }) => {
    const menu =
        menuData && menuData.menu.length > 0 ? menuData.menu : mockMenu;
    const pagesMenu = pages && pages.pages ? pages.pages : mockPages;
    useTracking(process.env.REACT_APP_UA_TRACK);
    return (
        <Switch>
            <PrivateRoute
                exact
                path="/home-one"
                parentClass="theme-1"
                component={HomePage}
            />
            <PrivateRoute
                exact
                home_style={2}
                parentClass="theme-3 theme3_bg"
                path="/"
                component={HomePageTwo}
            />
            {menu.map((item) => (
                <PrivateRoute
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
                <PrivateRoute
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
            <PrivateRoute
                exact
                path="/article/:slug"
                home_style={2}
                parentClass="theme-3 theme3_bg"
                component={PostTwoPage}
            />
            <PrivateRoute
                exact
                path="/offer/:slug"
                parentClass="theme-1"
                component={OfferPage}
            />
            <PrivateRoute
                exact
                path="/such-portal"
                home_style={2}
                parentClass="theme-3 theme3_bg"
                component={(props) => <SearchPage {...props} />}
            />
            <Route exact component={NotFoundPage} />
        </Switch>
    );
};
export default Routes;
