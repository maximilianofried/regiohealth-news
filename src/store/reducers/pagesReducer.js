import {
    FETCH_PAGES_REQUEST,
    FETCH_PAGES_SUCCESS,
    FETCH_PAGES_FAILURE,
} from '../constants/pagesTypes';

const initialState = {
    loading: false,
    pages: [],
    error: '',
};

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PAGES_SUCCESS:
            return {
                loading: false,
                pages: action.payload,
                error: '',
            };
        case FETCH_PAGES_FAILURE:
            return {
                loading: false,
                ads: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default pagesReducer;
