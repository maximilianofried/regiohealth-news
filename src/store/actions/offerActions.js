import axios from 'axios';
import {
    FETCH_OFFER_BY_ID_REQUEST,
    FETCH_OFFER_BY_ID_SUCCESS,
    FETCH_OFFER_BY_ID_FAILURE,
    FETCH_OFFER_CLEAN_UP,
} from '../constants/offerTypes';

const fetchOfferRequest = () => {
    return {
        type: FETCH_OFFER_BY_ID_REQUEST,
    };
};

const fetchOfferSuccess = (offer) => {
    return {
        type: FETCH_OFFER_BY_ID_SUCCESS,
        payload: offer,
    };
};

const fetchOfferFailure = (error) => {
    return {
        type: FETCH_OFFER_BY_ID_FAILURE,
        payload: error,
    };
};

export const fetchOfferCleanUp = () => {
    return {
        type: FETCH_OFFER_CLEAN_UP,
    };
};

export const fetchOffer = (slug) => {
    return (dispatch) => {
        dispatch(fetchOfferRequest);
        axios
            .get(`${process.env.REACT_APP_CMS_URL}/offers/published/${slug}`)
            .then((response) => {
                const offer = response.data;
                dispatch(fetchOfferSuccess(offer));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchOfferFailure(errorMsg));
            });
    };
};
