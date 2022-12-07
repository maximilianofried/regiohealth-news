import React, { Fragment, useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, Fade } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Heading from '../uiStyle/Heading';
import 'react-lazy-load-image-component/src/effects/blur.css';

const WidgetTabPane = ({ nationalData, aId, id, type }) => {
    return (
        <Fade in={id === aId}>
            <div className="widget tab_widgets">
                {nationalData.slice(0, 6).map((item) => (
                    <Fragment key={item.id}>
                        <div
                            className={`single_post type14 widgets_small ${
                                item.main_image ? '' : 'widgets_small_no_image'
                            }`}
                        >
                            <div className="single_post_text">
                                <h4>
                                    <Link to={`/${type}/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </h4>
                                <div className="meta4">
                                    <p>{moment(item.publishAt).format('LL')}</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fade>
    );
};

const WidgetSuchPortal = ({
    className,
    dark,
    nationalData,
    adsHome,
    fetchNationalData,
    fetchNationalDataCleanUp,
}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    useEffect(() => {
        fetchNationalData({
            limit: 6,
            start: 0,
            type: 'article',
            responseType: 'mixed',
            includeCountry: 'Germany',
        });
    }, [fetchNationalData]);

    return (
        <div className={` white_bg padding15 border-radious5 sm-mt30 mb30`}>
            <Heading title="NATIONALE NEWS" />
            <Nav tabs>
                <NavItem>
                    <button
                        type="button"
                        className={classnames({
                            active: activeTab === '1',
                            btn: 'btn-sm',
                        })}
                        onClick={() => {
                            fetchNationalDataCleanUp();
                            toggle('1');
                            fetchNationalData({
                                limit: 6,
                                start: 0,
                                type: 'article',
                                responseType: 'mixed',
                                includeCountry: 'Germany',
                            });
                        }}
                    >
                        ARTIKEL
                    </button>
                </NavItem>
                <NavItem>
                    <button
                        type="button"
                        className={classnames({
                            active: activeTab === '2',
                            btn: 'btn-sm',
                        })}
                        onClick={() => {
                            fetchNationalDataCleanUp();
                            toggle('2');
                            fetchNationalData({
                                limit: 6,
                                start: 0,
                                type: 'offer',
                                responseType: 'mixed',
                                includeCountry: 'Germany',
                            });
                        }}
                    >
                        ANGEBOTE
                    </button>
                </NavItem>
            </Nav>
            <TabContent
                activeTab={activeTab}
                className="border-radious5 white_bg padding10"
            >
                <TabPane tabId="1">
                    <WidgetTabPane
                        nationalData={nationalData}
                        dark={dark}
                        aId={activeTab}
                        id="1"
                        type="article"
                    />
                </TabPane>
                <TabPane tabId="2">
                    <WidgetTabPane
                        nationalData={nationalData}
                        dark={dark}
                        aId={activeTab}
                        id="2"
                        type="offer"
                    />
                </TabPane>
            </TabContent>
            <div className="row">
                <div className="col-lg-12">
                    {adsHome && adsHome.length > 0 && (
                        <div className="banner2 mb30 mt30">
                            <a href={adsHome[0].link}>
                                <img
                                    src={
                                        process.env.REACT_APP_CMS_URL +
                                        adsHome[0].image[0].url
                                    }
                                    alt="thumb"
                                    effect="blur"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WidgetSuchPortal;
