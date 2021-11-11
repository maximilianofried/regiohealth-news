import axios from 'axios';
import {
    FETCH_ADS_REQUEST,
    FETCH_ADS_SUCCESS,
    FETCH_ADS_FAILURE,
} from '../constants/adsTypes';

const fetchAdsRequest = () => {
    return {
        type: FETCH_ADS_REQUEST,
    };
};

const fetchAdsSuccess = (ads) => {
    return {
        type: FETCH_ADS_SUCCESS,
        payload: ads,
    };
};

const fetchAdsFailure = (error) => {
    return {
        type: FETCH_ADS_FAILURE,
        payload: error,
    };
};

export const fetchAds = () => {
    return (dispatch) => {
        dispatch(fetchAdsRequest);
        axios
            .get(`${process.env.REACT_APP_CMS_URL}/ads`)
            .then((response) => {
                const ads = response.data;
                dispatch(fetchAdsSuccess(ads));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchAdsFailure(errorMsg));
            });
    };
};

export default fetchAds;
