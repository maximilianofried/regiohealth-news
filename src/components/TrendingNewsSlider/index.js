import React, {useState, useRef} from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Swiper from 'react-id-swiper';
import moment from 'moment';
import {CMS_LINK} from '../../utils/constants';
import trendbig1 from "../../doc/img/trending/trendbig1.jpg";
import trendbig2 from "../../doc/img/trending/trendbig2.jpg";
import tp_banner from "../../doc/img/bg/banner1.png"
const trendingNews = [
    {
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'There may be no consoles in the future ea exec says',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        image: trendbig1,
    },
    {
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        image: trendbig2,
    },
    {
        category: 'TECHNOLOGY',
        date: 'March 26, 2020',
        title: 'There may be no consoles in the future ea exec says',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        image: trendbig1,
    },
];
const TrendingNewsSlider = ({dark, latestArticles, adsHome = []}) => {
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
        breakpoints: {
            1024: {
                slidesPerView: 2,
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
        <div className="carousel_post2_type3 nav_style1">
            <Swiper ref={ref} className="trancarousel" {...params} shouldSwiperUpdate>
                {latestArticles.length > 0 &&  latestArticles.map((item, i) =>
                (<div key={i} className="single_post post_type3">
                    <div className="single_post_text">
                        <div className="meta3"><Link to="/">{item.categories[0].name}</Link>
                            <Link to="/">{moment(item.createdAt).format("LL")}</Link>
                        </div>
                        <h4><Link to={`/article/${item._id}`}>{item.title}</Link></h4>
                        <div className="space-10"/>
                        {/* <p className="post-p">{item.description}</p> */}
                    </div>
                </div>)
                )}
            </Swiper>
            <div className="border_black"/>
            <div className="space-10"/>
            <div className="navBtns">
                <div onClick={goPrev} className="navBtn prevtBtn"><FontAwesome name="angle-left"/></div>
                <div onClick={goNext} className="navBtn nextBtn"><FontAwesome name="angle-right"/></div>
            </div>
            <div className="col-lg-12 align-self-center">
                      {adsHome && adsHome.length > 0 && <div className="banner1">
                            <a href={adsHome[0].link} target="_blank">
                              <img src={CMS_LINK + adsHome[0].image[0].url} alt="banner"/>
                            </a>
                        </div>}
            </div>
        </div>
    );
};

export default connect(null, null, null,{forwardRef: true})(TrendingNewsSlider);