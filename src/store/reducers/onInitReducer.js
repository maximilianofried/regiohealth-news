import {
    FETCH_ONINIT_REQUEST,
    FETCH_ONINIT_SUCCESS,
    FETCH_ONINIT_FAILURE
} from "../constants/onInitTypes";

const initialState = {
    loading: false,
    onInit: {},
    error: ''
}

const onInitReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ONINIT_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case FETCH_ONINIT_SUCCESS: 
        return {
            loading: false,
            onInit: action.payload,
            error: ''
        }
        case FETCH_ONINIT_FAILURE: 
        return {
            loading: false,
            onInit: {},
            error: action.payload
        }
        default: return state
    }
}

export default onInitReducer;