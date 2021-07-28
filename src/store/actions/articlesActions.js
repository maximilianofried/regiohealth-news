import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_CITY_SUCCESS,
    FETCH_ARTICLES_HOMEPAGE_SUCCESS,
    FETCH_ARTICLES_CLEAN_UP,
} from '../constants/articlesTypes';

const fetchArticlesRequest = () => {
    return {
        type: FETCH_ARTICLES_REQUEST,
    };
};

const fetchArticlesSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_SUCCESS,
        payload,
    };
};

const fetchArticlesFailure = (error) => {
    return {
        type: FETCH_ARTICLES_FAILURE,
        payload: error,
    };
};

const fetchArticlesByCitySuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_CITY_SUCCESS,
        payload,
    };
};

const fetchArticlesHomepageSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_HOMEPAGE_SUCCESS,
        payload,
    };
};

export const fetchArticlesCleanUp = () => {
    return {
        type: FETCH_ARTICLES_CLEAN_UP,
    };
};

// action creator, return function not object, not pure function ,async api calls
export const fetchArticles = ({
    categories = [],
    city = undefined,
    start = undefined,
    limit = undefined,
    menuName = '',
} = {}) => {
    return (dispatch) => {
        let categoriesList = [];
        let query = '';
        categoriesList = categories.map((item) => item.id);
        if (categoriesList.length > 0) {
            query = qs.stringify(
                {
                    _where: { 'categories.id': categoriesList },
                },
                { encode: false, arrayFormat: 'repeat' }
            );
        }
        const url = `${
            process.env.REACT_APP_CMS_URL
        }/contents/published?_sort=publishAt:desc&type=article${
            categoriesList.length > 0 ? `&${query}` : ''
        }${menuName ? `&menu.linkText=${menuName}` : ''}${
            city ? `&city=${city}` : ''
        }${start ? `&_start=${start}` : ''}${limit ? `&_limit=${limit}` : ''}`;
        dispatch(fetchArticlesRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesSuccess({
                        articles,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};

export const fetchArticleHomepage = () => {
    return (dispatch) => {
        const urlMainArticle = `${process.env.REACT_APP_CMS_URL}/contents/published?_sort=publishAt:desc&type=article&homepage=main_article`;
        const urlPublisher = `${process.env.REACT_APP_CMS_URL}/contents/published?_sort=publishAt:desc&type=article&homepage=publisher`;
        const urlNews = `${process.env.REACT_APP_CMS_URL}/contents/published?_sort=publishAt:desc&type=article&homepage=news&_limit=5`;
        dispatch(fetchArticlesRequest);
        axios
            .all([
                axios.get(urlMainArticle),
                axios.get(urlPublisher),
                axios.get(urlNews),
            ])
            .then(
                axios.spread((...responses) => {
                    const mainArticle = responses[0];
                    const publisherArticles = responses[1];
                    const newsArticles = responses[2];
                    const articles = {
                        mainArticle: mainArticle.data[0],
                        publisherArticles: publisherArticles.data,
                        newsArticles: newsArticles.data,
                    };
                    dispatch(fetchArticlesHomepageSuccess({ articles }));
                })
            )
            // .then((response) => {
            //     const articles = response.data;
            //     dispatch(
            //         fetchArticlesSuccess({
            //             articles,
            //         })
            //     );
            // })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};

export const fetchArticlesCity = ({
    limit = undefined,
    start = undefined,
    place = { lat: 52.56, lng: 13.14 },
    radius = 200001,
}) => {
    const { lat, lng } = place;
    return (dispatch) => {
        const url = `${process.env.REACT_APP_CMS_URL}/geodata?lat=${lat}&lng=${lng}&radius=${radius}&type=article&start=${start}&limit=${limit}`;
        dispatch(fetchArticlesRequest);
        axios
            .get(url)
            .then((response) => {
                const { articles } = response.data;
                dispatch(
                    fetchArticlesByCitySuccess({
                        articles,
                        limit,
                    })
                );
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};
