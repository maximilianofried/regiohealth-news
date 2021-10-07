import React from 'react';
import FontAwesome from '../uiStyle/FontAwesome';

const FollowUs = ({ className = '', title }) => {
    return (
        <div className={`follow_box widget mb30 ${className}`}>
            <h2 className="widget-title">{title}</h2>
            <div className="space-20" />
            <div className="cta">
                <div className="social2">
                    <ul className="inline">
                        <li>
                            <a
                                href="https://www.facebook.com/RegioHealthNews"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesome name="facebook-f" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/regiohealth.news"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesome name="instagram" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/regiohealth1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesome name="twitter" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="news_letter">
                    <div className="newsletter">
                        <ul className="inline">
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://479eae97.sibforms.com/serve/MUIEAEvroLOl7gAeKgjfkbLkysmfsuAS3Tg6HJf6pH3obY0A938-9XXoyezLoftkDhOte_IPJ4UzRcIaiUwNZVuQPKYRpGLaLvT5TZ5udL7Bhv2Vlh9onojMKyw5UxBFiuAoIcA89fFusp3sdopMgDpkOXeSLuurQRJPPChbLNNYIGmg4-8iLrJQA8l6xcpt-8K9i8z56LepgN9j"
                                >
                                    Newsletter Abonnieren
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowUs;
