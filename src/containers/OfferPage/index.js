import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { isMobileOnly } from 'react-device-detect';
import {
    fetchOffer,
    fetchOfferCleanUp,
    fetchOffersForPage,
    fetchOffersForPageCleanUp,
} from '../../store/actions';
import FontAwesome from '../../components/uiStyle/FontAwesome';
import rgOfferPlaceholderMedium from '../../doc/img/dummy_medium.png';
import Metadata from '../../components/Metadata';
import { RG_LOGO } from '../../utils/constants';
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

const OfferPage = ({
    offerData,
    fetchOffer,
    fetchOffersForPage,
    fetchOfferCleanUp,
    fetchOffersForPageCleanUp,
    latestOffers = [],
}) => {
    const { slug } = useParams();

    useEffect(() => {
        fetchOffer(slug);
        return () => fetchOfferCleanUp();
    }, [fetchOffer, fetchOfferCleanUp, slug]);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const offer = offerData.offer || null;

    useEffect(() => {
        const { offer } = offerData;
        if (offer) {
            fetchOffersForPage({ limit: 8, slug });
        }

        return () => fetchOffersForPageCleanUp();
    }, [fetchOffersForPage, fetchOffersForPageCleanUp, offerData, slug]);

    const { trackPageView } = useMatomo();
    // Track page view
    useEffect(() => {
        trackPageView();
    }, []);

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
                        // eslint-disable-next-line no-nested-ternary
                        offer.main_image &&
                        offer.main_image.formats &&
                        offer.main_image.formats.small
                            ? process.env.REACT_APP_CMS_URL_IMAGE +
                              offer.main_image.formats.small.url
                            : offer.main_image
                            ? process.env.REACT_APP_CMS_URL_IMAGE +
                              offer.main_image.url
                            : rgOfferPlaceholderMedium
                    }
                    imageSize={
                        // eslint-disable-next-line no-nested-ternary
                        offer.main_image &&
                        offer.main_image.formats &&
                        offer.main_image.formats.small
                            ? getMeta(
                                  process.env.REACT_APP_CMS_URL_IMAGE +
                                      offer.main_image.formats.small.url,
                                  width,
                                  setWidth,
                                  height,
                                  setHeight
                              )
                            : offer.main_image
                            ? getMeta(
                                  offer.main_image,
                                  width,
                                  setWidth,
                                  height,
                                  setHeight
                              )
                            : getMeta(
                                  rgOfferPlaceholderMedium,
                                  width,
                                  setWidth,
                                  height,
                                  setHeight
                              )
                    }
                    url={`${process.env.REACT_APP_BASE_PAGE_URL}/offer/${slug}`}
                />
                <div className="archives post post1">
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
                                                          .REACT_APP_CMS_URL_IMAGE +
                                                      offer.main_image.url
                                                  }`
                                                : rgOfferPlaceholderMedium
                                        }
                                        alt="thumb"
                                        effect="blur"
                                        className="border-radious7"
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
                                            {offer.profile &&
                                            offer.profile.website ? (
                                                <a
                                                    target="_blank"
                                                    href={
                                                        offer.profile &&
                                                        offer.profile.website
                                                            ? addhttp(
                                                                  offer.profile
                                                                      .website
                                                              )
                                                            : '#'
                                                    }
                                                >
                                                    {offer.author}
                                                    {offer.profile &&
                                                    offer.profile.company
                                                        ? ` / ${offer.profile.company}`
                                                        : ''}
                                                </a>
                                            ) : (
                                                <p className="company-no-link">
                                                    {offer.author}
                                                    {offer.profile &&
                                                    offer.profile.company
                                                        ? ` / ${offer.profile.company}`
                                                        : ''}
                                                </p>
                                            )}
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
                                        {offer.offer_info &&
                                            offer.offer_info.price && (
                                                <li>
                                                    Preis:
                                                    {offer.offer_info.price}
                                                    {' €'}
                                                </li>
                                            )}
                                        {offer.offer_info &&
                                            offer.offer_info.start && (
                                                <li>
                                                    Start:
                                                    {moment(
                                                        offer.offer_info.start
                                                    ).format('LL')}
                                                </li>
                                            )}
                                        {offer.offer_info &&
                                            offer.offer_info.end && (
                                                <li>
                                                    Ende:{' '}
                                                    {moment(
                                                        offer.offer_info.end
                                                    ).format('LL')}
                                                </li>
                                            )}
                                        {offer.region && (
                                            <li>Bundesland: {offer.region}</li>
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
                                            {offer.documents.data.map((doc) => (
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
                            </div>
                        </div>
                        <div className="space-50" />
                        {latestOffers.length > 0 && (
                            <div className="row">
                                <div className="col-12 col-md-10 col-lg-8 m-auto">
                                    <LatestContent
                                        contentData={latestOffers}
                                        type="offer"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {!isMobileOnly && <AdserverLeaderboard />}
            </>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        offerData: state.offer,
        latestOffers: state.offers.offersForPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOffer: (slug) => dispatch(fetchOffer(slug)),
        fetchOfferCleanUp: () => dispatch(fetchOfferCleanUp()),
        fetchOffersForPage: ({ limit, slug }) =>
            dispatch(fetchOffersForPage({ limit, slug })),
        fetchOffersForPageCleanUp: () => dispatch(fetchOffersForPageCleanUp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
