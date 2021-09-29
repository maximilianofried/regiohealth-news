import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { isMobileOnly } from 'react-device-detect';
import {
    fetchArticles,
    fetchArticleHomepage,
    fetchAds,
    fetchOffersForPageCleanUp,
    fetchOffersForPage,
} from '../../store/actions';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import FollowUs from '../../components/FollowUs';
import Metadata from '../../components/Metadata';
import { ANGEBOTE_DESCRIPTION } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverIframe from '../../components/AdserverIframe';
import AdserverLeaderboard from '../../components/AdserverLeaderboard';

const OffersPage = ({
    fetchOffersForPageCleanUp,
    fetchArticleHomepage,
    fetchOffersForPage,
    newsArticles = [],
    latestOffers = [],
    menuName,
    fetchAds,
    adsCategory,
    limit,
}) => {
    useEffect(() => {
        // window.scrollTo(0, 0);
        if (latestOffers.length === 0)
            fetchOffersForPage({ start: 0, limit: 4 });
        if (newsArticles.length === 0) fetchArticleHomepage();
        // fetchArticles({ categories, start: 0, limit: 4 });
        if (adsCategory.length === 0) fetchAds();
        return () => {
            if (latestOffers.length > 0) fetchOffersForPageCleanUp();
        };
    }, []);

    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchOffersForPage({ start: 0, limit: limit + 2 });
                }
            });
            if (node) observer.current.observe(node);
        },
        [limit]
    );
    const displayOffers = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <>
            <Metadata
                title={menuName}
                description={ANGEBOTE_DESCRIPTION}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${menuName}`}
            />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 homepage_col_top">
                            <BusinessNewsTwo
                                offer
                                publisherArticles={latestOffers}
                            />
                            <div ref={lastElementRef} className="space-20" />
                            {!isMobileOnly && <AdserverLeaderboard />}
                        </div>
                        <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-12 d-md-none d-lg-block" />
                                <div className="col-md-6 col-lg-12">
                                    <AdserverIframe />
                                    <FollowUs
                                        title="FOLGEN SIE UNS"
                                        className="border-radious5 white_bg padding20 sm-mt30"
                                    />
                                    <div className="white_bg padding15 border-radious5 sm-mt30 mb30">
                                        <h2 className="widget-title">News</h2>
                                        <div className="space-20" />
                                        {newsArticles &&
                                            newsArticles.map((item, i) => (
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
                                                                ).format('LL')}
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
                                            ))}
                                    </div>
                                    {displayOffers && (
                                        <MostViewTwo
                                            title="ANGEBOTE"
                                            latestOffers={latestOffers}
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
        allArticles: state.articles.articles,
        limit: state.articles.limit,
        newsArticles: state.articles.articlesHomepage.newsArticles,
        latestOffers: state.offers.offersForPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ categories, start, limit }) =>
            dispatch(fetchArticles({ categories, start, limit })),
        fetchAds: () => dispatch(fetchAds()),
        fetchArticleHomepage: () => dispatch(fetchArticleHomepage()),
        fetchOffersForPage: ({ start, limit }) =>
            dispatch(fetchOffersForPage({ start, limit })),
        fetchOffersForPageCleanUp: () => dispatch(fetchOffersForPageCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
