import React, { useEffect, useState, useRef, useCallback } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { connect } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import {
    fetchArticleHomepage,
    fetchAds,
    fetchOffers,
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
    wissenArticles,
    gtTippsArticles,
}) => {
    useEffect(() => {
        fetchArticleHomepage();
        fetchOffers({ start: 0, limit: 4 });
    }, [fetchArticleHomepage, fetchOffers]);
    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const [articleLimit, setArticleLimit] = useState(7);

    const fetchArticleHomepageHook = useCallback(() => {
        setArticleLimit(articleLimit + 2);
    }, [articleLimit]);

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
                latestOffers={latestOffers}
                buttonText="MEHR INHALT"
                fetchArticleHomepageHook={fetchArticleHomepageHook}
                wissenArticles={wissenArticles}
                gtTippsArticles={gtTippsArticles}
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
        wissenArticles: state.articles.articlesHomepage.wissenArticles,
        gtTippsArticles: state.articles.articlesHomepage.gtTippsArticles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticleHomepage: () => dispatch(fetchArticleHomepage()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
