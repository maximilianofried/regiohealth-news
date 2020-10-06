import React, {Fragment, useEffect} from 'react';
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';
import {fetchAds} from "../../store/actions";
import {Link} from "react-router-dom";
import logo from '../../doc/img/logo/logo.png';
import logoDark from '../../doc/img/logo/footer_logo.png';
import {ReactComponent as GtLogo} from '../../doc/img/gt-logo/logo-gt3.svg';
import tp_banner from '../../doc/img/bg/banner1.png';
const history = createBrowserHistory({forceRefresh:true});
const CMS_LINK = "https://cms.gesundheitsticket.de";

const LogoArea = ({className, dark, fetchAds, adsCategory}) => {
    useEffect(() => {
        fetchAds()
    },[])
    const banner729x90 = adsCategory.filter((ad) => ad.size === "s729x90")[0] || {};

    return (
        <div className={`logo_area ${className ? className : ''}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 align-self-center">
                        <div className="logo">
                                <img src="https://www.regio-health.de/cms/wp-content/uploads/2020/10/regiohealth-news.svg"  onClick={() => history.push('/')} />
                        </div>
                    </div>
                    {/* <div className="col-lg-8 align-self-center">
                        <div className="banner1">
                            <a href={banner729x90.link} target="_blank">
                                {banner729x90.image && banner729x90.image.length > 0 && <img src={CMS_LINK + banner729x90.image[0].url} alt="banner"/>}
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === "topBar")
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAds: () => dispatch(fetchAds())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoArea);