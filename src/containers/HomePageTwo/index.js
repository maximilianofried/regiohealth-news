import React, { useEffect } from 'react';
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
import PostGallery from '../../components/PostGallery';
import Metadata from '../../components/Metadata';
import { RG_DESCRIPTION } from '../../utils/constants';
import PostGalleryTwo from '../../components/PostGalleryTwo';
import BusinessNewsTwo from '../../components/BusinessNewsTwo';
import MostViewTwo from '../../components/MostViewTwo';
import banner2 from '../../doc/img/bg/sidebar-1.png';
import banner3 from '../../doc/img/bg/banner1.png';
import WidgetFinance from '../../components/WidgetFinance';
import FollowUs from '../../components/FollowUs';
import MostViewThree from '../../components/MostViewThree';
import Sports from '../../components/Sports';
import International from '../../components/International';

const HomePageTwo = ({
    fetchArticleHomepage,
    fetchOffers,
    fetchAds,
    mainArticle,
    publisherArticles,
    newsArticles,
    latestOffers,
    adsHome,
}) => {
    useEffect(() => {
        fetchArticleHomepage();
        fetchOffers({ start: 0, limit: 4 });
        fetchAds();
    }, []);
    return (
        <>
            <Metadata
                title="Regionale Gesundheit"
                description={RG_DESCRIPTION}
            />
            <PostGalleryTwo
                mainArticle={mainArticle}
                newsArticles={newsArticles}
            />
            <div className="total3 mb30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 homepage_col_top">
                            {/* <TrendingNewsTwo />
                            <FeatureNewsTwo /> */}
                            <BusinessNewsTwo
                                publisherArticles={publisherArticles}
                            />
                        </div>
                        <div className="col-lg-3">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-12 d-md-none d-lg-block">
                                    {adsHome && adsHome.length > 0 && (
                                        <div className="banner2 mb30 mt20 border-radious5">
                                            <a
                                                target="_blank"
                                                href={adsHome[0].link}
                                            >
                                                <LazyLoadImage
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
                                </div>
                                <div className="col-md-6 col-lg-12">
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
            {/* <VideoNews /> */}
            {/* <div className="mix3 mb30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <WidgetTabTwo className="sm-mt0 md-mt0" />
                        </div>
                        <div className="col-md-6 col-xl-5 d-lg-none d-xl-block">
                            <Opinion />
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <Whatsnew title="Whats new" />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="mix_elements">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-md-12">
                            <div className="banner_area mb30 xs-mt60">
                                <Link to="/">
                                    <img src={banner3} alt="banner3" />
                                </Link>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Sports />
                                </div>
                                <div className="col-md-6">
                                    <MostViewThree />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-md-none d-xl-block col-md-12">
                            <div className="row">
                                <div className="col-md-6 col-lg-12">
                                    <FollowUs
                                        title="Contact Us"
                                        className="border-radious5 white_bg padding20 sm-mt30"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-12">
                                    <International />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="space-70" />
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
