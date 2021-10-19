import {
    FETCH_ARTICLES_GTTIPS_REQUEST,
    FETCH_ARTICLES_GTTIPS_SUCCESS,
    FETCH_ARTICLES_GTTIPS_FAILURE,
    FETCH_ARTICLES_GTTIPS_CLEAN_UP,
    UPDATE_GTTIPS_PAGE_START_PARAM,
} from '../constants/gtTipsTypes';

const initialState = {
    loading: false,
    articles: [],
    error: '',
    start: 0,
};

const articlesGtTipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_GTTIPS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLES_GTTIPS_SUCCESS:
            return {
                loading: false,
                articles: [...state.articles, ...action.payload.articles],
                error: '',
                start: state.start,
            };
        case FETCH_ARTICLES_GTTIPS_FAILURE:
            return {
                loading: false,
                article: null,
                error: action.payload,
            };
        case FETCH_ARTICLES_GTTIPS_CLEAN_UP:
            return {
                articles: [],
            };
        case UPDATE_GTTIPS_PAGE_START_PARAM:
            return {
                ...state,
                start: state.start + 2,
            };
        default:
            return state;
    }
};

export default articlesGtTipsReducer;
