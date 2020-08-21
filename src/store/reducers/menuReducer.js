import {
    FETCH_MENU_REQUEST,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE}
from "../constants/menuTypes";

const initialState = {
    loading: false,
    menu: [],
    error: ''
}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MENU_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case FETCH_MENU_SUCCESS: 
        return {
            loading: false,
            menu: action.payload,
            error: ''
        }
        case FETCH_MENU_FAILURE: 
        return {
            loading: false,
            menu: [],
            error: action.payload
        }
        default: return state
    }
}

export default menuReducer;