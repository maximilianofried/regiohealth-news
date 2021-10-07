/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Spinner } from 'reactstrap';
import rgOfferPlaceholderSmall from '../../doc/img/dummy_small.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BusinessNewsTwo = ({ publisherArticles = [], articleLimit, offer }) => {
    return (
        <div className="business3 padding20 white_bg border-radious5">
            {publisherArticles && publisherArticles.length > 0 ? (
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
                                    {item &&
                                    item.main_image &&
                                    item.main_image.formats &&
                                    item.main_image.formats.small ? (
                                        <img
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
                                                    : offer
                                                    ? rgOfferPlaceholderSmall
                                                    : ''
                                            }
                                            alt="thumb"
                                            effect="blur"
                                        />
                                    ) : offer ? (
                                        <img
                                            className="lazyLoad border-radious5"
                                            src={rgOfferPlaceholderSmall}
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

                                                {offer && item.company
                                                    ? `, ${item.company}`
                                                    : ''}

                                                {offer && item.region
                                                    ? `, ${item.region}`
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="post-p">{item.description}</p>
                                <div className="space-10" />
                                <div className="readmore3_wrapper">
                                    <Link
                                        to={
                                            (offer ? `/offer/` : `/article/`) +
                                            item.slug
                                        }
                                        className="readmore3"
                                    >
                                        Mehr Lesen
                                    </Link>
                                </div>

                                {i + 1 < publisherArticles.length ? (
                                    <>
                                        <div className="space-10" />
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <Spinner
                    className="spinner_custom"
                    animation="border"
                    variant="success"
                />
            )}
        </div>
    );
};

export default BusinessNewsTwo;
