import {
    FETCH_NATIONAL_DATA_REQUEST,
    FETCH_NATIONAL_DATA_SUCCESS,
    FETCH_NATIONAL_DATA_FAILURE,
    FETCH_NATIONAL_DATA_CLEAN_UP,
} from '../constants/nationalDataTypes';

const initialState = {
    loading: false,
    nationalData: [],
    error: '',
    limit: 4,
};

const nationalDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NATIONAL_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_NATIONAL_DATA_SUCCESS:
            return {
                ...state,
                nationalData: action.payload.geoData,
                limit: action.payload.limit,
                error: '',
            };
        case FETCH_NATIONAL_DATA_FAILURE:
            return {
                loading: false,
                nationalData: [],
                error: action.payload,
            };
        case FETCH_NATIONAL_DATA_CLEAN_UP:
            return {
                nationalData: [],
            };
        default:
            return state;
    }
};

export default nationalDataReducer;
