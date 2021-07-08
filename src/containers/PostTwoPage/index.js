import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import ReactMarkdown from 'react-markdown';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchArticle, fetchArticleCleanUp } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import BannerSection from '../../components/BannerSection';
import singlePost1 from '../../doc/img/blog/single_post1.jpg';
import Metadata from '../../components/Metadata';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AdserverLeaderboard from '../../components/AdserverLeaderboard';

const replaceContent = (data) => {
    let content = data.replace(/href/g, "target='_blank' href");
    content = content.replace(
        /src="\/uploads\//g,
        `src="${process.env.REACT_APP_CMS_URL}/uploads/`
    );
    return content;
};

const addhttp = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = `http://${url}`;
    }
    return url;
};

const transform = (data) => {
    const imageLink = `${process.env.REACT_APP_CMS_URL + data}`;
    return imageLink;
};

const LinkRenderer = ({ href, children }) => {
    return (
        <a href={href} target="_blank">
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

const PostTwoPage = ({ articleData, fetchArticle, fetchArticleCleanUp }) => {
    const { slug } = useParams();
    useEffect(() => {
        fetchArticle(slug);
        return () => fetchArticleCleanUp();
    }, [slug]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const article = articleData.article || null;
    console.log(article);
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
                        article.main_image
                            ? process.env.REACT_APP_CMS_URL +
                              article.main_image.url
                            : ''
                    }
                    imageSize={
                        article.main_image
                            ? getMeta(
                                  process.env.REACT_APP_CMS_URL +
                                      article.main_image.url,
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
                                                : singlePost1
                                        }
                                        alt="thumb"
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
                                            <a
                                                target="_blank"
                                                href={
                                                    article.profile &&
                                                    article.profile.website
                                                        ? addhttp(
                                                              article.profile
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
                                                    >
                                                        <FontAwesome name="twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Facebook"
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="facebook-f" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Whatsapp"
                                                        href={`https://wa.me/?text=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="whatsapp" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Telegram"
                                                        href={`https://t.me/share/url?url=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="telegram" />
                                                    </a>
                                                </li>
                                                {/* <li>
                                                    <a
                                                        data-tip="Signal"
                                                        href={`https://wa.me/?text=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="commenting-o" />
                                                    </a>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="space-30" />
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page_comments">
                                            <ul className="inline">
                                                <li className="page_category">
                                                    {article.categories.length >
                                                    0
                                                        ? article.categories[0].name.toUpperCase()
                                                        : ''}
                                                </li>
                                                <li><FontAwesome name="comment"/>563</li>
                                            <li><FontAwesome name="fire"/>536</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
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
                                    {article.bodyIsHtml && (
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
                                {/* <div className="space-30" />
                                <div className="tags">
                                    <ul className="inline">
                                        <li className="tag_list">
                                            <FontAwesome name="tag" /> tags
                                        </li>
                                        {article.categories.map((category) => (
                                            <li key={category.id}>
                                                <Link to="/">
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-40" />
                                <div className="border_black" /> */}
                                {/* <div className="space-40"/>
                            <PostOnePagination className="next_prv_single padding20 fourth_bg"/> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="space-100"/> */}
                {!isMobileOnly && <AdserverLeaderboard />}
                {/* <div className="space-60"/>
            <OurBlogSection/>
            <div className="space-60"/>
            <BlogComment/>

            <ModalVideo channel='youtube' isOpen={vModal} videoId={videoId}
                        onClose={() => setvModal(false)}/> */}
            </>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        articleData: state.article,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticle: (slug) => dispatch(fetchArticle(slug)),
        fetchArticleCleanUp: () => dispatch(fetchArticleCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTwoPage);
