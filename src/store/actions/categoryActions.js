import axios from 'axios';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
} from '../constants/categoryTypes';

const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST,
    };
};

const fetchCategoriesSuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories,
    };
};

const fetchCategoriesFailure = (error) => {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        payload: error,
    };
};

// action creator, return function not object, not pure function ,async api calls
const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest);
        axios
            .get(`${process.env.REACT_APP_CMS_URL}/categories`)
            .then((response) => {
                const categories = response.data;
                dispatch(fetchCategoriesSuccess(categories));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchCategoriesFailure(errorMsg));
            });
    };
};

export default fetchCategories;
