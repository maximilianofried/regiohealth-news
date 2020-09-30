import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    CLEAN_FILTERED_ARTICLES,
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE,
    SHOW_MORE_ARTICLES
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

export const cleanFilteredArticles = () => {
    return {
        type: CLEAN_FILTERED_ARTICLES
    }
}

export const loadNewPage = payload => {
    return {
        type: LOAD_NEW_PAGE,
        payload
    }
}

export const loadExactPage = payload => {
    return {
        type: LOAD_EXACT_PAGE,
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
        // let url = category ? 'https://cms.gesundheitsticket.de/articles/published?_sort=createdAt:DESC' + '&categories.name_contains=' + category
        // :  city ? 'https://cms.gesundheitsticket.de/articles/published?_sort=createdAt:DESC' + '&city=' + city
        // : 'https://cms.gesundheitsticket.de/articles/published?_sort=createdAt:DESC';
        dispatch(fetchArticlesRequest);
        axios.get(url)
            .then(response => {
                const articles = response.data;
                let count = articles.length;
                let counterPerPage = 2;
                let totalPages = Math.ceil(count / counterPerPage);

                dispatch(fetchArticlesSuccess({
                    articles,
                    filteredArticles: articles.slice(0, counterPerPage),
                    currentCount: counterPerPage,
                    counterPerPage,
                    totalCount: count,
                    currentPage: 1,
                    totalPages,
                    filteredPages: totalPages,
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
                let count = articles.length;
                let counterPerPage = 2;
                let totalPages = Math.ceil(count / counterPerPage);

                dispatch(fetchArticlesSuccess({
                    articles,
                    filteredArticles: articles.slice(0, counterPerPage),
                    currentCount: counterPerPage,
                    counterPerPage,
                    totalCount: count,
                    currentPage: 1,
                    totalPages,
                    filteredPages: totalPages
                    }
                ))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            })
    }
}