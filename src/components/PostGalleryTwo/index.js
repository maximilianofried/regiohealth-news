import React from 'react';
import { Link } from 'react-router-dom';
import { isMobileOnly, isTablet } from 'react-device-detect';
import moment from 'moment';
import StickyBox from 'react-sticky-box';
import FollowUs from '../FollowUs';
import BusinessNewsTwo from '../BusinessNewsTwo';
import AdserverIframe from '../AdserverIframe';
import AdserverLeaderboard from '../AdserverLeaderboard';
import MostViewOffers from '../MostViewOffers';
import MostViewArticles from '../MostViewArticles';
import bigImg from '../../doc/img/header/sider-top3.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostGalleryTwo = ({
    mainArticle,
    newsArticles,
    articleLimit,
    publisherArticles,
    latestOffers,
    buttonText,
    fetchArticleHomepageHook,
    articlesWissen,
    articlesGtTips,
}) => {
    const displayOffersHomepage = latestOffers.some(
        (offer) => offer.end > moment().format('YYYY-MM-DD')
    );
    return (
        <div className="post_gallary_area theme3_bg mb40 padding-top-30">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-9 ">
                        <div className="main-article-container">
                            {mainArticle && (
                                <Link to={`/article/${mainArticle.slug}`}>
                                    <div className="single_post post_type6 border-radious7 xs-mb30 main_article_homepage">
                                        <div className="post_img gradient1">
                                            <div className="img_wrap">
                                                <img
                                                    className="lazyLoad wrapper__img"
                                                    src={
                                                        mainArticle.main_image
                                                            ? `${
                                                                  process.env
                                                                      .REACT_APP_CMS_URL +
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
                                                <span className="meta-category">
                                                    {mainArticle.categories
                                                        .length > 0
                                                        ? mainArticle
                                                              .categories[0]
                                                              .name
                                                        : ''}
                                                </span>
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
                        {!isMobileOnly && <AdserverLeaderboard />}
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
                            {!isTablet && <AdserverIframe />}
                            <FollowUs
                                title="FOLGEN SIE UNS"
                                className="border-radious5 white_bg padding20 sm-mt30"
                            />
                            <div className="white_bg padding15 border-radious5 sm-mt30">
                                <div>
                                    <h2 className="widget-title">News</h2>
                                    <div className="space-20" />
                                    {newsArticles &&
                                        newsArticles
                                            .slice(0, 4)
                                            .map((item, i) => (
                                                <div
                                                    key={item.id}
                                                    className="single_post widgets_small type8 type17"
                                                >
                                                    <div className="post_img">
                                                        <div className="img_wrap_2">
                                                            <Link
                                                                to={`/article/${item.slug}`}
                                                            >
                                                                <img
                                                                    className="lazyLoad crop_image"
                                                                    src={
                                                                        item.main_image &&
                                                                        item
                                                                            .main_image
                                                                            .formats
                                                                            ? `${
                                                                                  process
                                                                                      .env
                                                                                      .REACT_APP_CMS_URL +
                                                                                  item
                                                                                      .main_image
                                                                                      .formats
                                                                                      .thumbnail
                                                                                      .url
                                                                              }`
                                                                            : bigImg
                                                                    }
                                                                    alt="thumb"
                                                                    effect="blur"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="single_post_text">
                                                        <h4>
                                                            <Link
                                                                to={`/article/${item.slug}`}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </h4>
                                                        <div className="meta4">
                                                            <p>
                                                                {moment(
                                                                    item.publishAt
                                                                ).format('LL')}
                                                            </p>
                                                        </div>
                                                        {/* {i + 1 <
                                                        newsArticles.length ? (
                                                            <>
                                                                <div className="space-20" />
                                                            </>
                                                        ) : null} */}
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div
                                    id="ads"
                                    className="col-md-6 col-lg-12 d-md-none d-lg-block  mb20 mt20"
                                />
                                {displayOffersHomepage && (
                                    <div className="col-md-12 col-lg-12">
                                        <MostViewOffers
                                            title="ANGEBOTE"
                                            contentData={latestOffers}
                                        />
                                        <MostViewArticles
                                            title="WISSEN"
                                            contentData={articlesWissen}
                                        />
                                        <MostViewArticles
                                            title="GESUNDHEITSTIPS"
                                            contentData={articlesGtTips}
                                        />
                                    </div>
                                )}
                            </div>
                        </StickyBox>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostGalleryTwo;
