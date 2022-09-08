import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import ReactMarkdown from 'react-markdown';
import {
    fetchArticle,
    fetchArticleCleanUp,
    fetchArticles,
    fetchArticlesCleanUp,
} from '../../store/actions';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import rgOfferPlaceholderMedium from '../../doc/img/dummy_medium.png';
import Metadata from '../../components/Metadata';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverLeaderboard from '../../components/AdserverLeaderboard';
import LatestContent from '../../components/LatestContent';

const replaceContent = (data) => {
    let content = data.replace(/href/g, "target='_blank' href");
    content = content.replace(
        /src="\/uploads\//g,
        `src="${process.env.REACT_APP_CMS_URL}/uploads/`
    );
    return content;
};

const addhttp = (url) => {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        const newUrl = `http://${url}`;
        return newUrl;
    }
    return url;
};

const transform = (data) => {
    const imageLink = `${process.env.REACT_APP_CMS_URL + data}`;
    return imageLink;
};

const LinkRenderer = ({ href, children }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

const getMetaDescription = (description, categories) => {
    let metaDescription = '';
    if (description) {
        metaDescription = description;
    } else if (categories && categories.length > 0) {
        metaDescription = categories[0].name;
    }
    return metaDescription;
};

const getMeta = (url, width, setWidth, height, setHeight) => {
    const img = new Image();
    img.addEventListener('load', function () {
        setWidth(this.naturalWidth);
        setHeight(this.naturalHeight);
    });
    img.src = url;
    return { width, height };
};

const ArticlePage = ({
    articleData,
    stateArticles,
    fetchArticle,
    fetchArticleCleanUp,
    fetchArticles,
    fetchArticlesCleanUp,
}) => {
    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

    const { slug } = useParams();
    useEffect(() => {
        fetchArticle(slug);
        return () => fetchArticleCleanUp();
    }, [slug]);

    useEffect(() => {
        const { article } = articleData;
        if (article) {
            fetchArticles({ limit: 8, menuName: article.menu, slug });
        }

        return () => fetchArticlesCleanUp();
    }, [articleData, fetchArticles, fetchArticlesCleanUp, slug]);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const article = articleData.article || null;
    return (
        article && (
            <>
                <Metadata
                    title={article.title}
                    description={getMetaDescription(
                        article.description,
                        article.categories
                    )}
                    image={
                        // eslint-disable-next-line no-nested-ternary
                        article.main_image &&
                        article.main_image.formats &&
                        article.main_image.formats.small
                            ? process.env.REACT_APP_CMS_URL +
                              article.main_image.formats.small.url
                            : article.main_image
                            ? process.env.REACT_APP_CMS_URL +
                              article.main_image.url
                            : ''
                    }
                    imageSize={
                        article.main_image &&
                        article.main_image.formats &&
                        article.main_image.formats.small
                            ? getMeta(
                                  process.env.REACT_APP_CMS_URL +
                                      article.main_image.formats.small.url,
                                  width,
                                  setWidth,
                                  height,
                                  setHeight
                              )
                            : ''
                    }
                    url={`${process.env.REACT_APP_BASE_PAGE_URL}/article/${slug}`}
                />
                <div className="archives post post1">
                    {/* <BreadCrumb
                        className="shadow5 padding-top-30"
                        title="Archive / Articles"
                    /> */}
                    <div className="space-20" />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <div className="single_post_heading">
                                    <h1>{article.title}</h1>
                                </div>
                                <div className="space-20" />
                                <div className="single_post_description">
                                    <p>{article.description}</p>
                                </div>
                                <div className="img_wrap">
                                    <img
                                        src={
                                            article.main_image
                                                ? `${
                                                      process.env
                                                          .REACT_APP_CMS_URL +
                                                      article.main_image.url
                                                  }`
                                                : rgOfferPlaceholderMedium
                                        }
                                        alt="thumb"
                                        className="border-radious7"
                                        effect="blur"
                                    />
                                </div>

                                <div className="space-20" />

                                <div className="row">
                                    <div className="col-7 col-lg-6 align-self-center">
                                        <div className="author">
                                            {article.profile &&
                                                article.profile.logo && (
                                                    <div className="author_img">
                                                        <div className="author_img_wrap">
                                                            <img
                                                                src={
                                                                    process.env
                                                                        .REACT_APP_CMS_URL +
                                                                    article
                                                                        .profile
                                                                        .logo
                                                                        .url
                                                                }
                                                                alt="author2"
                                                                effect="blur"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            {article.profile &&
                                            article.profile.website ? (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={
                                                        article.profile &&
                                                        article.profile.website
                                                            ? addhttp(
                                                                  article
                                                                      .profile
                                                                      .website
                                                              )
                                                            : '#'
                                                    }
                                                >
                                                    {article.author}
                                                    {article.profile &&
                                                    article.profile.company
                                                        ? ` / ${article.profile.company}`
                                                        : ''}
                                                </a>
                                            ) : (
                                                <p className="company-no-link">
                                                    {' '}
                                                    {article.author}
                                                    {article.profile &&
                                                    article.profile.company
                                                        ? ` / ${article.profile.company}`
                                                        : ''}
                                                </p>
                                            )}
                                            <ul>
                                                <li>
                                                    {moment(
                                                        article.publishAt
                                                    ).format('LL')}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-5 col-lg-6 align-self-center">
                                        <div className="author_social inline text-right">
                                            <ReactTooltip
                                                place="top"
                                                type="dark"
                                                effect="solid"
                                            />
                                            <ul>
                                                <li>
                                                    <a
                                                        data-tip="Twitter"
                                                        href={`https://twitter.com/share?url=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FontAwesome name="twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Facebook"
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FontAwesome name="facebook-f" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Whatsapp"
                                                        href={`https://wa.me/?text=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FontAwesome name="whatsapp" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Telegram"
                                                        href={`https://t.me/share/url?url=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FontAwesome name="telegram" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-20" />
                                <div className="single_post_content">
                                    {!article.bodyIsHtml && (
                                        <ReactMarkdown
                                            className="markdownContainer margin"
                                            transformImageUri={(data) =>
                                                transform(data)
                                            }
                                            renderers={{ link: LinkRenderer }}
                                            source={article.content}
                                        />
                                    )}
                                    {article.bodyIsHtml && article.content && (
                                        <div
                                            // eslint-disable-next-line react/no-danger
                                            dangerouslySetInnerHTML={{
                                                __html: replaceContent(
                                                    article.content
                                                ),
                                            }}
                                        />
                                    )}
                                </div>
                                {article.documents && (
                                    <div className="documents">
                                        <ul className="none">
                                            {article.documents.map((doc) => (
                                                <li key={doc.id}>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={
                                                            process.env
                                                                .REACT_APP_CMS_URL +
                                                            doc.url
                                                        }
                                                    >
                                                        <FontAwesome name="file-text" />
                                                        <span>{doc.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-50" />
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <LatestContent
                                    contentData={stateArticles}
                                    type="article"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {!isMobileOnly && <AdserverLeaderboard />}
            </>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        articleData: state.article,
        stateArticles: state.articles.articles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticle: (slug) => dispatch(fetchArticle(slug)),
        fetchArticleCleanUp: () => dispatch(fetchArticleCleanUp()),
        fetchArticles: ({ limit, menuName, slug }) =>
            dispatch(fetchArticles({ limit, menuName, slug })),
        fetchArticlesCleanUp: () => dispatch(fetchArticlesCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
