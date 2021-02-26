import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    fetchGeoData,
    fetchAds,
    fetchNationalData,
    fetchNationalDataCleanUp,
} from '../../store/actions';
import logo from '../../doc/img/logo/logo.png';
import tempIcon from '../../doc/img/icon/temp.png';
import SearchBox from '../SearchBox';

const LogoAreaTwo = ({ history, fetchGeoData }) => {
    const [search, setSearch] = useState('');
    const [place, setPlace] = useState('');
    // const [radius, setRadius] = useState('5000');
    const [type, setType] = useState('alle');
    const [keyWord, setKeyWord] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        setSearch('');
    };
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
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 align-self-center search_logo">
                        <div className="logo_area_searchbox">
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
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGeoData: (filters) => dispatch(fetchGeoData(filters)),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(LogoAreaTwo));
