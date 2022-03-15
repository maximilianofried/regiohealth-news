import React, { useEffect, useState, useRef, useCallback } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { connect } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import {
    fetchArticleHomepage,
    fetchAds,
    fetchOffers,
    fetchArticlesWissen,
    fetchArticlesGtTips,
} from '../../store/actions';
import Metadata from '../../components/Metadata';
import { RG_DESCRIPTION } from '../../utils/constants';
import PostGalleryTwo from '../../components/PostGalleryTwo';

const HomePage = ({
    fetchArticleHomepage,
    fetchOffers,
    fetchAds,
    mainArticle,
    publisherArticles = [],
    newsArticles,
    latestOffers,
    adsHome,
    fetchArticlesWissen,
    articlesWissen,
    fetchArticlesGtTips,
    articlesGtTips,
}) => {
    useEffect(() => {
        fetchArticleHomepage();
        fetchOffers({ start: 0, limit: 4 });
        fetchAds();
    }, [fetchArticleHomepage, fetchOffers, fetchAds, fetchArticlesWissen]);
    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const [articleLimit, setArticleLimit] = useState(7);

    const fetchArticleHomepageHook = useCallback(() => {
        setArticleLimit(articleLimit + 2);
    }, [articleLimit]);

    useEffect(() => {
        if (articlesWissen.length === 0)
            fetchArticlesWissen({ start: 0, limit: 4 });
    }, [fetchArticlesWissen, articlesWissen.length]);

    useEffect(() => {
        if (articlesGtTips.length === 0)
            fetchArticlesGtTips({ start: 0, limit: 4 });
    }, [fetchArticlesGtTips, articlesGtTips.length]);

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
                buttonText="MEHR INHALT"
                fetchArticleHomepageHook={fetchArticleHomepageHook}
                articlesWissen={articlesWissen}
                articlesGtTips={articlesGtTips}
            />
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
        articlesWissen: state.articlesWissen.articles,
        articlesGtTips: state.articlesGtTips.articles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticleHomepage: () => dispatch(fetchArticleHomepage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
        fetchAds: () => dispatch(fetchAds()),
        fetchArticlesWissen: ({ start, limit }) =>
            dispatch(fetchArticlesWissen({ start, limit })),
        fetchArticlesGtTips: ({ start, limit }) =>
            dispatch(fetchArticlesGtTips({ start, limit })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
