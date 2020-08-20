import {combineReducers} from 'redux'
import metaReducer from './metaReducer';
import cakeReducer from './cakeReducer';
import articleReducer from './articleReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
    meta: metaReducer,
    cake: cakeReducer,
    article: articleReducer,
    category: categoryReducer
});
export default rootReducer