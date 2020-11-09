import {
    FETCH_GEO_DATA_REQUEST,
    FETCH_GEO_DATA_SUCCESS,
    FETCH_GEO_DATA_FAILURE,
} from '../constants/geoDataTypes';

const initialState = {
    loading: false,
    geoData: [],
    error: '',
    limit: 4,
};

const geoDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GEO_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GEO_DATA_SUCCESS:
            return {
                ...state,
                geoData: action.payload.geoData,
                limit: action.payload.limit,
                error: '',
            };
        case FETCH_GEO_DATA_FAILURE:
            return {
                loading: false,
                geoData: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default geoDataReducer;
