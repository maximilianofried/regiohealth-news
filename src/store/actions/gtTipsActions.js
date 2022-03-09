/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_GTTIPS_REQUEST,
    FETCH_ARTICLES_GTTIPS_SUCCESS,
    FETCH_ARTICLES_GTTIPS_FAILURE,
    FETCH_ARTICLES_GTTIPS_CLEAN_UP,
    UPDATE_GTTIPS_PAGE_START_PARAM,
} from '../constants/gtTipsTypes';

const fetchArticlesGtTipsRequest = () => {
    return {
        type: FETCH_ARTICLES_GTTIPS_REQUEST,
    };
};

const fetchArticlesGtTipsSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_GTTIPS_SUCCESS,
        payload,
    };
};

const fetchArticlesGtTipsFailure = (error) => {
    return {
        type: FETCH_ARTICLES_GTTIPS_FAILURE,
        payload: error,
    };
};

export const fetchArticlesGtTipsCleanUp = () => {
    return {
        type: FETCH_ARTICLES_GTTIPS_CLEAN_UP,
    };
};

export const updateGtTipsPageStartParam = () => {
    return {
        type: UPDATE_GTTIPS_PAGE_START_PARAM,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchArticlesGtTips = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
    menu = 'gesundheitstipps',
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
        dispatch(fetchArticlesGtTipsRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesGtTipsSuccess({
                        articles,
                        limit,
                        start,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesGtTipsFailure(errorMsg));
            });
    };
};
