import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchAds, fetchOffers } from '../../store/actions';
import PostGallery from '../../components/PostGallery';
import Metadata from '../../components/Metadata';
import { RG_DESCRIPTION } from '../../utils/constants';

const HomePage = ({
    latestArticles,
    latestOffers,
    topArticles,
    fetchArticles,
    fetchAds,
    adsHome,
}) => {
    useEffect(() => {
        fetchArticles({ limit: 30 });
        fetchOffers({ start: 0, limit: 4 });
        fetchAds();
    }, []);
    return (
        <>
            <Metadata
                title="Regionale Gesundheit"
                description={RG_DESCRIPTION}
            />
            <PostGallery
                latestArticles={latestArticles}
                latestOffers={latestOffers}
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
        topArticles: state.articles.articles.filter(
            (article) => article.isTopArticle
        ),
        latestArticles: state.articles.articles.filter(
            (article) => !article.isTopArticle
        ),
        localArticles: state.articles.articles.filter((article) =>
            article.city
                ? article.city === state.onInit.onInit.city &&
                  article.city !== ''
                : ''
        ),
        latestOffers: state.offers.offers,
        adsHome: state.ads.ads.filter((ad) => ad.position === 'home'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ limit }) => dispatch(fetchArticles({ limit })),
        fetchAds: () => dispatch(fetchAds()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
