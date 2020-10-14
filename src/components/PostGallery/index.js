import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import WidgetTab from '../WidgetTab';
import '../../../node_modules/slick-carousel/slick/slick.css';
import PostCarousel from '../PostCarousel';
import TrendingNews from '../TrendingNews';
import sliderImg1 from '../../doc/img/header/sider-top.jpg';
import { CMS_LINK } from '../../utils/constants';
import './style.scss';

const PostGallery = ({ className, latestArticles, topArticles, adsHome }) => {
    return (
        <div className={`post_gallary_area mb40 ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <PostCarousel
                            latestArticles={latestArticles.slice(0, 9)}
                            className="fifth_bg"
                        />
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="slider_demo2">
                                    {topArticles.slice(0, 1).map((item) => (
                                        <div
                                            key={item.id}
                                            className="single_post post_type6 xs-mb30"
                                        >
                                            <div className="single_post_text">
                                                <h4>
                                                    <Link
                                                        className="play_btn"
                                                        to={`/article/${item.id}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <p className="post-p">
                                                    {item.description}
                                                </p>
                                                <div className="meta meta_separator1 d-flex">
                                                    <p>
                                                        {item.categories
                                                            .length > 0
                                                            ? item.categories[0]
                                                                  .name
                                                            : ''}
                                                    </p>
                                                    <p>
                                                        {moment(
                                                            item.createdAt
                                                        ).format('LL')}
                                                    </p>
                                                </div>
                                                <div className="space-10" />
                                            </div>
                                            <Link to={`/article/${item.id}`}>
                                                <div className="post_img gradient1">
                                                    <img
                                                        src={
                                                            item.main_image
                                                                ? `${
                                                                      CMS_LINK +
                                                                      item
                                                                          .main_image
                                                                          .url
                                                                  }`
                                                                : sliderImg1
                                                        }
                                                        alt="thumb"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <TrendingNews
                                    adsHome={adsHome.filter(
                                        (ad) => ad.size === 's729x90'
                                    )}
                                    latestArticles={latestArticles.slice(9, 18)}
                                />
                            </div>
                            <div className="col-xl-4">
                                <WidgetTab
                                    adsHome={adsHome.filter(
                                        (ad) => ad.size === 's350x292'
                                    )}
                                    latestArticles={latestArticles.slice(
                                        18,
                                        23
                                    )}
                                    dark
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PostGallery.propTypes = {
    className: PropTypes.string,
    latestArticles: PropTypes.arrayOf(PropTypes.object),
    topArticles: PropTypes.arrayOf(PropTypes.object),
    adsHome: PropTypes.arrayOf(PropTypes.object),
};

PostGallery.defaultProps = {
    className: '',
    latestArticles: [],
    topArticles: [],
    adsHome: [],
};

export default PostGallery;
