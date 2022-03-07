/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_WISSEN_REQUEST,
    FETCH_ARTICLES_WISSEN_SUCCESS,
    FETCH_ARTICLES_WISSEN_FAILURE,
    FETCH_ARTICLES_WISSEN_CLEAN_UP,
    UPDATE_WISSEN_PAGE_START_PARAM,
} from '../constants/wissenTypes';

const fetchArticlesWissenRequest = () => {
    return {
        type: FETCH_ARTICLES_WISSEN_REQUEST,
    };
};

const fetchArticlesWissenSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_WISSEN_SUCCESS,
        payload,
    };
};

const fetchArticlesWissenFailure = (error) => {
    return {
        type: FETCH_ARTICLES_WISSEN_FAILURE,
        payload: error,
    };
};

export const fetchArticlesWissenCleanUp = () => {
    return {
        type: FETCH_ARTICLES_WISSEN_CLEAN_UP,
    };
};

export const updateWissenPageStartParam = () => {
    return {
        type: UPDATE_WISSEN_PAGE_START_PARAM,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchArticlesWissen = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
    menu = 'wissen',
} = {}) => {
    return (dispatch) => {
        let categoriesList = [];
        let query = '';
        categoriesList = categories.map((item) => item.id);
        if (categoriesList.length > 0) {
            query = qs.stringify(
                {
                    _where: { 'categories.id': categoriesList },
                },
                { encode: false, arrayFormat: 'repeat' }
            );
        }
        const url = `${
            process.env.REACT_APP_CMS_URL
        }/contents/published?_sort=publishAt:desc&type=article${
            categoriesList.length > 0 ? `&${query}` : ''
        }${menu ? `&menu=${menu}` : ''}${city ? `&city=${city}` : ''}${
            start ? `&_start=${start}` : ''
        }${limit ? `&_limit=${limit}` : ''}`;
        dispatch(fetchArticlesWissenRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesWissenSuccess({
                        articles,
                        limit,
                        start,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesWissenFailure(errorMsg));
            });
    };
};
