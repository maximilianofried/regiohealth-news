import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BusinessNews = ({ businessArticles, headerHide }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="businerss_news">
                    {headerHide ? (
                        ''
                    ) : (
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <h2 className="widget-title">Business News</h2>
                            </div>
                            <div className="col-6 text-right align-self-center">
                                <Link to="/" className="see_all mb20">
                                    See All
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12">
                            {businessArticles.map((item) => (
                                <div
                                    key={item.id}
                                    className="single_post post_type3 post_type12 mb30"
                                >
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to={`/article/${item.slug}`}>
                                                {item.main_image ? (
                                                    <LazyLoadImage
                                                        src={`${process.env.REACT_APP_CMS_URL}${item.main_image.url}`}
                                                        alt="thumb"
                                                        effect="blur"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <div className="meta3">
                                            <Link to="/">{item.author}</Link>
                                            <Link to="/">
                                                {moment(item.publishAt).format(
                                                    'LL'
                                                )}
                                            </Link>
                                        </div>
                                        <h4>
                                            <Link to={`/article/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h4>
                                        <div className="space-10" />
                                        <div className="post-p">
                                            {item.description}
                                        </div>
                                        {/* <div className="space-20"/>
                                        <Link to={`/article/${item._id}`} className="readmore">Read more</Link> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessNews;
