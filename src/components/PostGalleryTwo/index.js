import React from 'react';
import { Link } from 'react-router-dom';
import { isMobileOnly, isTablet } from 'react-device-detect';
import moment from 'moment';
import StickyBox from 'react-sticky-box';
import FollowUs from '../FollowUs';
import BusinessNewsTwo from '../BusinessNewsTwo';
import MostViewOffers from '../MostViewOffers';
import MostViewArticles from '../MostViewArticles';
import bigImg from '../../doc/img/header/sider-top3.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SquareIframeHomepage from '../AdserverIframe/Homepage/SquareIframe';
import HorizontalIframeHomepage from '../AdserverIframe/Homepage/HorizontalIframe';

const PostGalleryTwo = ({
    mainArticle,
    newsArticles,
    articleLimit,
    publisherArticles,
    latestOffers,
    buttonText,
    fetchArticleHomepageHook,
    wissenArticles,
    gtTippsArticles,
}) => {
    const displayOffersHomepage = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <div className="post_gallary_area theme3_bg mb40 padding-top-30">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-9 ">
                        {!isMobileOnly && <HorizontalIframeHomepage />}
                        <div className="main-article-container">
                            {mainArticle && (
                                <Link
                                    to={`/${mainArticle.type}/${mainArticle.slug}`}
                                >
                                    <div className="single_post post_type6 border-radious7 xs-mb30 main_article_homepage">
                                        <div className="post_img gradient1">
                                            <div className="img_wrap">
                                                <img
                                                    className="lazyLoad wrapper__img"
                                                    src={
                                                        mainArticle.main_image
                                                            ? `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL_IMAGE +
                                                                  mainArticle
                                                                      .main_image
                                                                      .url
                                                              }`
                                                            : bigImg
                                                    }
                                                    alt="thumb"
                                                    effect="blur"
                                                />
                                            </div>
                                        </div>
                                        <div className="single_post_text">
                                            <h2 className="single_post_title">
                                                {mainArticle.title}
                                            </h2>
                                            <div className="space-10" />

                                            <p className="post-p">
                                                {mainArticle.description}
                                            </p>

                                            <div className="meta meta_separator1">
                                                {mainArticle.categories && (
                                                    <span className="meta-category">
                                                        {mainArticle.categories
                                                            .length > 0
                                                            ? mainArticle
                                                                  .categories[0]
                                                                  .name
                                                            : ''}
                                                    </span>
                                                )}
                                                <span>
                                                    {' '}
                                                    {moment(
                                                        mainArticle.publishAt
                                                    ).format('LL')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className="space-10" />
                        {!isMobileOnly && <HorizontalIframeHomepage />}
                        <BusinessNewsTwo
                            isHomePage
                            articleLimit={articleLimit}
                            publisherArticles={publisherArticles}
                            buttonText={buttonText}
                            fetchContentHook={fetchArticleHomepageHook}
                        />
                    </div>
                    <div className="d-lg-block col-lg-3 col-xl-3 px-xl-0">
                        <StickyBox offsetTop={20}>
                            {!isTablet && <SquareIframeHomepage />}
                            <FollowUs
                                title="FOLGEN SIE UNS"
                                className="border-radious5 white_bg padding20 sm-mt30"
                            />
                            {newsArticles && (
                                <MostViewArticles
                                    title="NEWS"
                                    contentData={newsArticles}
                                />
                            )}

                            <div className="row justify-content-center">
                                {/* <div
                                    id="ads"
                                    className="col-md-6 col-lg-12 d-md-none d-lg-block  mb20 mt20"
                                /> */}

                                <div className="col-md-12 col-lg-12">
                                    {displayOffersHomepage && (
                                        <MostViewOffers
                                            title="ANGEBOTE"
                                            contentData={latestOffers}
                                        />
                                    )}
                                    <MostViewArticles
                                        title="WISSEN"
                                        contentData={wissenArticles}
                                    />
                                    <MostViewArticles
                                        title="GESUNDHEITSTIPPS"
                                        contentData={gtTippsArticles}
                                    />
                                </div>
                            </div>
                        </StickyBox>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostGalleryTwo;
