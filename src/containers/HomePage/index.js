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
    adsHome,
}) => {
    useEffect(() => {
        fetchArticleHomepage();
        fetchOffers({ start: 0, limit: 4 });
        fetchAds();
    }, [fetchArticleHomepage, fetchOffers, fetchAds]);
    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const [articleLimit, setArticleLimit] = useState(4);

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
                adsHome={adsHome}
                latestOffers={latestOffers}
                buttonText="MEHR INHALT"
                fetchArticleHomepageHook={fetchArticleHomepageHook}
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
