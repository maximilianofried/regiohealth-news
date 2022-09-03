import axios from 'axios';
import qs from 'qs';
import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_CITY_SUCCESS,
    FETCH_ARTICLES_HOMEPAGE_SUCCESS,
    FETCH_ARTICLES_CATEGORYPAGE_SUCCESS,
    FETCH_ARTICLES_PUBLISHER_SECTION_SUCCESS,
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

const fetchArticlesCategoryPageSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_CATEGORYPAGE_SUCCESS,
        payload,
    };
};

const fetchArticlesPublisherSectionSuccess = (payload) => {
    return {
        type: FETCH_ARTICLES_PUBLISHER_SECTION_SUCCESS,
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
    slug = undefined,
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
        }/contents/published?sort=publishAt%3Adesc&filters[type][$eq]=article${
            categoriesList.length > 0 ? `&${query}` : ''
        }${menuName ? `&filters[menu][$eq]=${menuName}` : ''}${
            city ? `&filters[city][$eq]=${city}` : ''
        }${start ? `&pagination[start]=${start}` : ''}${
            limit ? `&pagination[limit]=${limit}` : ''
        }${slug ? `&filters[slug][$ne]=${slug}` : ''}`;
        dispatch(fetchArticlesRequest);
        axios
            .get(url)
            .then((response) => {
                const articles = response.data;
                dispatch(
                    fetchArticlesSuccess({
                        articles,
                        limit,
                        start,
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
        const urlMainArticle = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[homepage][$eq]=main_article&pagination[limit]=1`;
        const urlPublisher = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[homepage][$eq]=publisher`;
        const urlNews = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[homepage][$eq]=news&pagination[limit]=4`;
        const urlWissen = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[menu][$eq]=wissen&pagination[limit]=4`;
        const urlGtTipps = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[menu][$eq]=gesundheitstipps&pagination[limit]=4`;
        dispatch(fetchArticlesRequest);
        axios
            .all([
                axios.get(urlMainArticle),
                axios.get(urlPublisher),
                axios.get(urlNews),
                axios.get(urlWissen),
                axios.get(urlGtTipps),
            ])
            .then(
                axios.spread((...responses) => {
                    const mainArticle = responses[0].data[0];
                    const publisherArticles = responses[1].data;
                    const newsArticles = responses[2].data;
                    const wissenArticles = responses[3].data;
                    const gtTippsArticles = responses[4].data;
                    const articles = {
                        mainArticle,
                        publisherArticles,
                        newsArticles,
                        wissenArticles,
                        gtTippsArticles,
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

export const fetchArticlesPublisherSection = ({
    start = undefined,
    limit = undefined,
}) => {
    return (dispatch) => {
        const urlPublisher = `${
            process.env.REACT_APP_CMS_URL
        }/contents/published?sort=publishAt%3Adesc&filters[homepage][$eq]=publisher${
            start ? `&pagination[start]=${start}` : ''
        }${limit ? `&pagination[limit]=${limit}` : ''}`;
        dispatch(fetchArticlesRequest);
        axios
            .all([axios.get(urlPublisher)])
            .then(
                axios.spread((...responses) => {
                    const publisherArticles = responses[0].data;
                    // const articles = {
                    //     publisherArticles: publisherArticles.data,
                    // };
                    dispatch(
                        fetchArticlesPublisherSectionSuccess({
                            publisherArticles,
                        })
                    );
                })
            )
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(fetchArticlesFailure(errorMsg));
            });
    };
};

export const fetchArticleCategoryPage = () => {
    return (dispatch) => {
        const urlNews = `${process.env.REACT_APP_CMS_URL}/contents/published?sort=publishAt%3Adesc&filters[homepage][$eq]=news&pagination[limit]=5`;
        dispatch(fetchArticlesRequest);
        axios
            .all([axios.get(urlNews)])
            .then(
                axios.spread((...responses) => {
                    const newsArticles = responses[0];
                    const articles = {
                        newsArticles: newsArticles.data,
                    };
                    dispatch(fetchArticlesCategoryPageSuccess({ articles }));
                })
            )
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
