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
    place = '',
    type = 'alle',
    responseType = 'mixed',
    keyword = '',
}) => {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_CMS_URL}/geoinfos/string?${
            type === 'alle' ? 'type=article&type=offer' : `type=${type}`
        }&start=${start}&limit=${limit}&responseType=${responseType}${
            keyword ? `&keyword=${keyword}` : ''
        }${place ? `&_q=${place}` : ''}`;
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
