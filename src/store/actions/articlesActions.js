import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    SHOW_MORE_ARTICLES,
    FETCH_ARTICLES_CITY_SUCCESS
} from "../constants/articlesTypes";

const fetchArticlesRequest = () => {
    return {
        type: FETCH_ARTICLES_REQUEST
    }
}

const fetchArticlesSuccess = payload => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload
    }
}


const fetchArticlesFailure = error => {
    return {
        type: FETCH_ARTICLES_FAILURE,
        payload: error
    }
}

const fetchArticlesByCitySuccess = payload => {
    return {
        type: FETCH_ARTICLES_CITY_SUCCESS,
        payload
    }
}

export const showMoreArticles = () => {
    return {
        type: SHOW_MORE_ARTICLES
    }
}

// action creator, return function not object, not pure function ,async api calls
export const fetchArticles = ({category = undefined, city = undefined, start = undefined, limit = undefined} = {}) => {
    return (dispatch) => {
        let url = 'https://cms.gesundheitsticket.de/articles/published?_sort=createdAt:DESC'
                    + (category ? '&categories.name_contains=' + category : '')
                    + (city ? '&city=' + city : '')
                    + (start ? '&_start=' + start : '')
                    + (limit ? '&_limit=' + limit : '');
        dispatch(fetchArticlesRequest);
        axios.get(url)
            .then(response => {
                const articles = response.data;
                dispatch(fetchArticlesSuccess({
                    articles,
                    limit
                    }
                ))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            })
    }
}

export const fetchArticlesGeo = ({lat = undefined, lng = undefined} = {}) => {
    return (dispatch) => {
        let url = `https://cms.gesundheitsticket.de/articles/geo/${lat}/${lng}?_sort=createdAt:DESC&`;
        dispatch(fetchArticlesRequest);
        axios.get(url)
            .then(response => {
                const articles = response.data;
                dispatch(fetchArticlesSuccess({
                    articles,
                    }
                ))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            })
    }
}

export const fetchArticlesCity = ({city = undefined} = {}) => {
    return (dispatch) => {
        let url = "https://cms.gesundheitsticket.de/articles/published?_sort=createdAt:DESC&city=" + city ;
        dispatch(fetchArticlesRequest);
        axios.get(url)
            .then(response => {
                const articles = response.data;
                dispatch(fetchArticlesByCitySuccess({
                    articles,
                    }
                ))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            })
    }
}