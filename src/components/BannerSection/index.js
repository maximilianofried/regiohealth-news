import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchAds} from "../../store/actions";
import bannerImg from '../../doc/img/bg/banner1.png';
import {Link} from "react-router-dom";
const CMS_LINK = "https://cms.gesundheitsticket.de";

const BannerSection = ({className, fetchAds, adsCategory}) => {
    useEffect(() => {
        fetchAds()
    },[])
    const banner729x90 = adsCategory.filter((ad) => ad.size === "s729x90")[0] || {};
    return (
        <div className={`${className ? className : 'padding5050 fourth_bg'}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="banner1">
                            <a href={banner729x90.link} target="_blank">
                            {banner729x90.image && banner729x90.image.length > 0 && <img src={CMS_LINK + banner729x90.image[0].url} alt="banner"/>}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        adsCategory: state.ads.ads.filter((ad) => ad.position === "bannerSection")
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
)(BannerSection);