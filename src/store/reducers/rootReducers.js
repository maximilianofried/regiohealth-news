import {combineReducers} from 'redux'
import metaReducer from './metaReducer';
import cakeReducer from './cakeReducer';
import articlesReducer from './articlesReducer';
import categoryReducer from './categoryReducer';
import menuReducer from './menuReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
    meta: metaReducer,
    cake: cakeReducer,
    articles: articlesReducer,
    article: articleReducer,
    category: categoryReducer,
    menu: menuReducer
});
export default rootReducer