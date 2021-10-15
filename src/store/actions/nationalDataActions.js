import axios from 'axios';
import {
    FETCH_NATIONAL_DATA_REQUEST,
    FETCH_NATIONAL_DATA_SUCCESS,
    FETCH_NATIONAL_DATA_FAILURE,
    FETCH_NATIONAL_DATA_CLEAN_UP,
} from '../constants/nationalDataTypes';

const fetchNationalDataRequest = () => {
    return {
        type: FETCH_NATIONAL_DATA_REQUEST,
    };
};

const fetchNationalDataSuccess = (payload) => {
    return {
        type: FETCH_NATIONAL_DATA_SUCCESS,
        payload,
    };
};

const fetchNationalDataFailure = (error) => {
    return {
        type: FETCH_NATIONAL_DATA_FAILURE,
        payload: error,
    };
};

export const fetchNationalDataCleanUp = () => {
    return {
        type: FETCH_NATIONAL_DATA_CLEAN_UP,
    };
};

export const fetchNationalData = ({
    limit = 4,
    start = 0,
    includeCountry = 'Germany',
    type = 'alle',
    responseType = 'mixed',
}) => {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_CMS_URL}/geoinfos/national?type=${type}&start=${start}&limit=${limit}`;
        dispatch(fetchNationalDataRequest);
        axios
            .get(url)
            .then((response) => {
                const geoData = response.data;
                dispatch(
                    fetchNationalDataSuccess({
                        geoData,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchNationalDataFailure(errorMsg));
            });
    };
};

export default fetchNationalData;
