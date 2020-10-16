import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles, fetchAds, showMoreArticles } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import BusinessNews from '../../components/BusinessNews';
import BannerSection from '../../components/BannerSection';
import Metadata from '../../components/Metadata';
import { CMS_LINK } from '../../utils/constants';

const CategoryPage = ({
    fetchArticles,
    allArticles,
    category,
    fetchAds,
    adsCategory,
    limit,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticles({ category, start: 0, limit: 2 });
        fetchAds();
    }, []);

    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    const showMore = () => {
        fetchArticles({ category, start: 0, limit: limit + 2 });
    };

    return (
        <>
            <Metadata
                title={category}
                description={category}
                url={`${process.env.REACT_APP_BASE_PAGE_URL}/${category}`}
            />
            <BreadCrumb title={category} />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="businerss_news">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>Category: {category}</h5>
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
        fetchArticles: ({ category, start, limit }) =>
            dispatch(fetchArticles({ category, start, limit })),
        fetchAds: () => dispatch(fetchAds()),
        showMoreArticles: () => dispatch(showMoreArticles()),
    };
};

CategoryPage.propTypes = {
    fetchArticles: PropTypes.func,
    allArticles: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.string,
    fetchAds: PropTypes.func,
    adsCategory: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
};

CategoryPage.defaultProps = {
    fetchArticles: () => {},
    allArticles: [],
    category: '',
    fetchAds: () => {},
    adsCategory: [],
    limit: 2,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
