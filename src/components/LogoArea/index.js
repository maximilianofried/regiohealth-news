import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ forceRefresh: true });

const LogoArea = ({ className }) => {
    return (
        <div className={`logo_area ${className || ''}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 align-self-center">
                        <div className="logo" onClick={() => history.push('/')}>
                            <img
                                alt="regio health logo"
                                src={`${process.env.REACT_APP_CMS_URL}/uploads/regiohealth_news_d00278de38.svg`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoArea;
