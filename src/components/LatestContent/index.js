import React from 'react';
import { Link } from 'react-router-dom';
import rgOfferPlaceholderSmall from '../../doc/img/dummy_small.png';

const LatestContent = ({ contentData, type }) => {
    return (
        <div className="white_bg padding15 border-radious5 sm-mt30 mb15">
            <h2 className="widget-title">Verwandte Inhalte</h2>
            <div className="space-20" />
            <div className="d-flex flex-column flex-md-row">
                <div className="col-sm-12 col-md-6">
                    {contentData &&
                        contentData.slice(0, 4).map((item, i) => (
                            <div
                                key={item.id}
                                className="single_post widgets_small type8 type17"
                            >
                                <div className="post_img">
                                    <div className="img_wrap_2">
                                        <Link to={`/${type}/${item.slug}`}>
                                            {item && item.main_image ? (
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        item.main_image &&
                                                        item.main_image
                                                            .formats &&
                                                        item.main_image.formats
                                                            .small
                                                            ? `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL_IMAGE +
                                                                  item
                                                                      .main_image
                                                                      .formats
                                                                      .small.url
                                                              }`
                                                            : `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL_IMAGE +
                                                                  item
                                                                      .main_image
                                                                      .formats
                                                                      .thumbnail
                                                                      .url
                                                              }`
                                                    }
                                                    alt="thumb"
                                                    effect="blur"
                                                />
                                            ) : (
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        rgOfferPlaceholderSmall
                                                    }
                                                    alt="thumb"
                                                    effect="blur"
                                                />
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <div className="single_post_text">
                                    <h4>
                                        <Link to={`/${type}/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    {/* <div className="meta4">
                        <p>
                            {moment(
                                item.publishAt
                            ).format('LL')}
                        </p>
                    </div> */}
                                    {i + 1 < contentData.length ? (
                                        <>
                                            <div className="space-20" />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                </div>
                <div className="col-sm-12 col-md-6">
                    {contentData &&
                        contentData.slice(4, 8).map((item, i) => (
                            <div
                                key={item.id}
                                className="single_post widgets_small type8 type17"
                            >
                                <div className="post_img">
                                    <div className="img_wrap_2">
                                        <Link to={`/${type}/${item.slug}`}>
                                            {item && item.main_image ? (
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        item.main_image &&
                                                        item.main_image
                                                            .formats &&
                                                        item.main_image.formats
                                                            .small
                                                            ? `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL_IMAGE +
                                                                  item
                                                                      .main_image
                                                                      .formats
                                                                      .small.url
                                                              }`
                                                            : `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL_IMAGE +
                                                                  item
                                                                      .main_image
                                                                      .formats
                                                                      .thumbnail
                                                                      .url
                                                              }`
                                                    }
                                                    alt="thumb"
                                                    effect="blur"
                                                />
                                            ) : (
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        rgOfferPlaceholderSmall
                                                    }
                                                    alt="thumb"
                                                    effect="blur"
                                                />
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <div className="single_post_text">
                                    <h4>
                                        <Link to={`/${type}/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    {/* <div className="meta4">
                        <p>
                            {moment(
                                item.publishAt
                            ).format('LL')}
                        </p>
                    </div> */}
                                    {i + 1 < contentData.length ? (
                                        <>
                                            <div className="space-20" />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default LatestContent;
