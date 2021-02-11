import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import StickyBox from 'react-sticky-box';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    fetchGeoData,
    fetchAds,
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
import 'react-lazy-load-image-component/src/effects/blur.css';

const SearchPage = ({
    fetchGeoData,
    fetchNationalData,
    fetchNationalDataCleanUp,
    geoData,
    nationalData,
    fetchAds,
    adsCategory,
    limit,
}) => {
    const location = useLocation();
    useEffect(() => {
        console.log(location);
        fetchAds();
        fetchNationalData({
            limit: 6,
            start: 0,
            type: 'article',
            responseType: 'mixed',
            includeCountry: 'Germany',
        });
    }, []);
    const [place, setPlace] = useState(location.place);
    // const [radius, setRadius] = useState('5000');
    const [type, setType] = useState('alle');
    const [keyWord, setKeyWord] = useState('');
    const showMore = () => {
        fetchGeoData({
            limit: limit + 2,
            start: 0,
            place,
            type,
            keyWord,
            responseType: 'mixed',
        });
    };
    const banner350x292 =
        adsCategory.filter((ad) => ad.size === 's350x292')[0] || {};

    return (
        <>
            <BreadCrumb title="Suchportal GesundheitsTicket" />
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="search_page">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>Mach deine Suche:</h5>
                                            {/* <SearchBox
                                                fetchGeoData={fetchGeoData}
                                                place={place}
                                                type={type}
                                                keyWord={keyWord}
                                                setPlace={setPlace}
                                                setType={setType}
                                                setKeyWord={setKeyWord}
                                            /> */}
                                            <div className="space-30" />
                                        </div>
                                    </div>
                                </div>
                                {geoData && (
                                    <div className="row search_results">
                                        <div className="col-12">
                                            <GeoDataNews
                                                fetchGeoData={fetchGeoData}
                                                geoData={geoData}
                                                headerHide
                                            />
                                        </div>
                                    </div>
                                )}
                                {geoData && geoData.length > 0 && (
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
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <WidgetSuchPortal
                                nationalData={nationalData}
                                fetchNationalData={fetchNationalData}
                                fetchNationalDataCleanUp={
                                    fetchNationalDataCleanUp
                                }
                            />
                            <StickyBox offsetTop={20}>
                                {/* <WidgetTrendingNews/> */}
                                {/* <NewsLetter/>
                            <FollowUs title="Follow Us"/> */}
                                <div className="banner2 mb30">
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
                            </StickyBox>
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
        geoData: state.geoData.geoData,
        limit: state.geoData.limit,
        nationalData: state.nationalData.nationalData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
        fetchAds: () => dispatch(fetchAds()),
        fetchNationalData: (filters) => dispatch(fetchNationalData(filters)),
        fetchNationalDataCleanUp: () => dispatch(fetchNationalDataCleanUp()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
