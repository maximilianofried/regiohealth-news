import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { fetchOffer, fetchOfferCleanUp } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import BannerSection from '../../components/BannerSection';
import singlePost1 from '../../doc/img/blog/single_post1.jpg';
import Metadata from '../../components/Metadata';
import { RG_LOGO } from '../../utils/constants';

const replaceContent = (data) => {
    let content = data.replace(/href/g, "target='_blank' href");
    content = content.replace(/src/g, `src=${process.env.REACT_APP_CMS_URL}`);
    return content;
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

const OfferPage = ({ offerData, fetchOffer, fetchOfferCleanUp }) => {
    const { slug } = useParams();
    useEffect(() => {
        fetchOffer(slug);
        return () => fetchOfferCleanUp();
    }, [slug]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const offer = offerData.offer || null;
    return (
        offer && (
            <>
                <Metadata
                    title={offer.title}
                    description={getMetaDescription(
                        offer.description,
                        offer.categories
                    )}
                    image={
                        offer.main_image
                            ? process.env.REACT_APP_CMS_URL +
                              offer.main_image.url
                            : RG_LOGO
                    }
                    imageSize={
                        offer.main_image
                            ? getMeta(
                                  process.env.REACT_APP_CMS_URL +
                                      offer.main_image.url,
                                  width,
                                  setWidth,
                                  height,
                                  setHeight
                              )
                            : ''
                    }
                    url={`${process.env.REACT_APP_BASE_PAGE_URL}/offer/${slug}`}
                />
                <div className="archives post post1">
                    <BreadCrumb
                        className="shadow5 padding-top-30"
                        title="Archive / Offers"
                    />
                    <span className="space-30" />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <img
                                    src={
                                        offer.main_image
                                            ? `${
                                                  process.env
                                                      .REACT_APP_CMS_URL +
                                                  offer.main_image.url
                                              }`
                                            : singlePost1
                                    }
                                    alt="thumb"
                                />
                                <div className="space-20" />
                                <div className="single_post_heading">
                                    <h1>{offer.title}</h1>
                                </div>
                                <div className="space-20" />
                                <div className="row">
                                    <div className="col-7 col-lg-6 align-self-center">
                                        <div className="author">
                                            <Link to="/">{offer.author}</Link>
                                            <ul>
                                                <li>
                                                    {moment(
                                                        offer.publishAt
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
                                                        href={`https://twitter.com/share?url=${process.env.REACT_APP_BASE_PAGE_URL}/offer/${offer.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="twitter" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Facebook"
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_PAGE_URL}/offer/${offer.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="facebook-f" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        data-tip="Whatsapp"
                                                        href={`https://wa.me/?text=${process.env.REACT_APP_BASE_PAGE_URL}/offer/${offer.slug}`}
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
                                                    {offer.categories.length > 0
                                                        ? offer.categories[0].name.toUpperCase()
                                                        : ''}
                                                </li>
                                                {/* <li><FontAwesome name="comment"/>563</li>
                                            <li><FontAwesome name="fire"/>536</li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-20" />
                                <ul>
                                    {offer.price && (
                                        <li>
                                            Preis:
                                            {offer.price}
                                        </li>
                                    )}
                                    {offer.start && (
                                        <li>
                                            Start:{' '}
                                            {moment(offer.start).format('LL')}
                                        </li>
                                    )}
                                    {offer.end && (
                                        <li>
                                            Ende:{' '}
                                            {moment(offer.end).format('LL')}
                                        </li>
                                    )}
                                </ul>

                                {offer && offer.content && (
                                    <div
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{
                                            __html: replaceContent(
                                                offer.content
                                            ),
                                        }}
                                    />
                                )}
                                {offer.documents && (
                                    <div className="documents">
                                        <ul className="none">
                                            {offer.documents.map((doc) => (
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
                                <div className="space-30" />
                                <div className="tags">
                                    <ul className="inline">
                                        <li className="tag_list">
                                            <FontAwesome name="tag" /> tags
                                        </li>
                                        {offer.categories.map((category) => (
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
        offerData: state.offer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffer: (slug) => dispatch(fetchOffer(slug)),
        fetchOfferCleanUp: () => dispatch(fetchOfferCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
