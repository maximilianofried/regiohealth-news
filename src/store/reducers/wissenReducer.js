import {
    FETCH_ARTICLES_WISSEN_REQUEST,
    FETCH_ARTICLES_WISSEN_SUCCESS,
    FETCH_ARTICLES_WISSEN_FAILURE,
    FETCH_ARTICLES_WISSEN_CLEAN_UP,
    UPDATE_WISSEN_PAGE_START_PARAM,
} from '../constants/wissenTypes';

const initialState = {
    loading: false,
    articles: [],
    error: '',
    start: 0,
};

const articlesWissenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_WISSEN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ARTICLES_WISSEN_SUCCESS:
            return {
                loading: false,
                articles: [...state.articles, ...action.payload.articles],
                error: '',
                start: state.start,
            };
        case FETCH_ARTICLES_WISSEN_FAILURE:
            return {
                loading: false,
                articles: null,
                error: action.payload,
            };
        case FETCH_ARTICLES_WISSEN_CLEAN_UP:
            return {
                articles: [],
            };
        case UPDATE_WISSEN_PAGE_START_PARAM:
            return {
                ...state,
                start: state.start + 6,
            };
        default:
            return state;
    }
};

export default articlesWissenReducer;
