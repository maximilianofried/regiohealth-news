import {
    FETCH_OFFER_BY_ID_REQUEST,
    FETCH_OFFER_BY_ID_SUCCESS,
    FETCH_OFFER_BY_ID_FAILURE,
    FETCH_OFFER_CLEAN_UP,
} from '../constants/offerTypes';

const initialState = {
    loading: false,
    offer: null,
    error: '',
};

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OFFER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_OFFER_BY_ID_SUCCESS:
            return {
                loading: false,
                offer: action.payload,
                error: '',
            };
        case FETCH_OFFER_BY_ID_FAILURE:
            return {
                loading: false,
                offer: null,
                error: action.payload,
            };
        case FETCH_OFFER_CLEAN_UP:
            return {
                offer: null,
            };
        default:
            return state;
    }
};

export default offerReducer;
