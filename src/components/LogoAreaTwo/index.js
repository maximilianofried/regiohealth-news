import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {
    fetchGeoData,
    fetchAds,
    fetchNationalData,
    fetchNationalDataCleanUp,
} from '../../store/actions';
import SearchBox from '../SearchBox';

const LogoAreaTwo = ({ history, fetchGeoData, displaySearchBox }) => {
    // const [radius, setRadius] = useState('5000');
    return (
        <div className="logo_area white_bg">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 align-self-center">
                        <div className="logo" onClick={() => history.push('/')}>
                            <img
                                alt="regio health logo"
                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_news_16cb0d731e.svg`}
                            />
                        </div>
                    </div>

                    <div
                        className={`col-sm-12 col-md-8 col-lg-9 col-xl-9 align-self-center search_logo  fadeIn ${
                            !displaySearchBox ? 'display_search_box' : ''
                        }`}
                    >
                        <div className="logo_area_searchbox">
                            <SearchBox fetchGeoData={fetchGeoData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        displaySearchBox: state.searchData.displaySearchBox,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LogoAreaTwo));
