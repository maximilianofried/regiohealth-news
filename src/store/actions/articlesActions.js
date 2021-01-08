import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_CITY_SUCCESS,
    FETCH_ARTICLES_CLEAN_UP,
} from '../constants/articlesTypes';

const fetchArticlesRequest = () => {
    return {
        type: FETCH_ARTICLES_REQUEST,
    };
};

const fetchArticlesSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload,
    };
};

const fetchArticlesFailure = (error) => {
    return {
        type: FETCH_ARTICLES_FAILURE,
        payload: error,
    };
};

const fetchArticlesByCitySuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_CITY_SUCCESS,
        payload,
    };
};

export const fetchArticlesCleanUp = () => {
    return {
        type: FETCH_ARTICLES_CLEAN_UP,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchArticles = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
} = {}) => {
    return (dispatch) => {
        let categoriesList = [];
        categoriesList = categories.map((item) => item.id);
        const query = qs.stringify(
            {
                _where: { 'categories.id': categoriesList },
            },
            { encode: false, arrayFormat: 'repeat' }
        );
        const url = `${
            process.env.REACT_APP_CMS_URL
        }/articles/published?_sort=publishAt:desc${
            categories ? `&${query}` : ''
        }${city ? `&city=${city}` : ''}${start ? `&_start=${start}` : ''}${
            limit ? `&_limit=${limit}` : ''
        }`;
        dispatch(fetchArticlesRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesSuccess({
                        articles,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};

export const fetchArticlesCity = ({
    limit = undefined,
    start = undefined,
    place = { lat: 52.56, lng: 13.14 },
    radius = 200001,
}) => {
    const { lat, lng } = place;
    return (dispatch) => {
        const url = `${process.env.REACT_APP_CMS_URL}/geodata?lat=${lat}&lng=${lng}&radius=${radius}&type=article&start=${start}&limit=${limit}`;
        dispatch(fetchArticlesRequest);
        axios
            .get(url)
            .then((response) => {
                const { articles } = response.data;
                dispatch(
                    fetchArticlesByCitySuccess({
                        articles,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};
