import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchArticle, fetchArticleCleanUp} from "../../store/actions";
import BreadCrumb from "../../components/BreadCrumb";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import {Link, useParams} from "react-router-dom";
import WidgetTab from "../../components/WidgetTab";
import BannerSection from "../../components/BannerSection";
import PostOnePagination from "../../components/PostOnePagination";
import OurBlogSection from "../../components/OurBlogSection";
import BlogComment from "../../components/BlogComment";
import ModalVideo from 'react-modal-video'
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// images
import author2 from '../../doc/img/author/author2.png';
import big1 from '../../doc/img/blog/big1.jpg';
import smail1 from '../../doc/img/blog/smail1.jpg';
import single_post1 from '../../doc/img/blog/single_post1.jpg';
import banner1 from '../../doc/img/bg/banner1.png';
import {Helmet} from "react-helmet";
import {CMS_LINK} from '../../utils/constants';

const transform = (data) => {
    const imageLink = `${CMS_LINK + data}`;
    return imageLink
}

const LinkRenderer = (props) => {
    return <a href={props.href} target="_blank">{props.children}</a>
  }

const PostTwoPage = ({articleData, fetchArticle}) => {
    let { id } = useParams();
    useEffect(() => {
        fetchArticle(id)
        return () => fetchArticleCleanUp();
    }, [id])
    const article = articleData.article || null;
    const [vModal, setvModal] = useState(false);
    const [videoId] = useState('0r6C3z3TEKw');
    return (
        article &&
        <Fragment>
            <Helmet>
                <title>{article.title}</title>
                <meta name="description" content={article.categories.length > 0 ? article.categories[0].name: ''}/>
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.categories.length > 0 ? article.categories[0].name: ''} />
                <meta property="og:image" itemprop="image"  content={CMS_LINK + article.main_image.url} />
                <meta property="og:image:secure_url" itemprop="image"  content={CMS_LINK + article.main_image.url} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:url" content={"https://regiohealth.news/article/" + id} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Gesundheitstickets NEWS"></meta>
            </Helmet>
            <div className="archives post post1">
                <BreadCrumb className="shadow5 padding-top-30" title="Archive / Articles"/>
                <span className="space-30"/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 col-lg-8 m-auto">
                            <img src={article.main_image ? `${CMS_LINK + article.main_image.url}` : single_post1} alt="thumb"/>
                            <div className="space-20"/>
                            <div className="single_post_heading">
                                <h1>{article.title}</h1>
                            </div>
                            {/*ok*/}
                            <div className="space-20"/>
                            <div className="row">
                                <div className="col-lg-6 align-self-center">
                                    <div className="author">
                                        {/* <div className="author_img">
                                            <div className="author_img_wrap">
                                                <img src={author2} alt="author2"/>
                                            </div>
                                        </div> */}
                                        <Link to="/">{article.author}</Link>
                                        <ul>
                                            {/* <li><Link to="/">March 26, 2020</Link></li> */}
                                            <li>{moment(article.createdAt).format("LL")}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                    <div className="author_social inline text-right">
                                        <ul>
                                            <li><a href={"https://twitter.com/share?url=https://regiohealth.news/article/" + article._id}  target="_blank"><FontAwesome name="twitter"/></a></li>
                                            <li><a href={"https://www.facebook.com/sharer/sharer.php?u=https://regiohealth.news/article/" + article._id}  target="_blank"><FontAwesome name="facebook-f"/></a></li>
                                            <li><a href={"https://wa.me/?text=https://regiohealth.news/article/" + article._id}  target="_blank"><FontAwesome name="whatsapp"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="space-30"/>
                            <div className="row">
                                <div className="col-12">
                                    <div className="page_comments">
                                        <ul className="inline">
                                            <li className="page_category">{article.categories.length > 0 ? article.categories[0].name.toUpperCase() : ''}</li>
                                            {/* <li><FontAwesome name="comment"/>563</li>
                                            <li><FontAwesome name="fire"/>536</li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="space-20"/>
                            <ReactMarkdown
                                className="markdownContainer"
                                transformImageUri={data => transform(data)}
                                renderers={{link: LinkRenderer}}
                                source={article.content}/>
                            <div className="space-40"/>
                            <div className="tags">
                                <ul className="inline">
                                    <li className="tag_list"><FontAwesome name="tag"/> tags</li>
                                    {article.categories.map
                                        (category =>
                                            <li key={category._id}><Link  to="/">{category.name}</Link></li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="space-40"/>
                            <div className="border_black"/>
                            {/* <div className="space-40"/>
                            <PostOnePagination className="next_prv_single padding20 fourth_bg"/> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="space-100"/> */}
            <BannerSection/>
            {/* <div className="space-60"/>
            <OurBlogSection/>
            <div className="space-60"/>
            <BlogComment/>

            <ModalVideo channel='youtube' isOpen={vModal} videoId={videoId}
                        onClose={() => setvModal(false)}/> */}
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        articleData: state.article,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticle: id => dispatch(fetchArticle(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostTwoPage);