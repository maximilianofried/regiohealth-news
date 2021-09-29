import React, { useEffect, useState, useRef, useCallback } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { connect } from 'react-redux';
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
