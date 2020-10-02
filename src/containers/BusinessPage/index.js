import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchArticles, fetchAds, showMoreArticles} from "../../store/actions";
import BreadCrumb from "../../components/BreadCrumb";
import BusinessNews from "../../components/BusinessNews";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import {Link, useLocation} from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";

// images
import business1 from '../../doc/img/business/business1.jpg';
import business2 from '../../doc/img/business/business2.jpg';
import business3 from '../../doc/img/business/business3.jpg';
import banner2 from "../../doc/img/bg/sidebar-1.png";
import akon1 from "../../doc/img/ads/akon-1.jpg"
import BannerSection from "../../components/BannerSection";
const CMS_LINK = "https://cms.gesundheitsticket.de";

const BusinessPage = ({filteredArticles, fetchArticles, allArticles,showMoreArticles, loadNewPage, loadExactPage, filteredPages, category, fetchAds, adsCategory, currentPage, totalPages, limit}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        fetchArticles({category, start: 0, limit: 2})
        fetchAds()
    },[])

    const banner350x292 = adsCategory.filter((ad) => ad.size === "s350x292")[0] || {};

    const showMore = () => {
        fetchArticles({category, start: 0, limit: limit + 2})
    }

    return (
        <Fragment>
            <BreadCrumb title={category}/>
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
                                        <BusinessNews businessArticles={allArticles} headerHide={true}/>
                                    </div>
                                </div>
                              <div className="row">
                                    <div className="col-12">
                                        <div className="cpagination">
                                            <a onClick={showMore} className="readmore cursor_pointer">SHOW MORE</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-70"/>
                        <div className="col-md-6 col-lg-4">
                            <div className="banner2 mb30">
                                <a href={banner350x292.link} target="_blank">
                                {banner350x292.image && banner350x292.image.length > 0 && <img src={CMS_LINK + banner350x292.image[0].url} alt="banner"/>}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-70"/>
            <BannerSection/>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === "category"),
        allArticles: state.articles.articles,
        limit: state.articles.limit

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: ({category, start, limit}) => dispatch(fetchArticles({category, start, limit})),
        fetchAds: () => dispatch(fetchAds()),
        showMoreArticles: () => dispatch(showMoreArticles())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessPage);