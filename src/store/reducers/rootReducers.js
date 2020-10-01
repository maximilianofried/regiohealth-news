import {combineReducers} from 'redux'
import metaReducer from './metaReducer';
import articlesReducer from './articlesReducer';
import categoryReducer from './categoryReducer';
import menuReducer from './menuReducer';
import articleReducer from './articleReducer';
import onInitReducer from './onInitReducer';
import adsReducer from './adsReducer';
import pagesReducer from './pagesReducer';

const rootReducer = combineReducers({
    meta: metaReducer,
    articles: articlesReducer,
    article: articleReducer,
    category: categoryReducer,
    menu: menuReducer,
    onInit: onInitReducer,
    ads: adsReducer,
    pages: pagesReducer
});
export default rootReducer