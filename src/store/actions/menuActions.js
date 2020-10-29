import axios from 'axios';
import {
    FETCH_MENU_REQUEST,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE,
} from '../constants/menuTypes';

const fetchMenuRequest = () => {
    return {
        type: FETCH_MENU_REQUEST,
    };
};

const fetchMenuSuccess = (menu) => {
    return {
        type: FETCH_MENU_SUCCESS,
        payload: menu,
    };
};

const fetchMenuFailure = (error) => {
    return {
        type: FETCH_MENU_FAILURE,
        payload: error,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchMenu = () => {
    return (dispatch) => {
        dispatch(fetchMenuRequest);
        axios
            .get(`${process.env.REACT_APP_CMS_URL}/menus`)
            .then((response) => {
                const menu = response.data;
                dispatch(fetchMenuSuccess(menu));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchMenuFailure(errorMsg));
            });
    };
};

export default fetchMenu;
