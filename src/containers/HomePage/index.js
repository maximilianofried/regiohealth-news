import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchArticles, fetchAds } from '../../store/actions';
import PostGallery from '../../components/PostGallery';

const HomePage = ({
    latestArticles,
    topArticles,
    fetchArticles,
    fetchAds,
    adsHome,
}) => {
    useEffect(() => {
        fetchArticles({ limit: 30 });
        fetchAds();
    }, []);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Regio Health</title>
                <meta name="description" content="Regio Health News Website" />
                <link rel="canonical" href="http://regiohealth.news" />
            </Helmet>
            <PostGallery
                latestArticles={latestArticles}
                topArticles={topArticles}
                adsHome={adsHome}
                className="fifth_bg"
            />
            <div className="space-70" />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        topArticles: state.articles.articles.filter((article) =>
            article.categories.some((category) => category.name === 'Top')
        ),
        latestArticles: state.articles.articles.filter((article) =>
            article.categories.some((category) => category.name !== 'Top')
        ),
        localArticles: state.articles.articles.filter((article) =>
            article.city
                ? article.city === state.onInit.onInit.city &&
                  article.city !== ''
                : ''
        ),
        adsHome: state.ads.ads.filter((ad) => ad.position === 'home'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ limit }) => dispatch(fetchArticles({ limit })),
        fetchAds: () => dispatch(fetchAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
