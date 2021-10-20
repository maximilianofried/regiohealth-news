import React, { useEffect, useRef, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { isMobileOnly } from 'react-device-detect';
import {
    fetchArticlesNews,
    fetchArticleCategoryPage,
    fetchOffers,
    fetchAds,
    updateNewsPageStartParam,
} from '../../store/actions';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import MostViewTextonly from '../../components/MostViewTextOnly';
import FollowUs from '../../components/FollowUs';
import Metadata from '../../components/Metadata';
import { MENU_DESCRIPTION } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverIframe from '../../components/AdserverIframe';
import AdserverLeaderboard from '../../components/AdserverLeaderboard';

const NewsPage = ({
    fetchArticlesNews,
    articles,
    fetchArticleCategoryPage,
    updateNewsPageStartParam,
    fetchOffers,
    newsArticles,
    latestOffers,
    menuName,
    adsCategory,
    start,
    categories,
}) => {
    const [newLatestOffers, setNewLatestOffers] = useState([]);
    const [newArticlesCategoryPage, setNewArticlesCategoryPage] = useState([]);
    const limit = useRef(6);

    const fetchArticlesHook = useCallback(() => {
        fetchArticlesNews({
            categories,
            start,
            limit: limit.current,
        });
        updateNewsPageStartParam();
    }, [start]);

    useEffect(() => {
        if (articles.length === 0) fetchArticlesHook();
    }, []);

    useEffect(() => {
        if (latestOffers.length === 0) fetchOffers({ start: 0, limit: 4 });
    }, [fetchOffers, latestOffers.length]);

    useEffect(() => {
        setNewLatestOffers(latestOffers);
    }, [latestOffers]);

    useEffect(() => {
        if (newLatestOffers.length === 0) fetchArticleCategoryPage();
    }, [fetchArticleCategoryPage, newLatestOffers.length]);

    useEffect(() => {
        setNewArticlesCategoryPage(newsArticles);
    }, [newsArticles]);

    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    const displayOffers = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <>
            <Metadata
                title={menuName}
                description={MENU_DESCRIPTION[menuName]}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${menuName}`}
            />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 homepage_col_top">
                            <BusinessNewsTwo
                                publisherArticles={articles}
                                fetchContentHook={fetchArticlesHook}
                                buttonText="MEHR NEWS ARTIKEL"
                            />

                            {!isMobileOnly && <AdserverLeaderboard />}
                        </div>

                        <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-12 d-md-none d-lg-block">
                                    {banner350x292 && banner350x292.length > 0 && (
                                        <div className="banner2 mb30 mt20 border-radious5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={banner350x292[0].link}
                                            >
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        banner350x292[0]
                                                            .image[0].url
                                                    }
                                                    alt="thumb"
                                                />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-12">
                                    <AdserverIframe />
                                    <FollowUs
                                        title="FOLGEN SIE UNS"
                                        className="border-radious5 white_bg padding20 sm-mt30"
                                    />
                                    <MostViewTextonly
                                        title="NEWS"
                                        data={newArticlesCategoryPage}
                                    />
                                    {displayOffers && (
                                        <MostViewTwo
                                            title="ANGEBOTE"
                                            latestOffers={newLatestOffers}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === 'category'),
        newsArticles: state.articles.articlesCategoryPage.newsArticles,
        latestOffers: state.offers.offers,
        articles: state.articlesNews.articles,
        start: state.articlesNews.start,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAds: () => dispatch(fetchAds()),
        fetchArticleCategoryPage: () => dispatch(fetchArticleCategoryPage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
        fetchArticlesNews: ({ categories, start, limit }) =>
            dispatch(fetchArticlesNews({ categories, start, limit })),
        updateNewsPageStartParam: () => dispatch(updateNewsPageStartParam({})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
