import React from 'react';
import PropTypes from 'prop-types';
import FooterCopyright from '../FooterCopyright';
import FontAwesome from '../uiStyle/FontAwesome';
import { ReactComponent as GtLogo } from '../../doc/img/gt-logo/logo-gt.svg';

const FooterArea = ({ className }) => {
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
                        <div className="col-5 col-md-5 align-end">
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
            <FooterCopyright />
        </div>
    );
};

FooterArea.propTypes = {
    className: PropTypes.string,
};

FooterArea.defaultProps = {
    className: '',
};

export default FooterArea;
