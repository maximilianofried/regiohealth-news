import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    fetchArticles,
    fetchArticleHomepage,
    fetchAds,
    fetchOffersForPageCleanUp,
    fetchOffersForPage,
} from '../../store/actions';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import BannerSection from '../../components/BannerSection';
import FollowUs from '../../components/FollowUs';
import Metadata from '../../components/Metadata';
import { ANGEBOTE_DESCRIPTION } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverIframe from '../../components/AdserverIframe';

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
            fetchOffersForPageCleanUp();
        };
    }, []);
    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    const showMore = () => {
        fetchOffersForPage({ start: 0, limit: limit + 2 });
    };

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
            {/* <BreadCrumb title={name} /> */}
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 homepage_col_top">
                            {/* <TrendingNewsTwo />
                            <FeatureNewsTwo /> */}
                            <BusinessNewsTwo
                                offer
                                // articleLimit={articleLimit}
                                publisherArticles={latestOffers}
                            />
                            <div ref={lastElementRef} className="space-20" />
                            {/* <button
                                className="more_articles"
                                type="button"
                                onClick={showMore}
                            >
                                MEHR ANZEIGEN{' '}
                                <FontAwesome name="angle-double-down" />
                            </button> */}
                            <BannerSection />
                        </div>
                        <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-12 d-md-none d-lg-block">
                                    {banner350x292 && banner350x292.length > 0 && (
                                        <div className="banner2 mb30 mt20 border-radious5">
                                            <a
                                                target="_blank"
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
                                                    effect="blur"
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

                                    {/* <div className="banner2 mb30 border-radious5">
                                        <a
                                            href={banner350x292.link}
                                            target="_blank"
                                        >
                                            {banner350x292.image &&
                                                banner350x292.image.length >
                                                    0 && (
                                                    <img
                                                        src={
                                                            process.env
                                                                .REACT_APP_CMS_URL +
                                                            banner350x292
                                                                .image[0].url
                                                        }
                                                        alt="banner"
                                                        effect="blur"
                                                    />
                                                )}
                                        </a>
                                    </div> */}
                                    {displayOffers && (
                                        <MostViewTwo
                                            title="ANGEBOTE"
                                            latestOffers={latestOffers}
                                        />
                                    )}
                                </div>

                                {/* <div className="col-md-6 col-lg-12">
                                    <WidgetFinance />
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="businerss_news">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>{name}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <BusinessNews
                                            businessArticles={allArticles}
                                            headerHide
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cpagination">
                                            <button
                                                type="button"
                                                onClick={showMore}
                                                className="readmore cursor_pointer"
                                            >
                                                SHOW MORE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-70" />
                        <div className="col-md-6 col-lg-4">
                            <iframe
                                title="advertisement"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://www.betterplace-widget.org/projects/25999?l=de"
                                width="100%"
                                height="320"
                                style={{ border: 0, padding: 0, margin: 0 }}
                            >
                                Informieren und spenden:{' '}
                                <a
                                    href="https://www.betterplace.org/de/projects/25999-nothilfe-fuer-fluechtlinge-international-moas-migrant-offshore-aid-station"
                                    target="_blank"
                                >
                                    „Nothilfe für Flüchtlinge international -
                                    MOAS Migrant Offshore Aid Station“
                                </a>{' '}
                                auf betterplace.org öffnen.
                            </iframe>
                            <StickyBox offsetTop={20}>
                                <div className="banner2 mb30">
                                    <a
                                        href={banner350x292.link}
                                        target="_blank"
                                    >
                                        {banner350x292.image &&
                                            banner350x292.image.length > 0 && (
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        banner350x292.image[0]
                                                            .url
                                                    }
                                                    alt="banner"
                                                    effect="blur"
                                                    visibleByDefault="true"
                                                />
                                            )}
                                    </a>
                                </div>
                            </StickyBox>
                        </div>
                    </div> */}
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
