import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import hside1 from '../../doc/img/header/slider/hside1.jpg';
import FontAwesome from '../uiStyle/FontAwesome';
import { CMS_LINK } from '../../utils/constants';

const PostCarousel = ({ className, latestArticles }) => {
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

    const renderText = (description, categories) => {
        let text = '';
        if (description && description.length > 28) {
            text = `${description.substr(0, 28)} \u2026`;
        } else if (categories && categories.length > 0) {
            text = categories[0].name;
        }
        return text;
    };

    const params = {
        slidesPerView: 3,
        spaceBetween: 20,
        allowTouchMove: false,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.owl-next',
            prevEl: '.owl-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
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
        <div className={className || ''}>
            <div className="container carousel_padding">
                <div className="row">
                    <div className="col-12">
                        <div className="carousel_posts1 owl-carousel nav_style2 mb40 mt30">
                            <div className="px-4 position-relative">
                                <Swiper
                                    ref={ref}
                                    {...params}
                                    shouldSwiperUpdate
                                >
                                    {latestArticles.length > 0 &&
                                        latestArticles.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`single_post widgets_small post_type5 ${
                                                    item.main_image
                                                        ? ''
                                                        : 'no_padding_left'
                                                }`}
                                            >
                                                {item.main_image && (
                                                    <div className="post_img">
                                                        <div className="img_wrap">
                                                            <Link
                                                                to={`/article/${item.id}`}
                                                            >
                                                                <img
                                                                    src={
                                                                        item.main_image
                                                                            ? `${
                                                                                  CMS_LINK +
                                                                                  item
                                                                                      .main_image
                                                                                      .url
                                                                              }`
                                                                            : hside1
                                                                    }
                                                                    alt="slider5"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="single_post_text">
                                                    <h4>
                                                        <Link
                                                            to={`/article/${item.id}`}
                                                        >
                                                            {item.title.length >
                                                            35
                                                                ? `${item.title.substr(
                                                                      0,
                                                                      35
                                                                  )}\u2026`
                                                                : item.title}
                                                        </Link>
                                                    </h4>
                                                    <div className="post-p">
                                                        {renderText(
                                                            item.description,
                                                            item.categories
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </Swiper>
                                <div className="owl-nav">
                                    <div onClick={goPrev} className="owl-prev">
                                        <FontAwesome name="angle-left" />
                                    </div>
                                    <div onClick={goNext} className="owl-next">
                                        <FontAwesome name="angle-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PostCarousel.propTypes = {
    className: PropTypes.string,
    latestArticles: PropTypes.arrayOf(PropTypes.object),
};

PostCarousel.defaultProps = {
    className: '',
    latestArticles: [],
};

export default connect(null, null, null, { forwardRef: true })(PostCarousel);
