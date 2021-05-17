import React, { Fragment, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swiper from 'react-id-swiper';
import FontAwesome from '../uiStyle/FontAwesome';
import { mostViewSort } from '../../utils/commonFunctions';

const MostViewTwo = ({ title, latestOffers }) => {
    // const [swiper, setSwiper] = useState(null);

    // const goNext = () => {
    //     if (swiper !== null) {
    //         swiper.slideNext();
    //     }
    // };

    // const goPrev = () => {
    //     if (swiper !== null) {
    //         swiper.slidePrev();
    //     }
    // };

    // const params = {
    //     slidesPerView: 1,
    //     slidesPerColumn: 6,
    // };
    return (
        <div className="most_widget3 padding20 white_bg border-radious5 mb30 sm-mt30">
            <div className="heading">
                <h2 className="widget-title">{title || 'Most View'}</h2>
            </div>
            <div className="space-20" />
            <div className="post_type2_carousel multipleRowCarousel pt12_wrapper nav_style1">
                {/* CAROUSEL START */}
                {latestOffers.map((item, i) => {
                    if (item.end > moment().format('YYYY-MM-DD'))
                        return (
                            <div
                                key={item.id}
                                className="single_post widgets_small type8 type17"
                            >
                                <div className="post_img">
                                    <div className="img_wrap_2">
                                        {item.main_image && (
                                            <Link to={`/offer/${item.slug}`}>
                                                <img
                                                    className="lazyLoad cropimage"
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        (item.main_image.formats
                                                            ? item.main_image
                                                                  .formats
                                                                  .thumbnail.url
                                                            : item.main_image
                                                                  .url)
                                                    }
                                                    alt="thumb"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="single_post_text">
                                    <h4>
                                        <Link to={`/offer/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    <div className="meta2">
                                        <p>
                                            {moment(item.publishAt).format(
                                                'LL'
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-10" />
                                </div>
                            </div>
                        );
                    return '';
                })}
                {/* <div className="navBtns">
                    <div onClick={goPrev} className="navBtn prevtBtn">
                        <FontAwesome name="angle-left" />
                    </div>
                    <div onClick={goNext} className="navBtn nextBtn">
                        <FontAwesome name="angle-right" />
                    </div>
                </div> */}
                {/* CAROUSEL END */}
            </div>
        </div>
    );
};

export default MostViewTwo;
