import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import moment from 'moment';
import { isMobileOnly } from 'react-device-detect';
import {
    fetchArticles,
    fetchArticleHomepage,
    fetchAds,
    fetchOffersForPageCleanUp,
    fetchOffersForPage,
    updateOffersPageStartParam,
} from '../../store/actions';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import FollowUs from '../../components/FollowUs';
import Metadata from '../../components/Metadata';
import { ANGEBOTE_DESCRIPTION } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverIframe from '../../components/AdserverIframe';
import AdserverLeaderboard from '../../components/AdserverLeaderboard';
import MostViewArticles from '../../components/MostViewArticles';

const OffersPage = ({
    fetchArticleHomepage,
    updateOffersPageStartParam,
    fetchOffersForPage,
    newsArticles = [],
    latestOffers = [],
    menuName,
    start,
    wissenArticles,
    gtTippsArticles,
}) => {
    const limit = useRef(7);

    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const fetchOffersHook = useCallback(() => {
        fetchOffersForPage({ start, limit: limit.current });
        updateOffersPageStartParam();
    }, [start]);

    useEffect(() => {
        if (latestOffers.length === 0) fetchOffersHook();
    }, []);

    useEffect(() => {
        if (newsArticles.length === 0) fetchArticleHomepage();
    }, [fetchArticleHomepage, newsArticles.length]);

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
                                fetchContentHook={fetchOffersHook}
                                buttonText="MEHR ANGEBOTE"
                            />
                            {/* <div ref={lastElementRef} className="space-20" /> */}
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
                                    <MostViewArticles
                                        title="WISSEN"
                                        contentData={wissenArticles}
                                    />
                                    <MostViewArticles
                                        title="GESUNDHEITSTIPPS"
                                        contentData={gtTippsArticles}
                                    />
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
        newsArticles: state.articles.articlesHomepage.newsArticles,
        latestOffers: state.offers.offersForPage,
        start: state.offers.start,
        wissenArticles: state.articles.articlesHomepage.wissenArticles,
        gtTippsArticles: state.articles.articlesHomepage.gtTippsArticles,
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
        updateOffersPageStartParam: () =>
            dispatch(updateOffersPageStartParam()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
