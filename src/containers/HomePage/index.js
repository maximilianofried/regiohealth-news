import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchArticles, fetchAds} from "../../store/actions";
import PostCarousel from "../../components/PostCarousel";
import PostGallery from "../../components/PostGallery";
import {Helmet} from "react-helmet";

const HomePage = ({latestArticles, topArticles, localArticles, fetchArticles, fetchAds, adsHome}) => {
    useEffect(() => {
        fetchArticles({limit: 30})
        fetchAds()
    }, [])
    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Regio Health</title>
                <meta name="description" content="Regio Health News Website" />
                <link rel="canonical" href="http://regiohealth.news" />
            </Helmet>
            {/* <PostCarousel className="fifth_bg"/> */}
            <PostGallery latestArticles={latestArticles} topArticles={topArticles} adsHome={adsHome} className="fifth_bg"/>
            {/* <FeatureNewsNoImage/> */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {/* <TrendingNews/> */}
                    </div>
                    {/* <div className="col-md-12 col-lg-4">
                        <FollowUs title="Follow Us"/>
                        <MostView/>
                    </div> */}
                </div>
            </div>
            {/* <MixCarousel className="half_bg1"/> */}
            {/* <VideoPost className="pt30 half_bg60"/> */}
            <div className="entertrainments">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="heading">
                                        <h2 className="widget-title">Entertrainment News</h2>
                                    </div>
                                </div>
                            </div>
                            CAROUSEL START
                            <div className="entertrainment_carousel mb30">
                                <div className="entertrainment_item">
                                    <div className="row justify-content-center">
                                        <EntertainmentNews entertainments={articlesData.articles}/>
                                    </div>
                                </div>
                            </div>
                            CAROUSEL END
                            <SportsNews/>
                            <div className="banner_area mt50 mb60 xs-mt60">
                                <Link to="/">
                                    <img src={banner1} alt="banner1"/>
                                </Link>
                            </div>
                            <BusinessNews businessArticles={businessArticles}/>
                        </div> */}
                        {/* <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-12">
                                    <MostShareWidget title="Most share"/>
                                </div>
                                <div className="col-lg-12">
                                    <UpcomingMatches/>
                                </div>
                                <div className="col-lg-12">
                                    <CategoriesWidget/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="banner2 mb30">
                                        <Link to="/">
                                            <img src={banner2} alt="thumb"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <NewsLetter/>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="space-70"/>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        topArticles: state.articles.articles
            .filter((article) =>
                article.categories.some((category) => category.name === "Top")),
        latestArticles: state.articles.articles
            .filter((article) =>
                (article.categories.some((category) => category.name !== "Top"))),
        localArticles: state.articles.articles
            .filter((article) => (article.city ? article.city === state.onInit.onInit.city && article.city !== '' : '')),
        adsHome: state.ads.ads
            .filter((ad) => ad.position === "home")
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: ({limit}) => dispatch(fetchArticles({limit})),
        fetchAds: () => dispatch(fetchAds())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);