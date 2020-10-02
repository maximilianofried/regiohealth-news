import React, {useState, useRef} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import hside1 from '../../doc/img/header/slider/hside1.jpg';
import {formatDate} from "../../utils/commonFunctions";
import FontAwesome from "../uiStyle/FontAwesome";
const CMS_LINK = "https://cms.gesundheitsticket.de";

const PostCarousel = ({className, latestArticles}) => {
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
                                    {latestArticles.length > 0 && latestArticles.map((item, i) => (
                                        <div key={i} className={"single_post widgets_small post_type5 "  + (item.main_image ? '' : 'no_padding_left')}>
                                          {item.main_image && <div className="post_img">
                                                <div className="img_wrap">
                                                    <Link to={`/article/${item._id}`} >
                                                        <img src={item.main_image ? `${CMS_LINK + item.main_image.url}` : hside1} alt="slider5"/>
                                                    </Link>
                                                </div>
                                            </div>}
                                            <div className="single_post_text">
                                                {/* {item.categories && <p>{item.categories[0].name}</p>}
                                                <p className="date_carousel">{formatDate(item.createdAt)}</p> */}
                                                <h4><Link to={`/article/${item._id}`} >{item.title.length > 35 ? item.title.substr(0, 35) + "\u2026" : item.title}</Link></h4>
                                                {
                                                    item.description ? (item.description.length > 28 ? item.description.substr(0, 28) + "\u2026" : item.title) :
                                                    item.categories.length > 0 ? item.categories[0].name :
                                                    ''
                                                }
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