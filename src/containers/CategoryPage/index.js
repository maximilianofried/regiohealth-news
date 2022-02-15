import React, { useEffect, useRef, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import moment from 'moment';
import { isMobileOnly } from 'react-device-detect';
import {
    fetchArticles,
    fetchArticleCategoryPage,
    fetchOffers,
    fetchAds,
    fetchArticlesCleanUp,
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

const CategoryPage = ({
    fetchArticles,
    fetchArticlesCleanUp,
    fetchArticleCategoryPage,
    fetchOffers,
    allArticles,
    newsArticles,
    latestOffers,
    menuName,
    fetchAds,
    adsCategory,
    // limit,
    categories,
    stateArticles,
}) => {
    const [newLatestOffers, setNewLatestOffers] = useState([]);
    const [newArticlesCategoryPage, setNewArticlesCategoryPage] = useState([]);
    const [clickedLoadMore, setClickedLoadMore] = useState(false);
    const limit = useRef(2);
    const start = useRef(0);

    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const fetchArticlesHook = useCallback(() => {
        fetchArticles({
            categories,
            start: start.current,
            limit: limit.current,
            menuName,
        });
        start.current += 2;
    }, [categories, fetchArticles, limit, menuName]);

    useEffect(() => {
        // window.scrollTo(0, 0);

        // if (categories.length > 0)
        if (stateArticles.articles.length === 0) fetchArticlesHook();
        // fetchArticles({ categories, start: 0, limit: 4, menuName });
        // fetchAds();
    }, [fetchArticlesHook, stateArticles.articles.length]);

    // useEffect(() => {
    //     console.log(clickedLoadMore);
    //     return () => {
    //         if (clickedLoadMore) {
    //             setClickedLoadMore(false);
    //         }
    //         if (stateArticles.articles.length > 0 && !clickedLoadMore) {
    //             fetchArticlesCleanUp();
    //         }
    //     };
    // }, [clickedLoadMore, fetchArticlesCleanUp, stateArticles.articles.length]);

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

    // const observer = useRef();

    // const lastElementRef = useCallback(
    //     (node) => {
    //         if (observer.current) observer.current.disconnect();
    //         observer.current = new IntersectionObserver((entries) => {
    //             if (entries[0].isIntersecting) {
    //                 fetchArticlesHook();
    //                 // fetchArticles({
    //                 //     categories,
    //                 //     start: 0,
    //                 //     limit: limit + 2,
    //                 //     menuName,
    //                 // });
    //             }
    //         });
    //         if (node) observer.current.observe(node);
    //     },
    //     [fetchArticlesHook]
    // );
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
                                publisherArticles={allArticles}
                                fetchArticlesHook={fetchArticlesHook}
                                setClickedLoadMore={setClickedLoadMore}
                            />

                            {/* <div ref={lastElementRef} className="space-20" /> */}

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
                                    {/* <div className="white_bg padding15 border-radious5 sm-mt30 mb30">
                                        <h2 className="widget-title">News</h2>
                                        <div className="space-20" />
                                        {newArticlesCategoryPage &&
                                            newArticlesCategoryPage.map(
                                                (item, i) => (
                                                    <div
                                                        key={item.id}
                                                        className="single_post type14 widgets_small"
                                                    >
                                                        <div className="single_post_text">
                                                            <h4>
                                                                <Link
                                                                    to={`/article/${item.slug}`}
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            </h4>
                                                            <div className="meta4">
                                                                <p>
                                                                    {moment(
                                                                        item.publishAt
                                                                    ).format(
                                                                        'LL'
                                                                    )}
                                                                </p>
                                                            </div>
                                                            {i + 1 <
                                                            newsArticles.length ? (
                                                                <>
                                                                    <div className="space-20" />
                                                                </>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div> */}
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
        stateArticles: state.articles,
        allArticles: state.articles.articles,
        // limit: state.articles.limit,
        newsArticles: state.articles.articlesCategoryPage.newsArticles,
        latestOffers: state.offers.offers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ categories, start, limit, menuName }) =>
            dispatch(fetchArticles({ categories, start, limit, menuName })),
        fetchAds: () => dispatch(fetchAds()),
        fetchArticleCategoryPage: () => dispatch(fetchArticleCategoryPage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
        fetchArticlesCleanUp: () => dispatch(fetchArticlesCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
