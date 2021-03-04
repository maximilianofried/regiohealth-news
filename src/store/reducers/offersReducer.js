import {
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFERS_FAILURE,
    FETCH_OFFERS_CLEAN_UP,
} from '../constants/offersTypes';

const initialState = {
    loading: false,
    offers: [],
    error: '',
    limit: 4,
};

const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OFFERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_OFFERS_SUCCESS:
            return {
                ...state,
                offers: action.payload.offers,
                limit: action.payload.limit,
                error: '',
            };
        case FETCH_OFFERS_FAILURE:
            return {
                loading: false,
                offers: [],
                error: action.payload,
            };
        case FETCH_OFFERS_CLEAN_UP:
            return {
                ...state,
                offers: [],
            };
        default:
            return state;
    }
};

export default offersReducer;
