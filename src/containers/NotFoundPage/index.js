import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <>
            <div className="inner_table">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="space-50" />
                            <div className="area404 text-center">
                                <img
                                    alt="regio health logo"
                                    src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_news_d00278de38.svg`}
                                />
                            </div>
                            <div className="space-30" />
                            <div className="back4040 text-center col-lg-6 m-auto">
                                <h3>Page not faund</h3>
                                <div className="space-10" />
                                <div>
                                    Sorry the page you were looking for cannot
                                    be found. Try searching for the best match
                                    or browse the links below:
                                </div>
                                <div className="space-20" />
                                <div className="button_group">
                                    <Link to="/" className="cbtn2">
                                        GO TO HOME
                                    </Link>
                                    <Link to="/contact" className="cbtn3">
                                        contact us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
