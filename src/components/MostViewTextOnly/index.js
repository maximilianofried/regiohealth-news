import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MostViewTextonly = ({ title, data }) => {
    return (
        <div className="white_bg padding15 border-radious5 sm-mt30 mb30">
            <h2 className="widget-title">{title}</h2>
            <div className="space-20" />
            {data &&
                data.map((item, i) => (
                    <div
                        key={item.id}
                        className="single_post type14 widgets_small"
                    >
                        <div className="single_post_text">
                            <h4>
                                <Link to={`/article/${item.slug}`}>
                                    {item.title}
                                </Link>
                            </h4>
                            <div className="meta4">
                                <p>{moment(item.publishAt).format('LL')}</p>
                            </div>
                            {i + 1 < data.length ? (
                                <>
                                    <div className="space-20" />
                                </>
                            ) : null}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default MostViewTextonly;
