import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GeoDataNews = ({ geoData, headerHide }) => {
    const generateLink = (objectType, slug) => {
        let link = '/';
        if (objectType === 'article') {
            link = `/article/${slug}`;
        }
        if (objectType === 'offer') {
            link = `/offer/${slug}`;
        }
        return link;
    };
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
                            {geoData.map((item) => (
                                <div
                                    key={item.id}
                                    className="single_post post_type3 post_type12_b border-radious5 white_bg padding10"
                                >
                                    {/* <div className="post_img">
                                        <div className="img_wrap">
                                            <Link
                                                to={generateLink(
                                                    item.objectType,
                                                    item.id
                                                )}
                                            >
                                                {item.main_image ? (
                                                    <img
                                                        src={`${process.env.REACT_APP_CMS_URL}${item.main_image.url}`}
                                                        alt="thumb"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </Link>
                                        </div>
                                    </div> */}
                                    <div className="single_post_text">
                                        <div className="meta3_suchportal">
                                            <Link to="/">
                                                {moment(item.publishAt).format(
                                                    'LL'
                                                )}
                                            </Link>
                                            <Link to="/">
                                                {item.company
                                                    ? item.company
                                                    : item.author}
                                            </Link>
                                        </div>
                                        <h4>
                                            <Link
                                                to={generateLink(
                                                    item.objectType,
                                                    item.slug
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </h4>
                                        <div className="post-p">
                                            {item.description}
                                        </div>
                                        <div className="space-20" />
                                        {/* {item.location && (
                                            <div className="meta3">
                                                <p className="location">
                                                    {item.location}
                                                </p>
                                            </div>
                                        )} */}
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

export default GeoDataNews;
