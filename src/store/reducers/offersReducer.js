import {
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFERS_FAILURE,
    FETCH_OFFERS_CLEAN_UP,
    FETCH_OFFERS_FOR_PAGE_REQUEST,
    FETCH_OFFERS_FOR_PAGE_SUCCESS,
    FETCH_OFFERS_FOR_PAGE_FAILURE,
    FETCH_OFFERS_FOR_PAGE_CLEAN_UP,
    UPDATE_OFFERS_PAGE_START_PARAM,
} from '../constants/offersTypes';

const initialState = {
    loading: false,
    offers: [],
    offersForPage: [],
    error: '',
    // limit: 4,
    start: 0,
};

const offersReducer = (state = initialState, action) => {
    console.log(action.type, action.payload);
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
                // limit: action.payload.limit,
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
        case FETCH_OFFERS_FOR_PAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_OFFERS_FOR_PAGE_SUCCESS:
            return {
                ...state,
                offersForPage: [
                    ...state.offersForPage,
                    ...action.payload.offers,
                ],
                // limit: action.payload.limit,
                start: state.start + 6,
                error: '',
            };
        case FETCH_OFFERS_FOR_PAGE_FAILURE:
            return {
                loading: false,
                offersForPage: [],
                error: action.payload,
            };
        case FETCH_OFFERS_FOR_PAGE_CLEAN_UP:
            return {
                ...state,
                offersForPage: [],
            };
        case UPDATE_OFFERS_PAGE_START_PARAM:
            return {
                ...state,
                start: state.start + 6,
            };
        default:
            return state;
    }
};

export default offersReducer;
