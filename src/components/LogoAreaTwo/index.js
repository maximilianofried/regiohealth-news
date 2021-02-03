import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../doc/img/logo/logo.png';
import tempIcon from '../../doc/img/icon/temp.png';

const LogoAreaTwo = () => {
    const [search, setSearch] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        setSearch('');
    };
    return (
        <div className="logo_area white_bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 align-self-center">
                        <div
                            className="logo"
                            // onClick={() => history.push('/home-two')}
                        >
                            <img
                                alt="regio health logo"
                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_news_d00278de38.svg`}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        {/* <div className="signup_form header_search3">
                            <form onSubmit={submitHandler}>
                                <input
                                    className="signup"
                                    type="email"
                                    placeholder="Your email address"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button type="submit" className="cbtn">
                                    sign up
                                </button>
                            </form>
                        </div> */}
                    </div>
                    <div className="col-lg-2 align-self-center offset-lg-1"></div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LogoAreaTwo);
