import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Heading from '../uiStyle/Heading';
import TrendingNewsSlider from '../TrendingNewsSlider';

const TrendingNews = ({ dark, latestArticles, adsHome }) => {
    return (
        <>
            <Heading title="Trending News" />
            {dark ? (
                <div className="border_white" />
            ) : (
                <div className="border_black" />
            )}
            <div className="space-30" />
            <div className="row">
                <div className="col-lg-6">
                    {latestArticles.slice(0, 3).map((item) => (
                        <Fragment key={item.id}>
                            <div
                                className={`single_post widgets_small ${
                                    item.main_image
                                        ? ''
                                        : 'widgets_small_no_image'
                                }`}
                            >
                                {item.main_image && item.main_image.formats && (
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to={`/article/${item.id}`}>
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        item.main_image.formats
                                                            .thumbnail.url
                                                    }
                                                    alt="thumb"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                <div className="single_post_text">
                                    <div className="meta2">
                                        {item.categories.length > 0 ? (
                                            <Link to="/">
                                                {item.categories[0].name}
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                        <Link to="/">
                                            {moment(item.createdAt).format(
                                                'LL'
                                            )}
                                        </Link>
                                    </div>
                                    <h4>
                                        <Link to={`/article/${item.id}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                            <div className="space-15" />
                            {dark ? (
                                <div className="border_white" />
                            ) : (
                                <div className="border_black" />
                            )}
                            <div className="space-15" />
                        </Fragment>
                    ))}
                </div>
                <div className="col-lg-6">
                    {latestArticles.slice(3, 6).map((item) => (
                        <Fragment key={item.id}>
                            <div
                                className={`single_post widgets_small ${
                                    item.main_image
                                        ? ''
                                        : 'widgets_small_no_image'
                                }`}
                            >
                                {item.main_image && item.main_image.formats && (
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to={`/article/${item.id}`}>
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        item.main_image.formats
                                                            .thumbnail.url
                                                    }
                                                    alt="thumb"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                <div className="single_post_text">
                                    <div className="meta2">
                                        {item.categories.length > 0 ? (
                                            <Link to="/">
                                                {item.categories[0].name}
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                        <Link to="/">
                                            {moment(item.createdAt).format(
                                                'LL'
                                            )}
                                        </Link>
                                    </div>
                                    <h4>
                                        <Link to={`/article/${item.id}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                            <div className="space-15" />
                            {dark ? (
                                <div className="border_white" />
                            ) : (
                                <div className="border_black" />
                            )}
                            <div className="space-15" />
                        </Fragment>
                    ))}
                </div>
            </div>
            <Heading title="More News" />
            <TrendingNewsSlider
                adsHome={adsHome}
                latestArticles={latestArticles.slice(6, 14)}
            />
        </>
    );
};

export default TrendingNews;
