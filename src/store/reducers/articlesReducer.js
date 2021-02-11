import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_CITY_SUCCESS,
    FETCH_ARTICLES_HOMEPAGE_SUCCESS,
    FETCH_ARTICLES_CLEAN_UP,
} from '../constants/articlesTypes';

const initialState = {
    loading: false,
    articles: [],
    articlesHomepage: {},
    articlesByCity: [],
    error: '',
    limit: 4,
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: action.payload.articles,
                limit: action.payload.limit,
                error: '',
            };
        case FETCH_ARTICLES_FAILURE:
            return {
                loading: false,
                articles: [],
                error: action.payload,
            };
        case FETCH_ARTICLES_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesByCity: action.payload.articles,
                limit: action.payload.limit,
                error: '',
            };
        case FETCH_ARTICLES_HOMEPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesHomepage: action.payload.articles,
                error: '',
            };
        case FETCH_ARTICLES_CLEAN_UP:
            return {
                articles: [],
            };
        default:
            return state;
    }
};

export default articlesReducer;
