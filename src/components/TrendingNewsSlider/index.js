import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import moment from 'moment';
import FontAwesome from '../uiStyle/FontAwesome';

const TrendingNewsSlider = ({ latestArticles, adsHome = [] }) => {
    const ref = useRef(null);

    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev();
        }
    };

    const params = {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.owl-next',
            prevEl: '.owl-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    };

    return (
        <div className="carousel_post2_type3 nav_style1">
            <Swiper
                ref={ref}
                className="trancarousel"
                {...params}
                shouldSwiperUpdate
            >
                {latestArticles.length > 0 &&
                    latestArticles.map((item) => (
                        <div key={item.id} className="single_post post_type3">
                            <div className="single_post_text">
                                <div className="meta3">
                                    {item.categories.length && (
                                        <Link to="/">
                                            {item.categories[0].name}
                                        </Link>
                                    )}
                                    <Link to="/">
                                        {moment(
                                            item.publishAt
                                                ? item.publishAt
                                                : item.createdAt
                                        ).format('LL')}
                                    </Link>
                                </div>
                                <h4>
                                    <Link to={`/article/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h4>
                                <div className="space-10" />
                            </div>
                        </div>
                    ))}
            </Swiper>
            <div className="border_black" />
            <div className="space-10" />
            <div className="navBtns">
                <div onClick={goPrev} className="navBtn prevtBtn">
                    <FontAwesome name="angle-left" />
                </div>
                <div onClick={goNext} className="navBtn nextBtn">
                    <FontAwesome name="angle-right" />
                </div>
            </div>
            <div className="col-lg-12 align-self-center">
                {adsHome && adsHome.length > 0 && (
                    <div className="banner1">
                        <a href={adsHome[0].link} target="_blank">
                            <img
                                src={
                                    process.env.REACT_APP_CMS_URL +
                                    adsHome[0].image[0].url
                                }
                                alt="banner"
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default connect(null, null, null, { forwardRef: true })(
    TrendingNewsSlider
);
