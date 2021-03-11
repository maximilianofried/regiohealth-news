import {
    SAVE_SEARCH_TYPE,
    SAVE_SEARCH_PLACE,
    SAVE_SEARCH_KEYWORD,
} from '../constants/searchTypes';

export const saveSearchType = (type) => {
    return {
        type: SAVE_SEARCH_TYPE,
        payload: type,
    };
};

export const saveSearchPlace = (place) => {
    return {
        type: SAVE_SEARCH_PLACE,
        payload: place,
    };
};

export const saveSearchKeyword = (keyword) => {
    return {
        type: SAVE_SEARCH_KEYWORD,
        payload: keyword,
    };
};
