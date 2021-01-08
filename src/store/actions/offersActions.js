import axios from 'axios';
import qs from 'qs';
import {
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFERS_FAILURE,
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
        }/offers/published?_sort=publishAt:DESC${
            categories ? `&${query}` : ''
        }${city ? `&city=${city}` : ''}${start ? `&_start=${start}` : ''}${
            limit ? `&_limit=${limit}` : ''
        }`;
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

export default fetchOffers;
