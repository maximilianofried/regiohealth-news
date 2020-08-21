import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE
} from "../constants/articleTypes";

const fetchArticlesRequest = () => {
    return {
        type: FETCH_ARTICLES_REQUEST
    }
}

const fetchArticlesSuccess = articles => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload: articles
    }
}


const fetchArticlesFailure = error => {
    return {
        type: FETCH_ARTICLES_FAILURE,
        payload: error
    }
}

// action creator, return function not object, not pure function ,async api calls
export const fetchArticles = () => {
    return (dispatch) => {
        dispatch(fetchArticlesRequest);
        axios.get('http://cms.gesundheitsticket.de/articles')
            .then(response => {
                //separar en categorias y guardar en objeto los array correspondientes
                const articles = response.data;
                dispatch(fetchArticlesSuccess(articles))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            })
    }
}