import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import FollowUs from '../FollowUs';
import NewsLetter from '../Newsletter';
import big_img from '../../doc/img/header/sider-top3.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostGalleryTwo = ({ mainArticle, newsArticles }) => {
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
                                            <LazyLoadImage
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
                    <div className="d-lg-block col-lg-4 col-xl-3">
                        <FollowUs
                            title="FOLGEN SIE UNS"
                            className="border-radious5 white_bg padding20 sm-mt30"
                        />
                        <div className="white_bg padding15 border-radious5 sm-mt30">
                            <h2 className="widget-title">News</h2>
                            <div className="space-20" />
                            {newsArticles &&
                                newsArticles.map((item, i) => (
                                    <div
                                        key={item.id}
                                        className="single_post type14 widgets_small"
                                    >
                                        {/* <div className="post_img">
                                            <div className="img_wrap">
                                                <Link
                                                    to={`/article/${item.slug}`}
                                                >
                                                    <LazyLoadImage
                                                        className="wrapper__img"
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
                                        </div> */}
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
