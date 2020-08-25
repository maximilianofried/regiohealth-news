import axios from 'axios';
import {
    FETCH_ARTICLE_BY_ID_REQUEST,
    FETCH_ARTICLE_BY_ID_SUCCESS,
    FETCH_ARTICLE_BY_ID_FAILURE
} from "../constants/articleTypes";

const fetchArticleRequest = () => {
    return {
        type: FETCH_ARTICLE_BY_ID_REQUEST
    }
}

const fetchArticleSuccess = article => {
    return {
        type: FETCH_ARTICLE_BY_ID_SUCCESS,
        payload: article
    }
}


const fetchArticleFailure = error => {
    return {
        type: FETCH_ARTICLE_BY_ID_FAILURE,
        payload: error
    }
}

// action creator, return function not object, not pure function ,async api calls
export const fetchArticle = (id) => {
    return (dispatch) => {
        dispatch(fetchArticleRequest);
        axios.get(`http://cms.gesundheitsticket.de/articles/${id}`)
            .then(response => {
                //separar en categorias y guardar en objeto los array correspondientes
                const article = response.data;
                dispatch(fetchArticleSuccess(article))
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchArticleFailure(errorMsg));
            })
    }
}