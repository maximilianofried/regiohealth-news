import axios from 'axios';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    LOAD_NEW_PAGE,
    LOAD_EXACT_PAGE
} from "../constants/articlesTypes";

const fetchArticlesRequest = () => {
    return {
        type: FETCH_ARTICLES_REQUEST
    }
}

const fetchArticlesSuccess = (payload) => {
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

// action creator, return function not object, not pure function ,async api calls
export const fetchArticles = (category) => {
    return (dispatch) => {
        let url = category ? 'http://cms.gesundheitsticket.de/articles?_sort=createdAt:DESC' + '&categories.name_contains=' + category : 'http://cms.gesundheitsticket.de/articles?_sort=createdAt:DESC'
        dispatch(fetchArticlesRequest);
        axios.get(url)
            .then(response => {
                //separar en categorias y guardar en objeto los array correspondientes
               // let count = articles.length;
                const articles = response.data;
                let count = articles.length;
                let counterPerPage = 2;
                let totalPages = Math.ceil(count / counterPerPage);
                console.log(totalPages)

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