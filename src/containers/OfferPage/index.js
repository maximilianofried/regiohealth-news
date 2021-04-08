import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchOffer, fetchOfferCleanUp } from '../../store/actions';
import BreadCrumb from '../../components/BreadCrumb';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import BannerSection from '../../components/BannerSection';
import singlePost1 from '../../doc/img/blog/single_post1.jpg';
import Metadata from '../../components/Metadata';
import { RG_LOGO } from '../../utils/constants';
import 'react-lazy-load-image-component/src/effects/blur.css';

const replaceContent = (data) => {
    let content = data.replace(/href/g, "target='_blank' href");
    content = content.replace(
        /src="/g,
        `src="${process.env.REACT_APP_CMS_URL}`
    );
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
                    {/* <BreadCrumb
                        className="shadow5 padding-top-30"
                        title="Archive / Offers"
                    /> */}
                    <div className="space-20" />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-8 m-auto">
                                <div className="single_post_heading">
                                    <h1>{offer.title}</h1>
                                </div>
                                <div className="space-20" />
                                <div className="single_post_description">
                                    <p>{offer.description}</p>
                                </div>
                                <div className="img_wrap">
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
                                        effect="blur"
                                    />
                                </div>
                                <div className="space-20" />

                                <div className="row">
                                    <div className="col-7 col-lg-6 align-self-center">
                                        <div className="author">
                                            {offer.profile &&
                                                offer.profile.logo && (
                                                    <div className="author_img">
                                                        <div className="author_img_wrap">
                                                            <img
                                                                src={
                                                                    process.env
                                                                        .REACT_APP_CMS_URL +
                                                                    offer
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
                                                    offer.profile &&
                                                    offer.profile.website
                                                        ? offer.profile.website
                                                        : '#'
                                                }
                                            >
                                                {offer.author}
                                                {offer.profile &&
                                                offer.profile.company
                                                    ? ` / ${offer.profile.company}`
                                                    : ''}
                                            </a>
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
                                                <li>
                                                    <a
                                                        data-tip="Telegram"
                                                        href={`https://t.me/share/url?url=${process.env.REACT_APP_BASE_PAGE_URL}/offer/${offer.slug}`}
                                                        target="_blank"
                                                    >
                                                        <FontAwesome name="telegram" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-20" />
                                <div className="single_post_info">
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
                                                {moment(offer.start).format(
                                                    'LL'
                                                )}
                                            </li>
                                        )}
                                        {offer.end && (
                                            <li>
                                                Ende:{' '}
                                                {moment(offer.end).format('LL')}
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="single_post_content">
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
                                </div>

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
                                {/* <div className="space-40"/>
                            <PostOnePagination className="next_prv_single padding20 fourth_bg"/> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="space-100"/> */}
                {false && <BannerSection />}
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
