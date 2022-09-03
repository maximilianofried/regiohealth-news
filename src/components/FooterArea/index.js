import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FooterCopyright from '../FooterCopyright';
import { fetchPages } from '../../store/actions';
import mockPages from '../../mockdata/pages.json';
import 'react-lazy-load-image-component/src/effects/blur.css';

const FooterArea = ({ className, fetchPages, pages }) => {
    // useEffect(() => {
    //     fetchPages();
    // }, [fetchPages]);
    const pagesMenu = mockPages;
    return (
        <div className={`footer footer_area1 ${className || ''}`}>
            <div className="container">
                <div className="cta">
                    <div className="row">
                        <div className="col-12 ">
                            <div className=" partner_logos">
                                <ul className="inline">
                                    <li>
                                        <a
                                            href="https://www.gesundheitsticket.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/logo_gt3_d2142e249a.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/regio-health-betriebliches-gesundheitsmanagement-in-regionalen-mikrozellen/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/regiohealth_b_7bbe36540e.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.regio-health.de"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/regiohealth_k_45f8d252a5.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.diewohlfuehler.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/LOGO_WF_3f61100d67.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src="https://www.gesundheitsticket.de/woak-logo.svg"
                                                effect="blur"
                                            />
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

// const mapStateToProps = (state) => {
//     return {
//         pages: state.pages,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchPages: () => dispatch(fetchPages()),
//     };
// };

export default FooterArea;
