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
                        <div className="col-12">
                            <div className="partner_logos">
                                <ul className="inline">
                                    <li>
                                        <a
                                            href="https://www.regiohealth.net/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/rh_network_logo_color_2_faf21302dd.png`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.gesundheitsticket.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/gt_efa4a1e5e7.png`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.healthvoucher.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                alt="logo"
                                                className="hv_logo"
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/hv_3aa1d111c5.png`}
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
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/woak_8274d2bfb2.png`}
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
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/wo_4063ad0742.png`}
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
                                                src={`${process.env.REACT_APP_CMS_URL_IMAGE}/uploads/rh_kommune_d217b6520c.png`}
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
