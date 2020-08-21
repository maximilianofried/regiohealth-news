import {combineReducers} from 'redux'
import metaReducer from './metaReducer';
import cakeReducer from './cakeReducer';
import articleReducer from './articleReducer';
import categoryReducer from './categoryReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
    meta: metaReducer,
    cake: cakeReducer,
    article: articleReducer,
    category: categoryReducer,
    menu: menuReducer
});
export default rootReducer