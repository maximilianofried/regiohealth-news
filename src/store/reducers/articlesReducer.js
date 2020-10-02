import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_CITY_SUCCESS,
    SHOW_MORE_ARTICLES}
from "../constants/articlesTypes";

const initialState = {
    loading: false,
    articles: [],
    articlesByCity: [],
    error: '',
    limit: 2
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
            ...state,
            articles: action.payload.articles,
            limit: action.payload.limit,
            error: '',
        }
        case FETCH_ARTICLES_FAILURE:
        return {
            loading: false,
            articles: [],
            error: action.payload
        }
        case FETCH_ARTICLES_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                articlesByCity: action.payload.articles,
                error: action.payload
            }
        default: return state
    }
}

export default articlesReducer;