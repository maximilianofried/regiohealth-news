import {
    SAVE_SEARCH_TYPE,
    SAVE_SEARCH_PLACE,
    SAVE_SEARCH_KEYWORD,
} from '../constants/searchTypes';

const initialState = {
    place: '',
    type: 'article',
    keyword: '',
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SEARCH_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        case SAVE_SEARCH_PLACE:
            return {
                ...state,
                place: action.payload,
            };
        case SAVE_SEARCH_KEYWORD:
            return {
                ...state,
                keyword: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
