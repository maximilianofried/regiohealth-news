import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchGeoData, fetchAds } from '../../store/actions';
import GeoDataNews from '../../components/geoDataNews';
import BreadCrumb from '../../components/BreadCrumb';
// import BusinessNews from '../../components/BusinessNews';
import '@reach/combobox/styles.css';
import '@reach/listbox/styles.css';
import BannerSection from '../../components/BannerSection';
import SearchBox from '../../components/SearchBox';

const SearchPage = ({
    fetchGeoData,
    geoData,
    fetchAds,
    adsCategory,
    limit,
}) => {
    useEffect(() => {
        fetchAds();
    }, []);
    const [place, setPlace] = useState({ lat: 52.56, lng: 13.14 });
    const [radius, setRadius] = useState('5000');
    const [type, setType] = useState('alle');
    const showMore = () => {
        fetchGeoData({
            limit: limit + 2,
            start: 0,
            place,
            radius,
            type,
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
                            <div className="businerss_news">
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="categories_title">
                                            <h5>Search by Location:</h5>
                                            <SearchBox
                                                fetchGeoData={fetchGeoData}
                                                place={place}
                                                radius={radius}
                                                type={type}
                                                setPlace={setPlace}
                                                setRadius={setRadius}
                                                setType={setType}
                                            />
                                            <div className="space-70" />
                                        </div>
                                    </div>
                                </div>
                                {geoData && (
                                    <div className="row">
                                        <div className="col-12">
                                            <GeoDataNews
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
                            {/* <WidgetTab/> */}
                            {/* <WidgetTrendingNews/> */}
                            {/* <NewsLetter/>
                            <FollowUs title="Follow Us"/> */}
                            <div className="banner2 mb30">
                                <a href={banner350x292.link} target="_blank">
                                    {banner350x292.image &&
                                        banner350x292.image.length > 0 && (
                                            <img
                                                src={
                                                    process.env
                                                        .REACT_APP_CMS_URL +
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
        geoData: state.geoData.geoData,
        limit: state.geoData.limit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
        fetchAds: () => dispatch(fetchAds()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
