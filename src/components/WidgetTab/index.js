import React, { Fragment, useState } from 'react';
import { TabContent, TabPane, Fade } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Heading from '../uiStyle/Heading';

const WidgetTabPane = ({ latestData, type, aId, id }) => {
    return (
        <Fade in={id === aId}>
            <div className="widget tab_widgets">
                {latestData.map((item) => (
                    <Fragment key={item.id}>
                        <div
                            className={`single_post widgets_small ${
                                item.main_image ? '' : 'widgets_small_no_image'
                            }`}
                        >
                            {item.main_image && item.main_image.formats && (
                                <div className="post_img">
                                    <div className="img_wrap">
                                        <Link
                                            to={`/${
                                                type === 'article'
                                                    ? 'article'
                                                    : 'offer'
                                            }/${item.slug}`}
                                        >
                                            <img
                                                src={
                                                    process.env
                                                        .REACT_APP_CMS_URL +
                                                    item.main_image.formats
                                                        .thumbnail.url
                                                }
                                                alt="thumb"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className="single_post_text">
                                <div className="meta2 meta_separator1">
                                    {item.categories.length && (
                                        <Link to="/">
                                            {item.categories[0].name}
                                        </Link>
                                    )}
                                    <Link to="/">
                                        {moment(item.publishAt).format('LL')}
                                    </Link>
                                </div>
                                <h4>
                                    <Link
                                        to={`/${
                                            type === 'article'
                                                ? 'article'
                                                : 'offer'
                                        }/${item.slug}`}
                                    >
                                        {item.title}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                        <div className="space-15" />
                        <div className="border_black" />
                        <div className="space-15" />
                    </Fragment>
                ))}
            </div>
        </Fade>
    );
};

const WidgetTab = ({
    className,
    dark,
    latestArticles,
    latestOffers,
    adsHome,
}) => {
    const [activeTab] = useState('1');

    return (
        <div className={`widget_tab md-mt-30 ${className}`}>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <WidgetTabPane
                        latestData={latestArticles}
                        type="article"
                        dark={dark}
                        aId={activeTab}
                        id="1"
                    />
                </TabPane>
                <Heading title="New Offers" />
            </TabContent>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <WidgetTabPane
                        latestData={latestOffers}
                        type="offer"
                        dark={dark}
                        aId={activeTab}
                        id="1"
                    />
                </TabPane>
            </TabContent>
            <div className="row">
                <div className="col-lg-12">
                    {adsHome && adsHome.length > 0 && (
                        <div className="banner2 mb30">
                            <a target="_blank" href={adsHome[0].link}>
                                <img
                                    src={
                                        process.env.REACT_APP_CMS_URL +
                                        adsHome[0].image[0].url
                                    }
                                    alt="thumb"
                                />
                            </a>
                        </div>
                    )}
                    <iframe
                        title="advertisement"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://www.betterplace-widget.org/projects/25999?l=de"
                        width="100%"
                        height="320"
                        style={{ border: 0, padding: 0, margin: 0 }}
                    >
                        Informieren und spenden:{' '}
                        <a
                            href="https://www.betterplace.org/de/projects/25999-nothilfe-fuer-fluechtlinge-international-moas-migrant-offshore-aid-station"
                            target="_blank"
                        >
                            „Nothilfe für Flüchtlinge international - MOAS
                            Migrant Offshore Aid Station“
                        </a>{' '}
                        auf betterplace.org öffnen.
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default WidgetTab;
