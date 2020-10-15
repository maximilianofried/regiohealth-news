import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { fetchArticle, fetchArticleCleanUp } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import BannerSection from '../../components/BannerSection';
import singlePost1 from '../../doc/img/blog/single_post1.jpg';
import { CMS_LINK } from '../../utils/constants';
import Metadata from '../../components/Metadata';

const transform = (data) => {
    const imageLink = `${CMS_LINK + data}`;
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

const PostTwoPage = ({ articleData, fetchArticle }) => {
    const { id } = useParams();
    const article = articleData.article || null;

    useEffect(() => {
        fetchArticle(id);
        return () => fetchArticleCleanUp();
    }, [id]);

    return (
        article && (
            <>
                <Metadata
                    title={article.title}
                    description={getMetaDescription(
                        article.description,
                        article.categories
                    )}
                    image={CMS_LINK + article.main_image.url}
                    url={`${process.env.REACT_APP_BASE_PAGE_URL}/article/${id}`}
                />
                <div className="archives post post1">
                    <BreadCrumb
                        className="shadow5 padding-top-30"
                        title="Archive / Articles"
                    />
                    <span className="space-30" />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <img
                                    src={
                                        article.main_image
                                            ? `${
                                                  CMS_LINK +
                                                  article.main_image.url
                                              }`
                                            : singlePost1
                                    }
                                    alt="thumb"
                                />
                                <div className="space-20" />
                                <div className="single_post_heading">
                                    <h1>{article.title}</h1>
                                </div>
                                <div className="space-20" />
                                <div className="row">
                                    <div className="col-7 col-lg-6 align-self-center">
                                        <div className="author">
                                            <Link to="/">{article.author}</Link>
                                            <ul>
                                                <li>
                                                    {moment(
                                                        article.createdAt
                                                    ).format('LL')}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-5 col-lg-6 align-self-center">
                                        <div className="author_social inline text-right">
                                            <ul>
                                                <li>
                                                    <a
                                                        href={`https://twitter.com/share?url=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.id}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.id}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="facebook-f" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={`https://wa.me/?text=${process.env.REACT_APP_BASE_PAGE_URL}/article/${article.id}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="whatsapp" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-30" />
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
                                                {/* <li><FontAwesome name="comment"/>563</li>
                                            <li><FontAwesome name="fire"/>536</li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-20" />
                                <ReactMarkdown
                                    className="markdownContainer"
                                    transformImageUri={(data) =>
                                        transform(data)
                                    }
                                    renderers={{ link: LinkRenderer }}
                                    source={article.content}
                                />
                                <div className="space-40" />
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
                                <div className="border_black" />
                                {/* <div className="space-40"/>
                            <PostOnePagination className="next_prv_single padding20 fourth_bg"/> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="space-100"/> */}
                <BannerSection />
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
        fetchArticle: (id) => dispatch(fetchArticle(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTwoPage);
