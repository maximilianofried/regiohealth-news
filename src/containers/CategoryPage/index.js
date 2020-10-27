import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    fetchArticles,
    fetchAds,
    fetchArticlesCleanUp,
} from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import BusinessNews from '../../components/BusinessNews';
import BannerSection from '../../components/BannerSection';
import Metadata from '../../components/Metadata';
import { CMS_LINK } from '../../utils/constants';

const CategoryPage = ({
    fetchArticles,
    fetchArticlesCleanUp,
    allArticles,
    name,
    fetchAds,
    adsCategory,
    limit,
    categories,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticlesCleanUp();
        if (categories.length > 0)
            fetchArticles({ categories, start: 0, limit: 2 });
        fetchAds();
    }, []);

    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    const showMore = () => {
        if (categories.length > 0)
            fetchArticles({ categories, start: 0, limit: limit + 2 });
    };

    return (
        <>
            <Metadata
                title={name}
                description={name}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${name}`}
            />
            <BreadCrumb title={name} />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="businerss_news">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>{name}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <BusinessNews
                                            businessArticles={allArticles}
                                            headerHide
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cpagination">
                                            <button
                                                type="button"
                                                onClick={showMore}
                                                className="readmore cursor_pointer"
                                            >
                                                SHOW MORE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-70" />
                        <div className="col-md-6 col-lg-4">
                            <div className="banner2 mb30">
                                <a href={banner350x292.link} target="_blank">
                                    {banner350x292.image &&
                                        banner350x292.image.length > 0 && (
                                            <img
                                                src={
                                                    CMS_LINK +
                                                    banner350x292.image[0].url
                                                }
                                                alt="banner"
                                            />
                                        )}
                                </a>
                            </div>
                            <iframe
                                title="advertisement"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://www.betterplace-widget.org/projects/25999?l=de"
                                width="100%"
                                height="320"
                                style={{ border: 0, padding: 0, margin: 0 }}
                            >
                                Informieren und spenden:{' '}
                                <a
                                    href="https://www.betterplace.org/de/projects/25999-nothilfe-fuer-fluechtlinge-international-moas-migrant-offshore-aid-station"
                                    target="_blank"
                                >
                                    „Nothilfe für Flüchtlinge international -
                                    MOAS Migrant Offshore Aid Station“
                                </a>{' '}
                                auf betterplace.org öffnen.
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-70" />
            <BannerSection />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === 'category'),
        allArticles: state.articles.articles,
        limit: state.articles.limit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: ({ categories, start, limit }) =>
            dispatch(fetchArticles({ categories, start, limit })),
        fetchAds: () => dispatch(fetchAds()),
        fetchArticlesCleanUp: () => dispatch(fetchArticlesCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
