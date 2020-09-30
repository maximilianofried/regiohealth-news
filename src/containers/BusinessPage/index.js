import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchArticles, loadNewPage, loadExactPage, fetchAds, showMoreArticles} from "../../store/actions";
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
const businessNews = [
    {
        image: business1,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business2,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business3,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business1,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business2,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business3,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business2,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
    {
        image: business3,
        category: 'uiux.subash',
        date: 'March 26, 2020',
        title: 'Copa America: Luis Suarez from devastated US',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
    },
];
const BusinessPage = ({filteredArticles, fetchArticles, allArticles,showMoreArticles, loadNewPage, loadExactPage, filteredPages, category, fetchAds, adsCategory, currentPage, totalPages, limit}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
        fetchArticles({category, start: 0, limit: 2})
        fetchAds()
    },[])

    const banner350x292 = adsCategory.filter((ad) => ad.size === "s350x292")[0] || {};
    const goToPage = (page) => {
        loadExactPage(page)
    }
    const previousPage = () => {
        loadNewPage({page: -1})
    }
    const nextPage = () => {
        loadNewPage({page: 1})
    }

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
                             {filteredArticles.length > 0 && <div className="row">
                                    <div className="col-12">
                                        <div className="cpagination">
                                            <nav aria-label="Page navigation example">
                                            <a onClick={showMore} className="readmore cursor_pointer">SHOW MORE</a>
                                                {/* <ul className="pagination">

                                                    <li className="page-item">
                                                         <a onClick={showMore}  className="page-link" aria-label="Previous">
                                                                <span aria-hidden="true"><FontAwesome
                                                                    name="caret-left"/></span>
                                                        </a>
                                                    </li>
                                                    {
                                                        [...Array(filteredPages)].map((value,index) => (
                                                            <li key={index} className="page-item" >
                                                                <a  onClick={() => goToPage(index + 1)} className="page-link">{index +1}</a>
                                                            </li>
                                                        ))
                                                    }
                                                    <li className="page-item">
                                                        <a onClick={filteredArticles.length > 0 && currentPage != totalPages ? nextPage : undefined} className="page-link" aria-label="Next">
                                                                <span aria-hidden="true"><FontAwesome
                                                                    name="caret-right"/></span>
                                                        </a>
                                                    </li>
                                                </ul> */}
                                            </nav>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            {/* <WidgetTab/> */}
                            {/* <WidgetTrendingNews/> */}
                            {/* <NewsLetter/>
                            <FollowUs title="Follow Us"/> */}
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
        filteredArticles: state.articles.filteredArticles,
        filteredPages: state.articles.filteredPages,
        adsCategory: state.ads.ads.filter((ad) => ad.position === "category"),
        currentPage: state.articles.currentPage,
        totalPages: state.articles.totalPages,
        allArticles: state.articles.articles,
        limit: state.articles.limit

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: ({category, start, limit}) => dispatch(fetchArticles({category, start, limit})),
        loadNewPage: (page) => dispatch(loadNewPage({page})),
        loadExactPage: (page) => dispatch(loadExactPage({page})),
        fetchAds: () => dispatch(fetchAds()),
        showMoreArticles: () => dispatch(showMoreArticles())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessPage);