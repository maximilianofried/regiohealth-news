import React, { Fragment, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swiper from 'react-id-swiper';
import FontAwesome from '../uiStyle/FontAwesome';

// images
import mostsm1 from '../../doc/img/most_view/mostsm1.jpg';
import mostsm2 from '../../doc/img/most_view/mostsm2.jpg';
import mostsm3 from '../../doc/img/most_view/mostsm3.jpg';
import mostsm4 from '../../doc/img/most_view/mostsm4.jpg';
import mostsm5 from '../../doc/img/most_view/mostsm5.jpg';
import { mostViewSort } from '../../utils/commonFunctions';

const mostView = [
    {
        image: mostsm1,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Nancy zhang a chinese busy woman and dhaka',
    },
    {
        image: mostsm2,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'The billionaire Philan thropist read to learn',
    },
    {
        image: mostsm3,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Cheap smartphone sensor could help you',
    },
    {
        image: mostsm4,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Ratiffe to be Director of nation talent Trump',
    },
    {
        image: mostsm5,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Nancy zhang a chinese busy woman and dhaka',
    },
    {
        image: mostsm1,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'The billionaire Philan thropist read to learn',
    },
    {
        image: mostsm1,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Nancy zhang a chinese busy woman and dhaka',
    },
    {
        image: mostsm2,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'The billionaire Philan thropist read to learn',
    },
    {
        image: mostsm3,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Cheap smartphone sensor could help you',
    },
    {
        image: mostsm4,
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Ratiffe to be Director of nation talent Trump',
    },
];

const MostViewTwo = ({ title, latestOffers }) => {
    const [swiper, setSwiper] = useState(null);

    const goNext = () => {
        if (swiper !== null) {
            swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiper !== null) {
            swiper.slidePrev();
        }
    };

    const params = {
        slidesPerView: 1,
        slidesPerColumn: 6,
    };
    return (
        <div className="most_widget3 padding20 white_bg border-radious5 mb30 sm-mt30">
            <div className="heading">
                <h2 className="widget-title">{title || 'Most View'}</h2>
            </div>
            <div className="post_type2_carousel multipleRowCarousel pt12_wrapper nav_style1">
                {/* CAROUSEL START */}
                {latestOffers.map((item, i) => (
                    <div
                        key={item.id}
                        className="single_post widgets_small type8 type17"
                    >
                        <div className="post_img">
                            <div className="img_wrap_2">
                                <Link to="/">
                                    <LazyLoadImage
                                        src={
                                            process.env.REACT_APP_CMS_URL +
                                            (item.main_image.formats
                                                ? item.main_image.formats
                                                      .thumbnail.url
                                                : item.main_image.url)
                                        }
                                        alt="thumb"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="single_post_text">
                            <h4>
                                <Link to="/post1">{item.title}</Link>
                            </h4>
                            <div className="meta2">
                                <Link to="/">{item.categories[0].name}</Link>
                            </div>
                            {i + 2 < mostView.length ? (
                                <>
                                    <div className="space-5" />
                                    <div className="border_black" />
                                    <div className="space-15" />
                                </>
                            ) : null}
                        </div>
                    </div>
                ))}
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
