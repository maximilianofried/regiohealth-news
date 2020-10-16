import axios from 'axios';
import {
    FETCH_PAGES_REQUEST,
    FETCH_PAGES_SUCCESS,
    FETCH_PAGES_FAILURE,
} from '../constants/pagesTypes';

const fetchPagesRequest = () => {
    return {
        type: FETCH_PAGES_REQUEST,
    };
};

const fetchPagesSuccess = (payload) => {
    return {
        type: FETCH_PAGES_SUCCESS,
        payload,
    };
};

const fetchPagesFailure = (error) => {
    return {
        type: FETCH_PAGES_FAILURE,
        payload: error,
    };
};

export const fetchPages = () => {
    return (dispatch) => {
        dispatch(fetchPagesRequest);
        const url = 'https://cms.gesundheitsticket.de/pages';
        axios
            .get(url)
            .then((response) => {
                const pages = response.data;
                dispatch(fetchPagesSuccess(pages));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPagesFailure(errorMsg));
            });
    };
};

export default fetchPages;
