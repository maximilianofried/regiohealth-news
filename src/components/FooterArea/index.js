import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FooterCopyright from '../FooterCopyright';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchPages } from '../../store/actions';
import mockPages from '../../mockdata/pages.json';

const FooterArea = ({ className, fetchPages, pages }) => {
    useEffect(() => {
        fetchPages();
    }, []);
    const pagesMenu = pages && pages.pages ? pages.pages : mockPages;
    return (
        <div className={`footer footer_area1 ${className || ''}`}>
            <div className="container">
                <div className="cta">
                    <div className="row">
                        <div className="col-8 col-md-7 ">
                            <div className=" partner_logos">
                                <ul className="inline">
                                    <li>
                                        <a
                                            href="https://www.gesundheitsticket.de/"
                                            target="_blank"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/logo_gt_1c7fd3b58d.svg`}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://479eae97.sibforms.com/serve/MUIEABDskcRWZNUAk0yP8ZUqPl1a5MHmJTQB5Fr5xAJqUy33gngrAR3iLs9mHmq43YZn53_Mi7sphUtUjVnjnAzKiSls8d_oN2F5QvKKBD-9RRa8Get_Kx84EWHuR97qhwolS19aU7BSUvLQ8ss2qJ9LKOQdUhZjmHZ0xOVcm4q89f53HEwuo0I-nst32qIyVtdxBsIYplmm48M0"
                                            target="_blank"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_b_2504b34553.svg`}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/gesundheit-in-der-kommune/"
                                            target="_blank"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_k_7e8e5e4a52.svg`}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.diewohlfuehler.de/"
                                            target="_blank"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/LOGO_WF_657d71e353.svg`}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/"
                                            target="_blank"
                                        >
                                            <img
                                                alt="logo"
                                                className="gt_logo"
                                                src="https://www.gesundheitsticket.de/woak-logo.svg"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-8 col-md-3 ">
                            <div className="newsletter">
                                <ul className="inline">
                                    <li>
                                        <a
                                            target="_blank"
                                            href="https://479eae97.sibforms.com/serve/MUIEABvaG_MM21JAw8QsImj-sWdi4lVwK67sgudJVsYafLIXEMfwXS4woB57pfptvRoaNOKeT7hdpb9kWwBjfjAf9tm5OqfJ2krTQiTyUFj6VLuNaWmvQ46j05EWn724y3-qaKSgfHlApRwzpZJ07c5eAnj3DpLsOrs5_piQ42M4faevLccJOVgaSCcih2HVGbNutNegZwz0W0UI"
                                        >
                                            Newsletter{' '}
                                            <FontAwesome name="newspaper-o" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4 col-md-2 align-end">
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
