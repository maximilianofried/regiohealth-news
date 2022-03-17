import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { isMobileOnly, isTablet } from 'react-device-detect';
import rgOfferPlaceholderThumbnail from '../../doc/img/dummy_thumbnail.png';

const MostViewArticles = ({ title, contentData }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/${title.toLowerCase()}`);
    };

    return (
        <div className="most_widget3 padding20 white_bg border-radious5 mb30 sm-mt30">
            <div className="heading">
                <h2 className="widget-title">{title || ''}</h2>
            </div>
            <div className="space-20" />
            <div className="post_type2_carousel multipleRowCarousel pt12_wrapper nav_style1">
                {/* CAROUSEL START */}
                {contentData &&
                    contentData.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="single_post widgets_small type8 type17"
                            >
                                <div className="post_img">
                                    <div className="img_wrap_2">
                                        {item.main_image ? (
                                            <Link to={`/article/${item.slug}`}>
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        process.env
                                                            .REACT_APP_CMS_URL +
                                                        (item.main_image.formats
                                                            ? item.main_image
                                                                  .formats
                                                                  .thumbnail.url
                                                            : item.main_image
                                                                  .url)
                                                    }
                                                    alt="thumb"
                                                />
                                            </Link>
                                        ) : (
                                            <Link to={`/article/${item.slug}`}>
                                                <img
                                                    className="lazyLoad crop_image"
                                                    src={
                                                        rgOfferPlaceholderThumbnail
                                                    }
                                                    alt="thumb"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="single_post_text">
                                    <h4>
                                        <Link to={`/article/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h4>
                                    <div className="meta2">
                                        <p>
                                            {moment(item.publishAt).format(
                                                'LL'
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-10" />
                                </div>
                            </div>
                        );
                    })}
                {/* CAROUSEL END */}
            </div>
            {(isMobileOnly || isTablet) && (
                <>
                    <div className="space-10" />
                    <button
                        type="button"
                        onClick={() => handleClick()}
                        className="btn-sm search-button"
                    >
                        {`MEHR ${title}`}
                    </button>
                </>
            )}
        </div>
    );
};

export default MostViewArticles;
