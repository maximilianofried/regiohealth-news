import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchArticles,fetchArticlesGeo, cleanFilteredArticles, loadNewPage, loadExactPage, fetchAds} from "../../store/actions";
import BreadCrumb from "../../components/BreadCrumb";
import BusinessNews from "../../components/BusinessNews";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import {Link, useLocation} from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import WidgetTrendingNews from "../../components/WidgetTrendingNews";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css"

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
const SearchPage = ({filteredArticles, fetchArticles, fetchArticlesGeo, cleanFilteredArticles, loadNewPage, loadExactPage, filteredPages, category, fetchAds, adsCategory, currentPage, totalPages}) => {
    useEffect(() => {
        fetchAds()
        cleanFilteredArticles()
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
                                            <h5>Search by Location:</h5>
                                            <Search fetchArticlesGeo={fetchArticlesGeo} />
                                            <div className="space-70"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <BusinessNews businessArticles={filteredArticles} headerHide={true}/>
                                    </div>
                                </div>
                 { filteredArticles.length > 0 && <div className="row">
                                <div className="col-12">
                                    <div className="cpagination">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                        <a onClick={filteredArticles.length > 0 && currentPage != 1 ? previousPage : undefined} className="page-link" aria-label="Previous">
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
                                            </ul>
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

const Search = ({fetchArticlesGeo}) => {
    const options = {
        types: ['(cities)'],
        componentRestrictions: { country: ["de", 'pl'] }
     };

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({ requestOptions: options})

    const onComboSelect = (address) => {
        setValue(address, false);
        clearSuggestions();
        getGeocode({ address })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            fetchArticlesGeo({ lat, lng });
            console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
            console.log("😱 Error: ", error);
        });
    }
    return (
    <Combobox onSelect={(address) => onComboSelect(address)}>
        <ComboboxInput
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
            disabled={!ready}
            placeholder="City"
            />
        <ComboboxPopover className="pop_over">
            {status === "OK" && data.map((result, index) =>
            {
            return <ComboboxOption key={index} value={result.description} />}
            )}
        </ComboboxPopover>
    </Combobox>
    );
}

const mapStateToProps = state => {
    return {
        filteredArticles: state.articles.filteredArticles,
        filteredPages: state.articles.filteredPages,
        adsCategory: state.ads.ads.filter((ad) => ad.position === "category"),
        currentPage: state.articles.currentPage,
        totalPages: state.articles.totalPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: ({city}) => dispatch(fetchArticles({city})),
        fetchArticlesGeo: ({lat, lng}) => dispatch(fetchArticlesGeo({lat, lng})),
        loadNewPage: (page) => dispatch(loadNewPage({page})),
        loadExactPage: (page) => dispatch(loadExactPage({page})),
        fetchAds: () => dispatch(fetchAds()),
        cleanFilteredArticles: () => dispatch(cleanFilteredArticles())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);