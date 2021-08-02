import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GeoDataNews = ({ geoData, headerHide }) => {
    const generateLink = (type, slug) => {
        let link = '/';
        if (type === 'article') {
            link = `/${type}/${slug}`;
        }
        if (type === 'offer') {
            link = `/offer/${slug}`;
        }
        return link;
    };
    return (
        <div className="row">
            <div className="col-12">
                <div className="businerss_news">
                    <div className="row">
                        <div className="col-12">
                            {geoData.map((item) => (
                                <div
                                    key={item.id}
                                    className="single_post post_type12_b type20 border-radious5 white_bg padding10"
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
                                        <h4>
                                            <Link
                                                to={`/${item.type}/${item.slug}`}
                                            >
                                                {item.title}
                                            </Link>
                                        </h4>
                                        <div className="post-p">
                                            {item.description}
                                        </div>
                                        <div className="space-10" />
                                        <div className="meta4">
                                            <p>
                                                {moment(item.publishAt).format(
                                                    'LL'
                                                )}
                                            </p>
                                        </div>
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
