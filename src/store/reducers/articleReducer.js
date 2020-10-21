import {
    FETCH_ARTICLE_BY_ID_REQUEST,
    FETCH_ARTICLE_BY_ID_SUCCESS,
    FETCH_ARTICLE_BY_ID_FAILURE,
    FETCH_ARTICLE_CLEAN_UP,
} from '../constants/articleTypes';

const initialState = {
    loading: false,
    article: null,
    articles: [],
    error: '',
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLE_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLE_BY_ID_SUCCESS:
            return {
                loading: false,
                article: action.payload,
                error: '',
            };
        case FETCH_ARTICLE_BY_ID_FAILURE:
            return {
                loading: false,
                article: null,
                error: action.payload,
            };
        case FETCH_ARTICLE_CLEAN_UP:
            return {
                article: null,
            };
        default:
            return state;
    }
};

export default articleReducer;
