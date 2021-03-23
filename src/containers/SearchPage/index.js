import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import StickyBox from 'react-sticky-box';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    fetchGeoData,
    fetchAds,
    fetchOffers,
    fetchNationalData,
    fetchNationalDataCleanUp,
} from '../../store/actions';
import GeoDataNews from '../../components/geoDataNews';
import BreadCrumb from '../../components/BreadCrumb';
import WidgetSuchPortal from '../../components/WidgetSuchPortal';
import '@reach/combobox/styles.css';
import '@reach/listbox/styles.css';
import BannerSection from '../../components/BannerSection';
import SearchBox from '../../components/SearchBox';
import MostViewTwo from '../../components/MostViewTwo';
import FollowUs from '../../components/FollowUs';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SearchPage = ({
    fetchGeoData,
    fetchNationalData,
    fetchNationalDataCleanUp,
    fetchOffers,
    latestOffers,
    geoData,
    nationalData,
    fetchAds,
    adsCategory,
    limit,
    place,
    type,
    keyword,
}) => {
    const location = useLocation();
    useEffect(() => {
        if (latestOffers.length === 0) fetchOffers({ start: 0, limit: 4 });
        fetchAds();
        fetchNationalData({
            limit: 6,
            start: 0,
            type: 'article',
            responseType: 'mixed',
            includeCountry: 'Germany',
        });
    }, []);
    // const [radius, setRadius] = useState('5000');
    const showMore = () => {
        fetchGeoData({
            limit: limit + 2,
            start: 0,
            place,
            type,
            keyword,
            responseType: 'mixed',
        });
    };
    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};
    console.log(geoData);
    return (
        <>
            {/* <BreadCrumb title="Suchportal GesundheitsTicket" /> */}
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-9">
                            {/* <h5 className="categories_title">Deine Suche:</h5>
                            <div className="space-20" /> */}
                            <div className="search_page">
                                {geoData && geoData.length > 0 ? (
                                    <GeoDataNews
                                        fetchGeoData={fetchGeoData}
                                        geoData={geoData}
                                        headerHide
                                    />
                                ) : (
                                    'Leider konnten wir keine Ergebnisse finden.'
                                )}
                                {/* <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>Deine Suche:</h5>
                                            <SearchBox
                                                fetchGeoData={fetchGeoData}
                                                place={place}
                                                type={type}
                                                keyWord={keyWord}
                                                setPlace={setPlace}
                                                setType={setType}
                                                setKeyWord={setKeyWord}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                {/* {geoData && (
                                    <div className="row search_results">
                                        <div className="col-12">
                                            <GeoDataNews
                                                fetchGeoData={fetchGeoData}
                                                geoData={geoData}
                                                headerHide
                                            />
                                        </div>
                                    </div>
                                )} */}
                                <div className="space-20" />
                                {geoData && geoData.length > 0 && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="cpagination">
                                                <button
                                                    type="button"
                                                    onClick={showMore}
                                                    className="more_articles cursor_pointer"
                                                >
                                                    MEHR ANZEIGEN{' '}
                                                    <FontAwesome name="angle-double-down" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* <BannerSection /> */}
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <FollowUs
                                title="FOLGEN SIE UNS"
                                className="border-radious5 white_bg padding20 sm-mt30"
                            />
                            <WidgetSuchPortal
                                nationalData={nationalData}
                                fetchNationalData={fetchNationalData}
                                fetchNationalDataCleanUp={
                                    fetchNationalDataCleanUp
                                }
                            />
                            <div className="banner2 mb30 border-radious5  mt30">
                                <a href={banner350x292.link} target="_blank">
                                    {banner350x292.image &&
                                        banner350x292.image.length > 0 && (
                                            <LazyLoadImage
                                                src={
                                                    process.env
                                                        .REACT_APP_CMS_URL +
                                                    banner350x292.image[0].url
                                                }
                                                alt="banner"
                                                effect="blur"
                                                visibleByDefault="true"
                                            />
                                        )}
                                </a>
                            </div>
                            <MostViewTwo
                                title="ANGEBOTE"
                                latestOffers={latestOffers}
                            />
                            {/* <StickyBox offsetTop={20}>
                                <div className="banner2 mb30 mt30">
                                    <a
                                        href={banner350x292.link}
                                        target="_blank"
                                    >
                                        {banner350x292.image &&
                                            banner350x292.image.length > 0 && (
                                                <LazyLoadImage
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        banner350x292.image[0]
                                                            .url
                                                    }
                                                    alt="banner"
                                                    effect="blur"
                                                />
                                            )}
                                    </a>
                                </div>
                            </StickyBox> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-40" />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === 'category'),
        geoData: state.geoData.geoData,
        limit: state.geoData.limit,
        nationalData: state.nationalData.nationalData,
        latestOffers: state.offers.offers,
        place: state.searchData.place,
        type: state.searchData.type,
        keyword: state.searchData.keyword,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
        fetchAds: () => dispatch(fetchAds()),
        fetchNationalData: (filters) => dispatch(fetchNationalData(filters)),
        fetchNationalDataCleanUp: () => dispatch(fetchNationalDataCleanUp()),
        fetchOffers: ({ start, limit }) =>
            dispatch(fetchOffers({ start, limit })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
