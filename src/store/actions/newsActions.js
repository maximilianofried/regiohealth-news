/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_NEWS_REQUEST,
    FETCH_ARTICLES_NEWS_SUCCESS,
    FETCH_ARTICLES_NEWS_FAILURE,
    FETCH_ARTICLES_NEWS_CLEAN_UP,
    UPDATE_NEWS_PAGE_START_PARAM,
} from '../constants/newsTypes';

const fetchArticlesNewsRequest = () => {
    return {
        type: FETCH_ARTICLES_NEWS_REQUEST,
    };
};

const fetchArticlesNewsSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_NEWS_SUCCESS,
        payload,
    };
};

const fetchArticlesNewsFailure = (error) => {
    return {
        type: FETCH_ARTICLES_NEWS_FAILURE,
        payload: error,
    };
};

export const fetchArticlesNewsCleanUp = () => {
    return {
        type: FETCH_ARTICLES_NEWS_CLEAN_UP,
    };
};

export const updateNewsPageStartParam = () => {
    return {
        type: UPDATE_NEWS_PAGE_START_PARAM,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchArticlesNews = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
    menu = 'news',
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
        }/contents/published?sort=publishAt%3Adesc&filters[type][$eq]=article${
            categoriesList.length > 0 ? `&${query}` : ''
        }${menu ? `&filters[menu][$eq]=${menu}` : ''}${
            city ? `&filters[city][$eq]=${city}` : ''
        }${start ? `&pagination[start]=${start}` : ''}${
            limit ? `&pagination[limit]=${limit}` : ''
        }`;
        dispatch(fetchArticlesNewsRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesNewsSuccess({
                        articles,
                        limit,
                        start,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesNewsFailure(errorMsg));
            });
    };
};
