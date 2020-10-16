import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import FontAwesome from '../uiStyle/FontAwesome';
import { fetchArticlesCity } from '../../store/actions';

const TopBar = ({ className, dark, localArticles, fetchArticlesCity }) => {
    useEffect(() => {
        fetchArticlesCity({ city: 'Berlin' });
    }, []);
    const currentDate = moment().format('dddd, MMMM D, YYYY');
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
        loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.trancarousel',
        },
        navigation: {
            nextEl: '.nextBtn',
            prevEl: '.prevBtn',
        },
    };
    return (
        <div className={`topbar ${className || ''}`} id="top">
            <div className="container">
                <div className="row">
                    {localArticles && localArticles.length > 0 && (
                        <div className="col-md-8 align-self-center">
                            {localArticles && localArticles.length > 0 && (
                                <div
                                    className={`trancarousel_area ${
                                        dark ? 'white' : ''
                                    }`}
                                >
                                    <p className="trand">Local News</p>
                                    <div className="nav_style1">
                                        <Swiper
                                            ref={ref}
                                            className="trancarousel"
                                            {...params}
                                        >
                                            {localArticles.length > 0 &&
                                                localArticles.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="trancarousel_item"
                                                    >
                                                        <p>
                                                            <Link
                                                                to={`/article/${item.id}`}
                                                            >
                                                                {item.title
                                                                    .length <=
                                                                30
                                                                    ? `${
                                                                          item.title
                                                                      } - ${
                                                                          item.description
                                                                              ? item.description.substr(
                                                                                    0,
                                                                                    35
                                                                                )
                                                                              : ''
                                                                      }\u2026`
                                                                    : item.title}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                ))}
                                        </Swiper>
                                        {!isMobile && (
                                            <div className="navBtns">
                                                <button
                                                    type="button"
                                                    className="navBtn prevBtn"
                                                    onClick={goPrev}
                                                >
                                                    <FontAwesome name="angle-left" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="navBtn nextBtn"
                                                    onClick={goNext}
                                                >
                                                    <FontAwesome name="angle-right" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {!isMobile && (
                        <div className="col-md-4 align-self-center">
                            <div className="top_date_social text-right">
                                <div
                                    className={`paper_date ${
                                        dark ? 'white' : ''
                                    }`}
                                >
                                    <p>{currentDate}</p>
                                </div>
                                <div
                                    className={`social1 ${dark ? 'white' : ''}`}
                                >
                                    <ul className="inline">
                                        <li>
                                            <a
                                                href="https://www.facebook.com/RegioHealthNews"
                                                target="_blank"
                                            >
                                                <FontAwesome name="facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.instagram.com/regiohealth.news"
                                                target="_blank"
                                            >
                                                <FontAwesome name="instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        localArticles: state.articles.articlesByCity,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticlesCity: (city) => dispatch(fetchArticlesCity(city)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
