import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchAds } from '../../store/actions';
import PostGallery from '../../components/PostGallery';
import Metadata from '../../components/Metadata';
import { RG_DESCRIPTION } from '../../utils/constants';

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
            <Metadata
                title="Regionale Gesundheit"
                description={RG_DESCRIPTION}
            />
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
