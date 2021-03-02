import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FooterCopyright from '../FooterCopyright';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchPages } from '../../store/actions';
import mockPages from '../../mockdata/pages.json';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                        <div className="col-8 col-md-12 ">
                            <div className=" partner_logos">
                                <ul className="inline">
                                    <li>
                                        <a
                                            href="https://www.gesundheitsticket.de/"
                                            target="_blank"
                                        >
                                            <LazyLoadImage
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/logo_gt3_d2142e249a.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://479eae97.sibforms.com/serve/MUIEAEvroLOl7gAeKgjfkbLkysmfsuAS3Tg6HJf6pH3obY0A938-9XXoyezLoftkDhOte_IPJ4UzRcIaiUwNZVuQPKYRpGLaLvT5TZ5udL7Bhv2Vlh9onojMKyw5UxBFiuAoIcA89fFusp3sdopMgDpkOXeSLuurQRJPPChbLNNYIGmg4-8iLrJQA8l6xcpt-8K9i8z56LepgN9j"
                                            target="_blank"
                                        >
                                            <LazyLoadImage
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_b_7bbe36540e.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/gesundheit-in-der-kommune/"
                                            target="_blank"
                                        >
                                            <LazyLoadImage
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_k_45f8d252a5.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.diewohlfuehler.de/"
                                            target="_blank"
                                        >
                                            <LazyLoadImage
                                                alt="logo"
                                                className="gt_logo"
                                                src={`${process.env.REACT_APP_CMS_URL}/uploads/LOGO_WF_3f61100d67.svg`}
                                                effect="blur"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="http://diewohlfuehler-akademie.de/"
                                            target="_blank"
                                        >
                                            <LazyLoadImage
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
                        {/* <div className="col-8 col-md-3 ">
                            <div className="newsletter">
                                <ul className="inline">
                                    <li>
                                        <a
                                            target="_blank"
                                            href="https://479eae97.sibforms.com/serve/MUIEAEvroLOl7gAeKgjfkbLkysmfsuAS3Tg6HJf6pH3obY0A938-9XXoyezLoftkDhOte_IPJ4UzRcIaiUwNZVuQPKYRpGLaLvT5TZ5udL7Bhv2Vlh9onojMKyw5UxBFiuAoIcA89fFusp3sdopMgDpkOXeSLuurQRJPPChbLNNYIGmg4-8iLrJQA8l6xcpt-8K9i8z56LepgN9j"
                                        >
                                            Newsletter{' '}
                                            <FontAwesome name="newspaper-o" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        {/* <div className="col-4 col-md-2 align-end">
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
                        </div> */}
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
