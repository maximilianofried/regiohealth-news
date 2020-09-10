import axios from 'axios';
import {
    FETCH_MENU_REQUEST,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from "../constants/menuTypes";

const fetchMenuRequest = () => {
    return {
        type: FETCH_MENU_REQUEST
    }
}

const fetchMenuSuccess = menu => {
    return {
        type: FETCH_MENU_SUCCESS,
        payload: menu
    }
}


const fetchMenuFailure = error => {
    return {
        type: FETCH_MENU_FAILURE,
        payload: error
    }
}

// action creator, return function not object, not pure function ,async api calls
export const fetchMenu = () => {
    return (dispatch) => {
        dispatch(fetchMenuRequest);
        axios.get('https://cms.gesundheitsticket.de/menus')
            .then(response => {
                //separar en categorias y guardar en objeto los array correspondientes
                const menu = response.data;
                dispatch(fetchMenuSuccess(menu))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchMenuFailure(errorMsg));
            })
    }
}