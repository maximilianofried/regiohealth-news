import {
    FETCH_ARTICLES_NEWS_REQUEST,
    FETCH_ARTICLES_NEWS_SUCCESS,
    FETCH_ARTICLES_NEWS_FAILURE,
    FETCH_ARTICLES_NEWS_CLEAN_UP,
    UPDATE_NEWS_PAGE_START_PARAM,
} from '../constants/newsTypes';

const initialState = {
    loading: false,
    articles: [],
    error: '',
    start: 0,
};

const articlesNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLES_NEWS_SUCCESS:
            return {
                loading: false,
                articles: [...state.articles, ...action.payload.articles],
                error: '',
                start: state.start,
            };
        case FETCH_ARTICLES_NEWS_FAILURE:
            return {
                loading: false,
                article: null,
                error: action.payload,
            };
        case FETCH_ARTICLES_NEWS_CLEAN_UP:
            return {
                articles: [],
            };
        case UPDATE_NEWS_PAGE_START_PARAM:
            return {
                ...state,
                start: state.start + 2,
            };
        default:
            return state;
    }
};

export default articlesNewsReducer;
