import React, {useState, useRef} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import hside4 from '../../doc/img/header/slider/hside4.jpg';
import hside5 from '../../doc/img/header/slider/hside5.jpg';
import hside6 from '../../doc/img/header/slider/hside6.jpg';
import hside1 from '../../doc/img/header/slider/hside1.jpg';
import hside2 from '../../doc/img/header/slider/hside2.jpg';
import hside3 from '../../doc/img/header/slider/hside3.jpg';
import FontAwesome from "../uiStyle/FontAwesome";
const CMS_LINK = "https://cms.gesundheitsticket.de";
const postSlider = [
    {
        title: 'The home decorations document, photograph of an',
        body: 'People have been infected',
        image: hside4
    },
    {
        title: 'U.S. Response subash says he will label regions by risk of…',
        body: 'People have been infected'
    },
    {
        title: 'Stimul package will transform the government fundamentally.',
        body: 'People have been infected',
    },
    {
        title: 'U.S. Response subash says he will label regions by risk of…',
        body: 'People have been infected',
        image: hside1
    },
    {
        title: 'U.S. Response subash says he will label regions by risk of…',
        body: 'People have been infected',
        image: hside2
    },
    {
        title: 'U.S. Response subash says he will label regions by risk of…',
        body: 'People have been infected',
        image: hside3
    },
];

const PostCarousel = ({className, localArticles}) => {
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
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
          navigation: {
            nextEl: '.owl-next',
            prevEl: '.owl-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            }
        }
    };

    return (
        <div className={className ? className : ''}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="carousel_posts1 owl-carousel nav_style2 mb40 mt30">
                            {/*CAROUSEL START*/}
                            <div className="px-4 position-relative">
                                <Swiper ref={ref} {...params}>
                                    {localArticles.length > 0 && localArticles.map((item, i) => (
                                        <div key={i} className={"single_post widgets_small post_type5 "  + (item.main_image ? '' : 'no_padding_left')}>
                                          {item.main_image && <div className="post_img">
                                                <div className="img_wrap">
                                                    <Link to={`/post2/${item._id}`} >
                                                        <img src={item.main_image ? `${CMS_LINK + item.main_image.url}` : hside1} alt="slider5"/>
                                                    </Link>
                                                </div>
                                            </div>}
                                            <div className="single_post_text">
                                                <h4><Link to={`/post2/${item._id}`} >{item.title.length > 50 ? item.title.substr(0, 50) + "\u2026" : item.title}</Link></h4>
                                               {item.categories && <p>{item.categories[0].name}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </Swiper>
                                <div className="owl-nav">
                                    <div onClick={goPrev} className="owl-prev"><FontAwesome name="angle-left"/></div>
                                    <div onClick={goNext} className="owl-next"><FontAwesome name="angle-right"/></div>
                                </div>
                            </div>
                        </div>
                        {/*CAROUSEL END*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, null, null,{forwardRef: true})(PostCarousel);