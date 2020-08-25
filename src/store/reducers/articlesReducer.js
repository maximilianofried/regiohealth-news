import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE}
from "../constants/articlesTypes";

const initialState = {
    loading: false,
    articles: [],
    error: ''
}

const articlesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ARTICLES_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case FETCH_ARTICLES_SUCCESS: 
        return {
            loading: false,
            articles: action.payload,
            error: ''
        }
        case FETCH_ARTICLES_FAILURE: 
        return {
            loading: false,
            articles: [],
            error: action.payload
        }
        default: return state
    }
}

export default articlesReducer;