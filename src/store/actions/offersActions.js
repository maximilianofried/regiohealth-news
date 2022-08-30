import axios from 'axios';
import qs from 'qs';
import {
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFERS_FAILURE,
    FETCH_OFFERS_CLEAN_UP,
    FETCH_OFFERS_FOR_PAGE_REQUEST,
    FETCH_OFFERS_FOR_PAGE_SUCCESS,
    FETCH_OFFERS_FOR_PAGE_FAILURE,
    FETCH_OFFERS_FOR_PAGE_CLEAN_UP,
    UPDATE_OFFERS_PAGE_START_PARAM,
} from '../constants/offersTypes';

const fetchOffersRequest = () => {
    return {
        type: FETCH_OFFERS_REQUEST,
    };
};

const fetchOffersSuccess = (payload) => {
    return {
        type: FETCH_OFFERS_SUCCESS,
        payload,
    };
};

const fetchOffersFailure = (error) => {
    return {
        type: FETCH_OFFERS_FAILURE,
        payload: error,
    };
};

export const fetchOffersCleanUp = () => {
    return {
        type: FETCH_OFFERS_CLEAN_UP,
    };
};

const fetchOffersForPageRequest = () => {
    return {
        type: FETCH_OFFERS_FOR_PAGE_REQUEST,
    };
};

const fetchOffersForPageSuccess = (payload) => {
    return {
        type: FETCH_OFFERS_FOR_PAGE_SUCCESS,
        payload,
    };
};

const fetchOffersForPageFailure = (error) => {
    return {
        type: FETCH_OFFERS_FOR_PAGE_FAILURE,
        payload: error,
    };
};

export const fetchOffersForPageCleanUp = () => {
    return {
        type: FETCH_OFFERS_FOR_PAGE_CLEAN_UP,
    };
};

export const updateOffersPageStartParam = () => {
    return {
        type: UPDATE_OFFERS_PAGE_START_PARAM,
    };
};

export const fetchOffers = ({
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
        }/contents/published?sort=publishAt%3Adesc&filters[type][$eq]=offer${
            categories.length > 0 ? `&${query}` : ''
        }${city ? `&filters[city][$eq]=${city}` : ''}${
            start ? `&pagination[start]=${start}` : ''
        }${limit ? `&pagination[limit]=${limit}` : ''}`;
        dispatch(fetchOffersRequest);
        axios
            .get(url)
            .then((response) => {
                const offers = response.data;
                dispatch(
                    fetchOffersSuccess({
                        offers,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchOffersFailure(errorMsg));
            });
    };
};

export const fetchOffersForPage = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
    slug = undefined,
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
        }/contents/published?sort=publishAt%3Adesc&filters[type][$eq]=offer${
            categories.length > 0 ? `&${query}` : ''
        }${city ? `&filters[city][$eq]=${city}` : ''}${
            start ? `&pagination[start]=${start}` : ''
        }${limit ? `&pagination[limit]=${limit}` : ''}${
            slug ? `&filters[slug][$ne]=${slug}` : ''
        }`;
        dispatch(fetchOffersForPageRequest);
        axios
            .get(url)
            .then((response) => {
                const offers = response.data;
                dispatch(
                    fetchOffersForPageSuccess({
                        offers,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchOffersForPageFailure(errorMsg));
            });
    };
};

export default fetchOffers;
