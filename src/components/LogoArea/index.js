import React from 'react';
import { withRouter } from 'react-router-dom';

const LogoArea = ({ className, history }) => {
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

export default withRouter(LogoArea);
