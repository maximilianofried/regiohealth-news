import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGeoData, searchByKeyword } from '../../store/actions';
import SearchBox from '../SearchBox';

const LogoAreaTwo = ({ history, fetchGeoData, searchByKeyword }) => {
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

                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 align-self-center search_logo display_search_box">
                        <div className="logo_area_searchbox">
                            <SearchBox
                                fetchGeoData={fetchGeoData}
                                searchByKeyword={searchByKeyword}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
        searchByKeyword: (filters) => dispatch(searchByKeyword(filters)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(LogoAreaTwo));
