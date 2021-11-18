import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GeoDataNews = ({ geoData, buttonText, fetchContentHook }) => {
    const onClickLoadMore = () => {
        fetchContentHook();
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onClickLoadMore()}
                        className="btn-sm search-button"
                    >
                        {buttonText || 'MEHR'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeoDataNews;
