import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StickyBox from 'react-sticky-box';
import {
    fetchArticles,
    fetchArticleHomepage,
    fetchOffers,
    fetchAds,
    fetchArticlesCleanUp,
} from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import BusinessNews from '../../components/BusinessNews';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import BannerSection from '../../components/BannerSection';
import FollowUs from '../../components/FollowUs';
import Metadata from '../../components/Metadata';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import { MENU_DESCRIPTION } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CategoryPage = ({
    fetchArticles,
    fetchArticlesCleanUp,
    fetchArticleHomepage,
    fetchOffers,
    allArticles,
    newsArticles,
    latestOffers,
    menuName,
    fetchAds,
    adsCategory,
    limit,
    categories,
    stateArticles,
}) => {
    useEffect(() => {
        // window.scrollTo(0, 0);
        if (latestOffers.length === 0) fetchOffers({ start: 0, limit: 4 });
        fetchArticleHomepage();
        // if (categories.length > 0)
        if (stateArticles.articles.length === 0)
            fetchArticles({ categories, start: 0, limit: 4, menuName });
        fetchAds();

        return () => {
            fetchArticlesCleanUp();
        };
    }, []);
    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchArticles({
                        categories,
                        start: 0,
                        limit: limit + 2,
                        menuName,
                    });
                }
            });
            if (node) observer.current.observe(node);
        },
        [limit]
    );
    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    return (
        <>
            <Metadata
                title={menuName}
                description={MENU_DESCRIPTION[menuName]}
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
                                // articleLimit={articleLimit}
                                publisherArticles={allArticles}
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
                        <div className="col-lg-3">
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
                                                />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-12">
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

                                    <div className="banner2 mb30 border-radious5">
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
                                    </div>

                                    <MostViewTwo
                                        title="ANGEBOTE"
                                        latestOffers={latestOffers}
                                    />
                                </div>

                                {/* <div className="col-md-6 col-lg-12">
                                    <WidgetFinance />
                                </div> */}
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
        limit: state.articles.limit,
        newsArticles: state.articles.articlesHomepage.newsArticles,
        latestOffers: state.offers.offers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ categories, start, limit, menuName }) =>
            dispatch(fetchArticles({ categories, start, limit, menuName })),
        fetchAds: () => dispatch(fetchAds()),
        fetchArticleHomepage: () => dispatch(fetchArticleHomepage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
        fetchArticlesCleanUp: () => dispatch(fetchArticlesCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
