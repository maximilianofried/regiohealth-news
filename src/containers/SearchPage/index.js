import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    fetchGeoData,
    fetchAds,
    fetchOffers,
    fetchNationalData,
    fetchNationalDataCleanUp,
} from '../../store/actions';
import GeoDataNews from '../../components/geoDataNews';
import WidgetSuchPortal from '../../components/WidgetSuchPortal';
import '@reach/combobox/styles.css';
import '@reach/listbox/styles.css';
import MostViewTwo from '../../components/MostViewTwo';
import FollowUs from '../../components/FollowUs';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverIframe from '../../components/AdserverIframe';

const SearchPage = ({
    fetchGeoData,
    fetchNationalData,
    fetchNationalDataCleanUp,
    latestOffers,
    geoData,
    nationalData,
    limit,
    place,
    type,
    keyword,
}) => {
    const fetchSearchHook = useCallback(() => {
        fetchGeoData({
            limit: limit + 2,
            start: 0,
            place,
            type,
            keyword,
            responseType: 'mixed',
        });
    }, [fetchGeoData, keyword, limit, place, type]);

    const displayOffers = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <>
            <div className="archives padding-top-30">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-9">
                            <div className="search_page">
                                {geoData && geoData.length > 0 ? (
                                    <GeoDataNews
                                        fetchGeoData={fetchGeoData}
                                        geoData={geoData}
                                        fetchContentHook={fetchSearchHook}
                                        headerHide
                                    />
                                ) : (
                                    'Leider konnten wir keine Ergebnisse finden.'
                                )}
                                <div className="space-20" />
                            </div>
                        </div>
                        <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                            <AdserverIframe />
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
                            {displayOffers && (
                                <MostViewTwo
                                    title="ANGEBOTE"
                                    latestOffers={latestOffers}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
