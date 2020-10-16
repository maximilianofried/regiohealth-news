import axios from 'axios';
import {
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    FETCH_PAGE_FAILURE,
} from '../constants/pageTypes';

const fetchPageRequest = () => {
    return {
        type: FETCH_PAGE_REQUEST,
    };
};

const fetchPageSuccess = (payload) => {
    return {
        type: FETCH_PAGE_SUCCESS,
        payload,
    };
};

const fetchPageFailure = (error) => {
    return {
        type: FETCH_PAGE_FAILURE,
        payload: error,
    };
};

export const fetchPage = ({ name = undefined } = {}) => {
    return (dispatch) => {
        dispatch(fetchPageRequest);
        const url = `https://cms.gesundheitsticket.de/pages${
            name ? `?name=${name}` : ''
        }`;
        axios
            .get(url)
            .then((response) => {
                const pages = response.data;
                dispatch(fetchPageSuccess(pages));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchPageFailure(errorMsg));
            });
    };
};

export default fetchPage;
