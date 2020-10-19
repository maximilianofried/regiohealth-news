import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FooterCopyright from '../FooterCopyright';
import FontAwesome from '../uiStyle/FontAwesome';
import { ReactComponent as GtLogo } from '../../doc/img/gt-logo/logo-gt.svg';
import { fetchPages } from '../../store/actions';

const FooterArea = ({ className, fetchPages, pages }) => {
    useEffect(() => {
        fetchPages();
    }, []);
    const pagesMenu = pages.pages;
    return (
        <div className={`footer footer_area1 ${className || ''}`}>
            <div className="container">
                <div className="cta">
                    <div className="row">
                        <div className="col-8 col-md-7 ">
                            <div className="social2 partner_logos">
                                <ul className="inline">
                                    <li>
                                        <GtLogo className="gt_logo" />
                                    </li>
                                    <li>
                                        <img
                                            alt="logo"
                                            className="gt_logo"
                                            src="https://www.regio-health.de/cms/wp-content/uploads/2020/10/regiohealth-b.svg"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            alt="logo"
                                            className="gt_logo"
                                            src="https://www.regio-health.de/cms/wp-content/uploads/2020/10/regiohealth-k.svg"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            alt="logo"
                                            className="gt_logo"
                                            src="https://www.regio-health.de/cms/wp-content/uploads/2020/09/LOGO-WF.svg"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            alt="logo"
                                            className="gt_logo"
                                            src="https://www.gesundheitsticket.de/woak-logo.svg"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4 col-md-5 align-end">
                            <div className="social2">
                                <ul className="inline">
                                    <li>
                                        <a
                                            href="https://www.facebook.com/RegioHealthNews"
                                            target="_blank"
                                        >
                                            <FontAwesome name="facebook-f" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.instagram.com/regiohealth.news"
                                            target="_blank"
                                        >
                                            <FontAwesome name="instagram" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCopyright pagesMenu={pagesMenu} />
        </div>
    );
};

FooterArea.propTypes = {
    className: PropTypes.string,
};

FooterArea.defaultProps = {
    className: '',
};

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPages: () => dispatch(fetchPages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterArea);
