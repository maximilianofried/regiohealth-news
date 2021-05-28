import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { connect } from 'react-redux';
import {
    fetchArticles,
    fetchArticleHomepage,
    fetchAds,
    fetchOffers,
} from '../../store/actions';
import Metadata from '../../components/Metadata';
import { RG_DESCRIPTION } from '../../utils/constants';
import PostGalleryTwo from '../../components/PostGalleryTwo';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import FontAwesome from '../../components/uiStyle/FontAwesome';

const HomePageTwo = ({
    fetchArticleHomepage,
    fetchOffers,
    fetchAds,
    mainArticle,
    publisherArticles = [],
    newsArticles,
    latestOffers,
    adsHome,
}) => {
    useEffect(() => {
        fetchArticleHomepage();
        fetchOffers({ start: 0, limit: 4 });
        fetchAds();
    }, []);

    const [articleLimit, setArticleLimit] = useState(4);

    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    publisherArticles.length > articleLimit
                ) {
                    setArticleLimit(articleLimit + 2);
                }
            });
            if (node) observer.current.observe(node);
        },
        [articleLimit, publisherArticles]
    );

    return (
        <>
            <Metadata
                title="Regionale Gesundheit"
                description={RG_DESCRIPTION}
            />
            <PostGalleryTwo
                mainArticle={mainArticle}
                newsArticles={newsArticles}
                articleLimit={articleLimit}
                publisherArticles={publisherArticles}
                adsHome={adsHome}
                latestOffers={latestOffers}
            />
            {/* <div className="total3 mb30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 homepage_col_top">
                            <div className="space-20" />
                        </div>
                        <div className="col-lg-3">
                            <div className="row justify-content-center">
                                <div
                                    id="ads"
                                    className="col-md-6 col-lg-12 d-md-none d-lg-block"
                                >
                                    {adsHome && adsHome.length > 0 && (
                                        <div className="banner2 mb30 mt20 border-radious5">
                                            <a
                                                target="_blank"
                                                href={adsHome[0].link}
                                            >
                                                <img
                                                    className="lazyLoad"
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        adsHome[0].image[0].url
                                                    }
                                                    alt="thumb"
                                                />
                                            </a>
                                        </div>
                                    )}
                                    <div className="banner2 mb30 mt20 border-radious5 banner_homepage">
                                        <iframe
                                            title="ads"
                                            id="a108b706"
                                            name="a108b706"
                                            src="https://adserver.gesundheitsticket.de/revive/www/delivery/afr.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                                            frameBorder="0"
                                            scrolling="no"
                                            width="350"
                                            height="292"
                                            allow="autoplay"
                                        >
                                            <a
                                                href="https://adserver.gesundheitsticket.de/revive/www/delivery/ck.php?n=a270b77f&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                                                target="_blank"
                                            >
                                                <img
                                                    id="img_banner_homepage"
                                                    src="https://adserver.gesundheitsticket.de/revive/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a270b77f"
                                                    alt=""
                                                />
                                            </a>
                                        </iframe>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12">
                                    <MostViewTwo
                                        title="ANGEBOTE"
                                        latestOffers={latestOffers}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div ref={lastElementRef} className="space-40" />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        mainArticle: state.articles.articlesHomepage.mainArticle,
        publisherArticles: state.articles.articlesHomepage.publisherArticles,
        newsArticles: state.articles.articlesHomepage.newsArticles,
        latestOffers: state.offers.offers,
        adsHome: state.ads.ads.filter(
            (ad) => ad.position === 'home' && ad.size === 's350x292'
        ),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticleHomepage: () => dispatch(fetchArticleHomepage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
        fetchAds: () => dispatch(fetchAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageTwo);
