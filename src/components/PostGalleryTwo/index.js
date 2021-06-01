import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import FollowUs from '../FollowUs';
import NewsLetter from '../Newsletter';
import BusinessNewsTwo from '../BusinessNewsTwo';
import MostViewTwo from '../MostViewTwo';
import big_img from '../../doc/img/header/sider-top3.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostGalleryTwo = ({
    mainArticle,
    newsArticles,
    articleLimit,
    publisherArticles,
    adsHome,
    latestOffers,
}) => {
    const displayOffersHomepage = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <div className="post_gallary_area theme3_bg mb40 padding-top-30">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-9 ">
                        {mainArticle && (
                            <Link to={`/article/${mainArticle.slug}`}>
                                <div className="single_post post_type6 border-radious7 xs-mb30 main_article_homepage">
                                    <div className="post_img gradient1">
                                        <div className="img_wrap">
                                            <img
                                                className="lazyLoad wrapper__img"
                                                src={
                                                    mainArticle.main_image
                                                        ? `${
                                                              process.env
                                                                  .REACT_APP_CMS_URL +
                                                              mainArticle
                                                                  .main_image
                                                                  .url
                                                          }`
                                                        : big_img
                                                }
                                                alt="thumb"
                                                effect="blur"
                                            />
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <h2 className="single_post_title">
                                            {mainArticle.title}
                                        </h2>
                                        <div className="space-10" />

                                        <p className="post-p">
                                            {mainArticle.description}
                                        </p>

                                        {/* <div className="space-20" /> */}
                                        <div className="meta meta_separator1">
                                            <span className="meta-category">
                                                {mainArticle.categories.length >
                                                0
                                                    ? mainArticle.categories[0]
                                                          .name
                                                    : ''}
                                            </span>
                                            <span>
                                                {' '}
                                                {moment(
                                                    mainArticle.publishAt
                                                ).format('LL')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                        <div className="space-10" />
                        <BusinessNewsTwo
                            articleLimit={articleLimit}
                            publisherArticles={publisherArticles}
                        />
                    </div>
                    {/* <div className="d-none d-xl-block col-xl-3">
                        <div className="white_bg padding15 border-radious5 sm-mt30">
                            {posts.map((item, i) => (
                                <div
                                    key={i}
                                    className="single_post type14 widgets_small"
                                >
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to="/">
                                                <img
                                                    src={item.image}
                                                    alt="thumb"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <h4>
                                            <Link to="/post">{item.title}</Link>
                                        </h4>
                                        <div className="meta4">
                                            <Link to="/">{item.category}</Link>
                                        </div>
                                        {i + 1 < posts.length ? (
                                            <>
                                                <div className="space-5" />
                                                <div className="border_black" />
                                                <div className="space-15" />
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                        <FollowUs
                            title="FOLGEN SIE UNS"
                            className="border-radious5 white_bg padding20 sm-mt30"
                        />
                        <div className="white_bg padding15 border-radious5 sm-mt30">
                            <div>
                                <h2 className="widget-title">News</h2>
                                <div className="space-20" />
                                {newsArticles &&
                                    newsArticles.slice(0, 4).map((item, i) => (
                                        <div
                                            key={item.id}
                                            className="single_post widgets_small type8 type17"
                                        >
                                            <div className="post_img">
                                                <div className="img_wrap_2">
                                                    <Link
                                                        to={`/article/${item.slug}`}
                                                    >
                                                        <img
                                                            className="lazyLoad crop_image"
                                                            src={
                                                                item.main_image
                                                                    ? `${
                                                                          process
                                                                              .env
                                                                              .REACT_APP_CMS_URL +
                                                                          item
                                                                              .main_image
                                                                              .formats
                                                                              .thumbnail
                                                                              .url
                                                                      }`
                                                                    : big_img
                                                            }
                                                            alt="thumb"
                                                            effect="blur"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="single_post_text">
                                                <h4>
                                                    <Link
                                                        to={`/article/${item.slug}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <div className="meta4">
                                                    <p>
                                                        {moment(
                                                            item.publishAt
                                                        ).format('LL')}
                                                    </p>
                                                </div>
                                                {i + 1 < newsArticles.length ? (
                                                    <>
                                                        <div className="space-20" />
                                                        {/* <div className="border_black" /> */}
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div
                                id="ads"
                                className="col-md-6 col-lg-12 d-md-none d-lg-block  mb20 mt20"
                            >
                                {/* {adsHome && adsHome.length > 0 && (
                                    <div className="banner2 mb30 mt20 border-radious5">
                                        <a
                                            target="_blank"
                                            href={adsHome[0].link}
                                        >
                                            <img
                                                className="lazyLoad"
                                                src={
                                                    process.env
                                                        .REACT_APP_CMS_URL +
                                                    adsHome[0].image[0].url
                                                }
                                                alt="thumb"
                                            />
                                        </a>
                                    </div>
                                )} */}
                                <div className="banner2 border-radious5 banner_homepage">
                                    <iframe
                                        title="adserver"
                                        id="a45246e8"
                                        name="a45246e8"
                                        src="https://adserver.gesundheitsticket.de/revive/www/delivery/afr.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                                        frameBorder="0"
                                        scrolling="no"
                                        width="300"
                                        height="250"
                                        allow="autoplay"
                                    >
                                        <a
                                            href="https://adserver.gesundheitsticket.de/revive/www/delivery/ck.php?n=ab9b30e4&amp;cb=INSERT_RANDOM_NUMBER_HERE"
                                            target="_blank"
                                        >
                                            <img
                                                src="https://adserver.gesundheitsticket.de/revive/www/delivery/avw.php?zoneid=1&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=ab9b30e4"
                                                alt=""
                                            />
                                        </a>
                                    </iframe>
                                </div>
                            </div>
                            {displayOffersHomepage && (
                                <div className="col-md-12 col-lg-12">
                                    <MostViewTwo
                                        title="ANGEBOTE"
                                        latestOffers={latestOffers}
                                    />
                                </div>
                            )}
                        </div>
                        {/* <div className="single_post post_type3 post_type15 mb30 border-radious5 sm-mt30">
                            <div className="post_img">
                                <div className="img_wrap">
                                    <Link to="/">
                                        <img src={col26} alt="col26" />
                                    </Link>
                                </div>
                                <span className="tranding border_tranding">
                                    <FontAwesome name="bolt" />
                                </span>
                            </div>
                            <div className="single_post_text white_bg padding20">
                                <h4>
                                    <Link to="/post1">
                                        Japan’s virus puzzled the world luck
                                        running out?
                                    </Link>
                                </h4>
                                <div className="space-10" />
                                <p className="post-p">
                                    The property, complete with 30-seat
                                    screening from room, a 100-seat amphitheater
                                    and a swimming pond with sandy shower…
                                </p>
                                <div className="space-20" />
                                <div className="meta3">
                                    <Link to="/">TECHNOLOGY</Link>
                                    <Link to="/">March 26, 2020</Link>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostGalleryTwo;
