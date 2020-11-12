import axios from 'axios';
import {
    FETCH_GEO_DATA_REQUEST,
    FETCH_GEO_DATA_SUCCESS,
    FETCH_GEO_DATA_FAILURE,
} from '../constants/geoDataTypes';

const fetchGeoDataRequest = () => {
    return {
        type: FETCH_GEO_DATA_REQUEST,
    };
};

const fetchGeoDataSuccess = (payload) => {
    return {
        type: FETCH_GEO_DATA_SUCCESS,
        payload,
    };
};

const fetchGeoDataFailure = (error) => {
    return {
        type: FETCH_GEO_DATA_FAILURE,
        payload: error,
    };
};

export const fetchGeoData = ({
    limit = 4,
    start = 0,
    place = { lat: 52.56, lng: 13.14 },
    radius = '5000',
    type = 'alle',
    responseType = 'mixed',
    keyWord = '',
}) => {
    const { lat, lng } = place;
    return (dispatch) => {
        const url = `${
            process.env.REACT_APP_CMS_URL
        }/geodata?lat=${lat}&lng=${lng}&radius=${radius}${
            type === 'alle' ? '&type=article&type=offer' : `&type=${type}`
        }&start=${start}&limit=${limit}&responseType=${responseType}${
            keyWord ? `&_q=${keyWord}` : ''
        }`;
        dispatch(fetchGeoDataRequest);
        axios
            .get(url)
            .then((response) => {
                const { geoData } = response.data;
                dispatch(
                    fetchGeoDataSuccess({
                        geoData,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchGeoDataFailure(errorMsg));
            });
    };
};

export default fetchGeoData;
