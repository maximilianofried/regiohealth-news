import { combineReducers } from 'redux';
import metaReducer from './metaReducer';
import articlesReducer from './articlesReducer';
import categoryReducer from './categoryReducer';
import menuReducer from './menuReducer';
import articleReducer from './articleReducer';
import onInitReducer from './onInitReducer';
import adsReducer from './adsReducer';
import pageReducer from './pageReducer';
import pagesReducer from './pagesReducer';
import offersReducer from './offersReducer';
import offerReducer from './offerReducer';
import geoDataReducer from './geoDataReducer';
import nationalDataReducer from './nationalDataReducer';

const rootReducer = combineReducers({
    meta: metaReducer,
    articles: articlesReducer,
    article: articleReducer,
    category: categoryReducer,
    menu: menuReducer,
    onInit: onInitReducer,
    ads: adsReducer,
    page: pageReducer,
    pages: pagesReducer,
    offers: offersReducer,
    offer: offerReducer,
    geoData: geoDataReducer,
    nationalData: nationalDataReducer,
});
export default rootReducer;
