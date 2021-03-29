import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FontAwesome from '../uiStyle/FontAwesome';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BusinessNewsTwo = ({ publisherArticles = [], articleLimit, offer }) => {
    return (
        <div className="business3 padding20 white_bg border-radious5">
            {publisherArticles &&
                publisherArticles.length > 0 &&
                publisherArticles.slice(0, articleLimit).map((item, i) => (
                    <div
                        key={item.id}
                        className="single_post post_type12 type20"
                    >
                        <div className="post_img">
                            <div className="img_wrap">
                                <Link
                                    to={
                                        (offer ? `/offer/` : `/article/`) +
                                        item.slug
                                    }
                                >
                                    {item ? (
                                        <LazyLoadImage
                                            className="lazyLoad border-radious5"
                                            src={
                                                item.main_image &&
                                                item.main_image.formats &&
                                                item.main_image.formats.small
                                                    ? `${
                                                          process.env
                                                              .REACT_APP_CMS_URL +
                                                          item.main_image
                                                              .formats.small.url
                                                      }`
                                                    : ''
                                            }
                                            alt="thumb"
                                            effect="blur"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Link>
                            </div>
                        </div>
                        {item && (
                            <div className="single_post_text">
                                <h3>
                                    <Link
                                        to={
                                            (offer ? `/offer/` : `/article/`) +
                                            item.slug
                                        }
                                    >
                                        {item.title}
                                    </Link>
                                </h3>
                                <div className="row">
                                    <div className="col-12 align-self-center">
                                        <div className="meta_col">
                                            <p>
                                                {moment(item.publishAt).format(
                                                    'LL'
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="col-6 text-right align-self-center">
                                    <ul className="meta_share inline">
                                        <li>
                                            <Link to="/">
                                                <FontAwesome name="bookmark" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                <FontAwesome name="share" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div> */}
                                </div>
                                <p className="post-p">{item.description}</p>
                                <div className="space-10" />
                                <Link
                                    to={
                                        (offer ? `/offer/` : `/article/`) +
                                        item.slug
                                    }
                                    className="readmore3"
                                >
                                    Mehr Lesen
                                </Link>
                                {i + 1 < publisherArticles.length ? (
                                    <>
                                        <div className="space-10" />
                                        {/* <div className="border_black" /> */}
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            {/* <Link to="/" className="showmore">
                Show more
            </Link> */}
        </div>
    );
};

export default BusinessNewsTwo;
