import {
    FETCH_ARTICLE_BY_ID_REQUEST,
    FETCH_ARTICLE_BY_ID_SUCCESS,
    FETCH_ARTICLE_BY_ID_FAILURE
} from "../constants/articleTypes";

const initialState = {
    loading: false,
    articles: [],
    error: ''
}

const articleReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ARTICLE_BY_ID_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case FETCH_ARTICLE_BY_ID_SUCCESS: 
        return {
            loading: false,
            article: action.payload,
            error: ''
        }
        case FETCH_ARTICLE_BY_ID_FAILURE: 
        return {
            loading: false,
            articles: [],
            error: action.payload
        }
        default: return state
    }
}

export default articleReducer;